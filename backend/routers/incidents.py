from fastapi import APIRouter
from database import conn

router = APIRouter()

@router.get("/recent-incidents")
def recent_incidents():

    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            id,
            created_at,
            event_type,
            event_cause,
            severity,
            congestion_score,
            zone
        FROM prediction_history
        ORDER BY created_at DESC
        LIMIT 20
    """)

    rows = cursor.fetchall()

    cursor.close()

    return [
        {
            "id": r[0],
            "created_at": str(r[1]),
            "event_type": r[2],
            "event_cause": r[3],
            "severity": r[4],
            "congestion_score": r[5],
            "zone": r[6]
        }
        for r in rows
    ]