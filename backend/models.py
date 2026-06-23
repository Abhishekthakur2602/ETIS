from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Float
from sqlalchemy import Boolean

from database import Base


class Event(Base):

    __tablename__ = "events"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    event_type = Column(String)

    event_cause = Column(String)

    priority = Column(String)

    requires_road_closure = Column(Boolean)

    zone = Column(String)

    police_station = Column(String)

    latitude = Column(Float)

    longitude = Column(Float)

    severity = Column(String)

    congestion_score = Column(Float)

    barricades = Column(Integer)

    diversion = Column(String)