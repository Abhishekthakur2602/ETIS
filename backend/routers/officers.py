from fastapi import APIRouter
from database import conn

router = APIRouter()

@router.get("/available-officers")
def available_officers():

    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            id,
            name,
            rank,
            status,
            distance_km,
            eta_minutes
        FROM officers
        ORDER BY eta_minutes ASC
    """)

    rows = cursor.fetchall()

    officers = []

    for row in rows:

        officers.append({
            "id": row[0],
            "name": row[1],
            "rank": row[2],
            "status": row[3],
            "distance_km": row[4],
            "eta_minutes": row[5]
        })

    cursor.close()

    return officers