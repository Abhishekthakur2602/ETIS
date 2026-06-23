import pandas as pd
import random

officers = []

for i in range(1,101):

    officers.append({

        "id": i,

        "name": f"Officer_{i}",

        "rank": random.choice([
            "Constable",
            "ASI",
            "Inspector"
        ]),

        "latitude":
        12.90 + random.random()*0.3,

        "longitude":
        77.45 + random.random()*0.3,

        "status":
        random.choice([
            "Available",
            "Busy"
        ])
    })

pd.DataFrame(
    officers
).to_csv(
    "officers.csv",
    index=False
)