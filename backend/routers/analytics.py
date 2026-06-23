from fastapi import APIRouter
from database import get_connection

router = APIRouter()

@router.get("/analytics")
def analytics():

    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            SELECT COUNT(*)
            FROM public.prediction_history
        """)
        total_events = cursor.fetchone()[0]

        cursor.execute("""
            SELECT COUNT(*)
            FROM public.prediction_history
            WHERE severity='Critical'
        """)
        critical_events = cursor.fetchone()[0]

        cursor.execute("""
            SELECT AVG(congestion_score)
            FROM public.prediction_history
        """)
        avg_congestion = cursor.fetchone()[0]

        cursor.execute("""
            SELECT severity,
                   COUNT(*)
            FROM public.prediction_history
            GROUP BY severity
        """)
        severity_distribution = cursor.fetchall()

        cursor.execute("""
            SELECT zone,
                   COUNT(*)
            FROM public.prediction_history
            GROUP BY zone
            ORDER BY COUNT(*) DESC
            LIMIT 5
        """)
        top_zones = cursor.fetchall()

        return {
            "total_events": total_events,
            "critical_events": critical_events,
            "average_congestion": round(avg_congestion or 0, 2),
            "severity_distribution": severity_distribution,
            "top_zones": top_zones
        }

    finally:
        cursor.close()
        conn.close()