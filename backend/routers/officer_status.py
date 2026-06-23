from fastapi import APIRouter
from database import conn

router = APIRouter()


@router.put("/assignment-status")
def update_status(data: dict):

    cursor = conn.cursor()

    cursor.execute(
        """
        UPDATE officer_assignments
        SET status=%s
        WHERE id=%s
        """,
        (
            data["status"],
            data["assignment_id"]
        )
    )

    conn.commit()

    cursor.close()

    return {
        "message": "Status Updated"
    }