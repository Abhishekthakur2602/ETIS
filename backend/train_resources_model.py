import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import r2_score

# =====================================
# LOAD DATA
# =====================================

df = pd.read_csv(
    "../dataset/cleaned_events.csv"
)

# =====================================
# CREATE RESOURCE TARGET
# =====================================

def create_resource_score(row):

    score = 0

    if row["priority"] == "High":
        score += 25

    if row["requires_road_closure"]:
        score += 25

    if row["event_type"] == "unplanned":
        score += 15

    if row["event_cause"] in [
        "accident",
        "water_logging",
        "construction",
        "protest",
        "vip_movement"
    ]:
        score += 20

    return score

df["resource_target"] = df.apply(
    create_resource_score,
    axis=1
)

# =====================================
# ENCODERS
# =====================================

encoders = joblib.load(
    "../models/encoders.pkl"
)

# ======================================
# ENCODE DAY
# ======================================

day_mapping = {

    "Monday": 0,
    "Tuesday": 1,
    "Wednesday": 2,
    "Thursday": 3,
    "Friday": 4,
    "Saturday": 5,
    "Sunday": 6

}

df["day"] = (
    df["day"]
    .astype(str)
    .str.strip()
    .map(day_mapping)
)

print(df["day"].head())
print(df["day"].isna().sum())
categorical_cols = [
    "event_type",
    "event_cause",
    "priority",
    "zone",
    "police_station"
]

for col in categorical_cols:

    df[col] = df[col].astype(str)

    df[col] = encoders[col].transform(
        df[col]
    )

df["requires_road_closure"] = (
    df["requires_road_closure"]
    .astype(int)
)

# =====================================
# FEATURES
# =====================================

FEATURES = [

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

X = df[FEATURES]

y = df["resource_target"]

# =====================================
# TRAIN
# =====================================

X_train, X_test, y_train, y_test = train_test_split(

    X,
    y,
    test_size=0.2,
    random_state=42

)

model = RandomForestRegressor(

    n_estimators=300,
    max_depth=12,
    random_state=42

)
print(X.dtypes)

model.fit(
    X_train,
    y_train
)

preds = model.predict(
    X_test
)

print(
    "R2:",
    round(
        r2_score(
            y_test,
            preds
        ),
        4
    )
)

joblib.dump(

    model,

    "../models/resource_model.pkl"

)

print(
    "Resource Model Saved"
)