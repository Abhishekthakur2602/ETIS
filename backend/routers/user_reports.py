from fastapi import APIRouter

from database import conn
from schemas import UserReport

router = APIRouter()


@router.post("/user-report")
def create_report(report: UserReport):

    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO user_reports(

            event_type,
            event_cause,
            priority,
            zone,
            description,
            latitude,
            longitude

        )

        VALUES(
            %s,%s,%s,%s,%s,%s,%s
        )
        """,
        (
            report.event_type,
            report.event_cause,
            report.priority,
            report.zone,
            report.description,
            report.latitude,
            report.longitude,
        ),
    )

    conn.commit()

    cursor.close()

    return {
        "message": "Incident Submitted Successfully"
    }
@router.get("/user-reports")
def get_reports():

    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT
            id,
            event_cause,
            priority,
            zone,
            description,
            latitude,
            longitude,
            status,
            created_at

        FROM user_reports

        ORDER BY created_at DESC
        """
    )

    rows = cursor.fetchall()

    cursor.close()

    return [
        {
            "id": r[0],
            "event_cause": r[1],
            "priority": r[2],
            "zone": r[3],
            "description": r[4],
            "latitude": r[5],
            "longitude": r[6],
            "status": r[7],
            "created_at": str(r[8]),
        }
        for r in rows
    ]
@router.put("/user-report/{report_id}")
def update_status(
    report_id: int,
    status: str
):

    cursor = conn.cursor()

    cursor.execute(
        """
        UPDATE user_reports
        SET status=%s
        WHERE id=%s
        """,
        (
            status,
            report_id
        )
    )

    conn.commit()

    cursor.close()

    return {
        "message": "Status Updated"
    }