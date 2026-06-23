from database import conn


def auto_assign_officer(
    prediction_id: int,
    severity: str
):

    cursor = conn.cursor()

    if severity == "Critical":
        rank = "Inspector"

    elif severity == "High":
        rank = "ASI"

    else:
        rank = "Constable"

    cursor.execute(
        """
        SELECT id
        FROM officers
        WHERE rank=%s
        AND status='Available'
        LIMIT 1
        """,
        (rank,)
    )

    officer = cursor.fetchone()

    if not officer:

        cursor.close()

        return None

    officer_id = officer[0]

    cursor.execute(
        """
        INSERT INTO officer_assignments
        (
            prediction_id,
            officer_id,
            status
        )
        VALUES
        (
            %s,
            %s,
            'Assigned'
        )
        """,
        (
            prediction_id,
            officer_id
        )
    )

    conn.commit()

    cursor.close()

    return officer_id