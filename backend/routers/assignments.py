from fastapi import APIRouter
from database import conn

router = APIRouter()


@router.post("/assign-officer")
def assign_officer(data: dict):

    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO officer_assignments
        (
            prediction_id,
            officer_id,
            status
        )
        VALUES (%s,%s,%s)
        """,
        (
            data["prediction_id"],
            data["officer_id"],
            "Assigned"
        )
    )

    conn.commit()

    cursor.close()

    return {
        "message": "Officer Assigned"
    }