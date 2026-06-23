from fastapi import APIRouter
from database import conn

router = APIRouter()


@router.get(
    "/incident-timeline/{prediction_id}"
)
def incident_timeline(
    prediction_id: int
):

    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT

            id,
            message,
            created_at

        FROM incident_logs

        WHERE prediction_id=%s

        ORDER BY created_at DESC
        """,
        (prediction_id,)
    )

    rows = cursor.fetchall()

    cursor.close()

    return [

        {
            "id": r[0],
            "message": r[1],
            "created_at": r[2]
        }

        for r in rows
    ]