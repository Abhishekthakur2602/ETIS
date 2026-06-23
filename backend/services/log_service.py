from database import conn


def create_log(
    prediction_id,
    message
):

    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO incident_logs
        (
            prediction_id,
            message
        )
        VALUES
        (
            %s,
            %s
        )
        """,
        (
            prediction_id,
            message
        )
    )

    conn.commit()

    cursor.close()