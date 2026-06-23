from database import conn
from services.auto_assign import auto_assign_officer


def save_prediction(data, result):

    cursor = None

    try:

        cursor = conn.cursor()

        query = """
        INSERT INTO prediction_history (
            event_type,
            event_cause,
            priority,
            zone,
            police_station,
            severity,
            congestion_score,
            resource_score,
            constables,
            asi,
            inspector,
            barricades,
            diversion,
            latitude,
            longitude
        )
        VALUES (
            %s,%s,%s,%s,%s,
            %s,%s,%s,
            %s,%s,%s,
            %s,%s,
            %s,%s
        )
        RETURNING id
        """

        values = (
            data["event_type"],
            data["event_cause"],
            data["priority"],
            data["zone"],
            data["police_station"],
            result["severity"],
            result["congestion_score"],
            result["resource_score"],
            result["constables"],
            result["asi"],
            result["inspector"],
            result["barricades"],
            result["diversion"],
            data["latitude"],
            data["longitude"]
        )

        cursor.execute(query, values)

        prediction_id = cursor.fetchone()[0]

        conn.commit()

        # =====================================
        # AUTO ASSIGN OFFICER
        # =====================================

        officer_id = auto_assign_officer(
            prediction_id,
            result["severity"]
        )

        print(
            f"Prediction {prediction_id} assigned to officer {officer_id}"
        )

        return prediction_id

    except Exception as e:

        conn.rollback()

        print(
            "Save Prediction Error:",
            e
        )

        return None

    finally:

        if cursor:
            cursor.close()