from fastapi import APIRouter
from database import conn

router = APIRouter()

@router.get("/latest-prediction")
def latest_prediction():

    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            severity,
            congestion_score,
            resource_score,
            constables,
            asi,
            inspector,
            barricades,
            diversion
        FROM prediction_history
        ORDER BY created_at DESC
        LIMIT 1
    """)

    row = cursor.fetchone()

    cursor.close()

    if not row:
        return {}

    return {
        "severity": row[0],
        "congestion_score": row[1],
        "resource_score": row[2],
        "constables": row[3],
        "asi": row[4],
        "inspector": row[5],
        "barricades": row[6],
        "diversion": row[7]
    }