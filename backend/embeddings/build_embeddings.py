import pandas as pd
import joblib

from sentence_transformers import SentenceTransformer

print("Loading Dataset...")

df = pd.read_csv(
    "../../dataset/cleaned_events.csv"
)

df = df[
    df["description"].notna()
]

df = df.reset_index(
    drop=True
)

print(
    f"Rows: {len(df)}"
)

model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

print(
    "Creating Embeddings..."
)

embeddings = model.encode(
    df["description"].tolist(),
    show_progress_bar=True
)

joblib.dump(
    embeddings,
    "description_embeddings.pkl"
)

joblib.dump(
    df,
    "metadata.pkl"
)

print(
    "Embeddings Saved Successfully"
)