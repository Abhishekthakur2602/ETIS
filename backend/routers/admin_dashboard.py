from fastapi import APIRouter
from database import conn

router = APIRouter()


@router.get("/admin-dashboard")
def admin_dashboard():

    cursor = conn.cursor()

    cursor.execute("""
        SELECT COUNT(*)
        FROM prediction_history
    """)
    total_incidents = cursor.fetchone()[0]

    cursor.execute("""
        SELECT COUNT(*)
        FROM prediction_history
        WHERE severity='Critical'
    """)
    critical_incidents = cursor.fetchone()[0]

    cursor.execute("""
        SELECT COUNT(*)
        FROM officer_assignments
        WHERE status='Resolved'
    """)
    resolved_incidents = cursor.fetchone()[0]

    cursor.execute("""
        SELECT COUNT(*)
        FROM officers
        WHERE status='Available'
    """)
    active_officers = cursor.fetchone()[0]

    cursor.close()

    return {
        "total_incidents": total_incidents,
        "critical_incidents": critical_incidents,
        "resolved_incidents": resolved_incidents,
        "active_officers": active_officers
    }


@router.get("/live-assignments")
def live_assignments():

    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            oa.id,
            o.name,
            ph.event_cause,
            ph.severity,
            oa.status

        FROM officer_assignments oa

        JOIN officers o
        ON o.id = oa.officer_id

        JOIN prediction_history ph
        ON ph.id = oa.prediction_id

        ORDER BY oa.id DESC
    """)

    rows = cursor.fetchall()

    cursor.close()

    return [
        {
            "assignment_id": r[0],
            "officer": r[1],
            "event_cause": r[2],
            "severity": r[3],
            "status": r[4]
        }
        for r in rows
    ]