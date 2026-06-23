from fastapi import APIRouter
from database import conn

router = APIRouter()

@router.get("/map-incidents")
def map_incidents():

    cursor = conn.cursor()

    cursor.execute("""
SELECT
    id,
    event_cause,
    severity,
    latitude,
    longitude
FROM prediction_history
WHERE latitude IS NOT NULL
AND longitude IS NOT NULL
ORDER BY created_at DESC
LIMIT 50
""")

    rows = cursor.fetchall()

    cursor.close()

    return [
        {
            "id": r[0],
            "event_cause": r[1],
            "severity": r[2],
            "latitude": r[3],
            "longitude": r[4]
        }
        for r in rows
    ]