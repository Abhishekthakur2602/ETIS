from pydantic import BaseModel, Field


class EventRequest(BaseModel):

    # =====================================
    # EVENT INFORMATION
    # =====================================

    event_type: str

    event_cause: str

    priority: str

    requires_road_closure: bool

    # =====================================
    # LOCATION INFORMATION
    # =====================================

    zone: str

    police_station: str

    latitude: float

    longitude: float

    # =====================================
    # TIME INFORMATION
    # =====================================

    hour: int = Field(
        ge=0,
        le=23
    )

    day: int = Field(
        ge=0,
        le=6
    )

    # =====================================
    # BERT / HISTORICAL ANALYSIS
    # =====================================

    description: str = ""

    # =====================================
    # OPTIONAL FUTURE FIELDS
    # =====================================

    address: str = ""

    event_id: str = ""


class UserReport(BaseModel):

    event_type: str

    event_cause: str

    priority: str

    zone: str

    description: str

    latitude: float

    longitude: float