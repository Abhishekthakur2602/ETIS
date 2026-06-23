import joblib
import numpy as np

from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer

# =====================================================
# LOAD MODEL
# =====================================================

try:
    model = SentenceTransformer(
        "all-MiniLM-L6-v2",
        local_files_only=True
    )
except Exception:
    model = None

# =====================================================
# LOAD DATA
# =====================================================

embeddings = joblib.load(
    "embeddings/description_embeddings.pkl"
)

metadata = joblib.load(
    "embeddings/metadata.pkl"
)

# =====================================================
# HYBRID INCIDENT RETRIEVAL
# =====================================================

def find_similar_incidents(
    description,
    event_cause=None,
    zone=None,
    priority=None,
    top_k=10
):

    query_embedding = model.encode(
        [description]
    )

    text_scores = cosine_similarity(
        query_embedding,
        embeddings
    )[0]

    final_scores = []

    for idx in range(len(metadata)):

        score = text_scores[idx]

        row = metadata.iloc[idx]

        # Same Cause Bonus

        if (
            event_cause
            and
            str(row["event_cause"])
            == event_cause
        ):
            score += 0.20

        # Same Zone Bonus

        if (
            zone
            and
            str(row["zone"])
            == zone
        ):
            score += 0.10

        # Same Priority Bonus

        if (
            priority
            and
            str(row["priority"])
            == priority
        ):
            score += 0.05
        score = min(score, 1.0)

        final_scores.append(score)

    final_scores = np.array(
        final_scores
    )

    top_indices = np.argsort(
        final_scores
    )[-top_k:][::-1]

    results = []

    for idx in top_indices:

        row = metadata.iloc[idx]

        results.append({

            "description":
            str(
                row["description"]
            ),

            "event_cause":
            str(
                row["event_cause"]
            ),

            "priority":
            str(
                row["priority"]
            ),

            "zone":
            str(
                row["zone"]
            ),

            "score":
            round(
                float(
                    final_scores[idx]
                ),
                3
            )
        })

    return results
 # =====================================================
# HISTORICAL SUMMARY
# =====================================================

def get_historical_summary(
    description,
    event_cause,
    zone,
    priority
):

    incidents = find_similar_incidents(
        description,
        event_cause,
        zone,
        priority,
        top_k=20
    )

    avg_similarity = np.mean(
        [x["score"] for x in incidents]
    )

    high_priority_count = 0

    cause_counts = {}

    for incident in incidents:

        cause = incident["event_cause"]

        cause_counts[cause] = (
            cause_counts.get(cause, 0) + 1
        )

        if incident["priority"] == "High":

            high_priority_count += 1

    top_cause = max(
        cause_counts,
        key=cause_counts.get
    )

    return {

        "similar_incidents_found":
        len(incidents),

        "average_similarity":
        round(
            avg_similarity,
            3
        ),

        "most_common_cause":
        top_cause,

        "high_priority_rate":
        round(
            high_priority_count
            /
            len(incidents)
            * 100,
            2
        ),

        "similar_incidents":
        incidents
    }