# =====================================================
# TEMPORARY LIGHTWEIGHT VERSION
# FOR RENDER DEPLOYMENT
# =====================================================

def get_historical_summary(
    description,
    event_cause,
    zone,
    priority
):

    return {

        "similar_incidents_found": 0,

        "average_similarity": 0,

        "most_common_cause": event_cause,

        "high_priority_rate": 0,

        "similar_incidents": []
    }