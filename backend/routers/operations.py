from fastapi import APIRouter
from database import conn

router = APIRouter()


@router.get("/operations-brief")
def operations_brief():

    cursor = conn.cursor()

    # Critical Events
    cursor.execute("""
        SELECT COUNT(*)
        FROM prediction_history
        WHERE severity = 'Critical'
    """)
    critical_events = cursor.fetchone()[0]

    # Total Events
    cursor.execute("""
        SELECT COUNT(*)
        FROM prediction_history
    """)
    total_events = cursor.fetchone()[0]

    # Highest Risk Zone
    cursor.execute("""
        SELECT
            zone,
            COUNT(*) AS total
        FROM prediction_history
        GROUP BY zone
        ORDER BY total DESC
        LIMIT 1
    """)
    zone = cursor.fetchone()

    # Average Congestion
    cursor.execute("""
        SELECT AVG(congestion_score)
        FROM prediction_history
    """)
    avg_congestion = cursor.fetchone()[0]

    # Average Resource Requirement
    cursor.execute("""
        SELECT AVG(constables)
        FROM prediction_history
    """)
    avg_constables = cursor.fetchone()[0]

    # Latest Incident
    cursor.execute("""
        SELECT
            event_cause,
            severity,
            created_at
        FROM prediction_history
        ORDER BY created_at DESC
        LIMIT 1
    """)
    latest = cursor.fetchone()

    cursor.close()

    return {
        "critical_events": critical_events,

        "total_events": total_events,

        "highest_risk_zone":
            zone[0] if zone else "N/A",

        "average_congestion":
            round(avg_congestion or 0, 2),

        "average_constables":
            round(avg_constables or 0, 0),

        # temporary static
        "available_officers": 48,

        "latest_incident": {
            "cause": latest[0] if latest else None,
            "severity": latest[1] if latest else None,
            "created_at": str(latest[2]) if latest else None,
        }
    }