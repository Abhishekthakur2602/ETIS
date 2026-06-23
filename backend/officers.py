import pandas as pd
from math import radians
from math import sin
from math import cos
from math import sqrt
from math import atan2


def haversine(
    lat1,
    lon1,
    lat2,
    lon2
):

    R = 6371

    dlat = radians(
        lat2 - lat1
    )

    dlon = radians(
        lon2 - lon1
    )

    a = (

        sin(dlat / 2) ** 2

        +

        cos(radians(lat1))

        *

        cos(radians(lat2))

        *

        sin(dlon / 2) ** 2

    )

    c = 2 * atan2(
        sqrt(a),
        sqrt(1 - a)
    )

    return R * c


def find_nearest_officers(
    latitude,
    longitude,
    top_k=3
):

    officers = pd.read_csv(
        "officers.csv"
    )

    officers = officers[
        officers["status"]
        ==
        "Available"
    ]

    officers["distance_km"] = officers.apply(

        lambda row:

        haversine(

            latitude,

            longitude,

            row["latitude"],

            row["longitude"]

        ),

        axis=1

    )

    officers = officers.sort_values(
        "distance_km"
    )

    nearest = officers.head(
        top_k
    )

    results = []

    for _, row in nearest.iterrows():

        results.append({

            "name":
            row["name"],

            "rank":
            row["rank"],

            "distance_km":
            round(
                row["distance_km"],
                2
            ),

            "eta_minutes":
            round(
                row["distance_km"] * 3
            )
        })

    return results