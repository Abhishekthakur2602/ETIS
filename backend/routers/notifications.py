from fastapi import APIRouter
from database import conn

router = APIRouter()

@router.get("/notifications")
def notifications():

    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            event_cause,
            severity,
            created_at
        FROM prediction_history
        ORDER BY id DESC
        LIMIT 10
    """)

    rows = cursor.fetchall()

    cursor.close()

    return [
        {
            "message":
            f"{row[1]} {row[0]} detected",
            "time":
            row[2]
        }
        for row in rows
    ]