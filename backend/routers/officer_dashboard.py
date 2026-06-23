from fastapi import APIRouter
from database import conn

router = APIRouter()


@router.get(
    "/officer-dashboard/{officer_id}"
)
def officer_dashboard(
    officer_id: int
):

    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT

            oa.id,

            ph.event_cause,

            ph.severity,

            ph.zone,

            ph.congestion_score,

            oa.status

        FROM officer_assignments oa

        JOIN prediction_history ph

        ON ph.id =
        oa.prediction_id

        WHERE oa.officer_id=%s

        ORDER BY oa.id DESC
        """,
        (officer_id,)
    )

    rows = cursor.fetchall()

    cursor.close()

    return [

        {

            "assignment_id": r[0],

            "event_cause": r[1],

            "severity": r[2],

            "zone": r[3],

            "congestion_score": r[4],

            "status": r[5]

        }

        for r in rows

    ]