
import joblib
import pandas as pd

from bert_engine import get_historical_summary
from officers import find_nearest_officers
from history import save_prediction
from services.auto_assign import auto_assign_officer

# =====================================================
# BASE FEATURES
# =====================================================

BASE_FEATURES = [
    "event_type",
    "event_cause",
    "priority",
    "requires_road_closure",
    "zone",
    "police_station",
    "latitude",
    "longitude",
    "hour",
    "day"
]

# =====================================================
# LOAD MODELS
# =====================================================

severity_model = joblib.load(
    "../models/severity_model.pkl"
)

congestion_model = joblib.load(
    "../models/congestion_model.pkl"
)

# =====================================================
# LOAD ENCODERS
# =====================================================

encoders = joblib.load(
    "../models/encoders.pkl"
)

severity_encoder = joblib.load(
    "../models/severity_encoder.pkl"
)

# =====================================================
# PREPROCESS
# =====================================================

def preprocess(data):

    row = pd.DataFrame([data])

    categorical_cols = [
        "event_type",
        "event_cause",
        "priority",
        "zone",
        "police_station"
    ]

    for col in categorical_cols:

        row[col] = row[col].astype(str)

        try:

            row[col] = encoders[col].transform(
                row[col]
            )

        except ValueError:

            known_classes = list(
                encoders[col].classes_
            )

            row[col] = row[col].apply(
                lambda x:
                known_classes.index(x)
                if x in known_classes
                else 0
            )

    row["requires_road_closure"] = (
        row["requires_road_closure"]
        .astype(int)
    )

    return row[BASE_FEATURES]


# =====================================================
# FULL ANALYSIS
# =====================================================

def full_analysis(data):

    # =================================
    # PREPROCESS
    # =================================

    row = preprocess(data)

    # =================================
    # SEVERITY PREDICTION
    # =================================

    severity_pred = severity_model.predict(
        row
    )

    severity = (
        severity_encoder
        .inverse_transform(
            severity_pred
        )[0]
    )

    # =================================
    # CONGESTION PREDICTION
    # =================================

    congestion_score = float(
        congestion_model.predict(
            row
        )[0]
    )

    congestion_score = round(
        congestion_score,
        2
    )

    # =================================
    # HISTORICAL INTELLIGENCE
    # =================================

    historical_summary = {}

    if data.get("description"):

        historical_summary = (
            get_historical_summary(
                data["description"],
                data["event_cause"],
                data["zone"],
                data["priority"]
            )
        )

    # =================================
    # RESOURCE ENGINE
    # =================================

    severity_weights = {
        "Low": 10,
        "Medium": 30,
        "High": 60,
        "Critical": 90
    }

    cause_weights = {
        "accident": 20,
        "construction": 15,
        "water_logging": 18,
        "public_event": 12,
        "procession": 15,
        "vip_movement": 25,
        "protest": 25,
        "vehicle_breakdown": 8,
        "pot_holes": 10,
        "road_conditions": 10,
        "congestion": 15,
        "others": 5
    }

    zone_weights = {
        "Central Zone 2": 10,
        "West Zone 1": 8,
        "North Zone 2": 8,
        "Central Zone 1": 6,
        "West Zone 2": 6,
        "South Zone 2": 5
    }

    severity_score = severity_weights.get(
        severity,
        20
    )

    cause_score = cause_weights.get(
        data["event_cause"],
        5
    )

    zone_score = zone_weights.get(
        data["zone"],
        0
    )

    closure_score = (
        15
        if data["requires_road_closure"]
        else 0
    )

    resource_score = (
        congestion_score * 0.35
        +
        severity_score * 0.25
        +
        cause_score * 0.15
        +
        zone_score * 0.05
        +
        closure_score * 0.10
    )

    # =================================
    # HISTORICAL BOOST
    # =================================

    if historical_summary:

        resource_score += (
            historical_summary[
                "average_similarity"
            ] * 10
        )

    resource_score = round(
        resource_score,
        2
    )

    # =================================
    # CONSTABLES
    # =================================

    constables = max(
        2,
        round(resource_score / 5)
    )

    # =================================
    # ASI
    # =================================

    asi = max(
        1,
        round(resource_score / 25)
    )

    # =================================
    # INSPECTOR
    # =================================

    if (
        severity == "Critical"
        or
        congestion_score >= 85
        or
        data["event_cause"] in [
            "vip_movement",
            "protest"
        ]
    ):
        inspector = 1
    else:
        inspector = 0

    # =================================
    # BARRICADES
    # =================================

    barricades = max(
        2,
        round(resource_score / 4)
    )

    if data["requires_road_closure"]:
        barricades += 2

    barricades = min(
        barricades,
        20
    )

    # =================================
    # DIVERSION
    # =================================

    if resource_score >= 65:
        diversion = "Full"

    elif resource_score >= 35:
        diversion = "Partial"

    else:
        diversion = "None"

    # =================================
    # OFFICER DISPATCH
    # =================================

    assigned_officers = (
        find_nearest_officers(
            data["latitude"],
            data["longitude"]
        )
    )

    # =================================
    # EXPLAINABILITY
    # =================================

    decision_factors = [
        f"Severity: {severity}",
        f"Congestion: {congestion_score}",
        f"Cause: {data['event_cause']}",
        f"Zone: {data['zone']}"
    ]

    if historical_summary:

        decision_factors.append(
            f"Historical Similarity: {historical_summary['average_similarity']}"
        )

    # =================================
    # SAVE PREDICTION
    # =================================

    result = {

        "severity": severity,

        "congestion_score":
        congestion_score,

        "resource_score":
        resource_score,

        "constables":
        constables,

        "asi":
        asi,

        "inspector":
        inspector,

        "barricades":
        barricades,

        "diversion":
        diversion,

        "historical_summary":
        historical_summary,

        "assigned_officers":
        assigned_officers,

        "decision_factors":
        decision_factors
    }

   

    try:

        prediction_id= save_prediction(
            data,
            result
        )
        auto_assign_officer(
            prediction_id,
            result["severity"]
        )

    except Exception as e:

        print(
            "History Save Error:",
            e
        )

    # =================================
    # FINAL RESPONSE
    # =================================

    return result
