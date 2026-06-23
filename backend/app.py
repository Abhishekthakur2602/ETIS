from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from schemas import EventRequest
from predictor import full_analysis

from routers.analytics import router as analytics_router
from routers.incidents import router as incidents_router

from routers.map import router as map_router
from routers.operations import router as operations_router
from routers.latest import router as latest_router
from routers.auth import router as auth_router
from routers.user_reports import (
    router as user_reports_router
)
from routers.officers import (
    router as officers_router
)
from routers.assignments import router as assignment_router
from routers.officer_dashboard import router as officer_dashboard_router
from routers.assignment_status import router as assignment_status_router
from routers.admin_dashboard import (
    router as admin_dashboard_router
)
from routers.timeline import (
    router as timeline_router
)

from routers.notifications import router as notifications_router
from fastapi.middleware.cors import CORSMiddleware


# =====================================
# APP
# =====================================

app = FastAPI(
    title="ETIS API",
    version="1.0"
)

# =====================================
# ROUTERS
# =====================================

app.include_router(
    analytics_router
)

app.include_router(
    incidents_router
)

app.include_router(
    map_router
)

app.include_router(
    operations_router
)

app.include_router(
    latest_router
)

app.include_router(
    auth_router
)

app.include_router(
    user_reports_router
)

app.include_router(
    officers_router
)
app.include_router(
    officer_dashboard_router
)

app.include_router(assignment_router)

app.include_router(assignment_status_router)

app.include_router(
    admin_dashboard_router
)

app.include_router(
    timeline_router
)

app.include_router(
    notifications_router
)
# =====================================
# CORS
# =====================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =====================================
# ROOT
# =====================================

@app.get("/")
def root():

    return {
        "message": "ETIS Running"
    }

# =====================================
# FULL ANALYSIS
# =====================================

@app.post("/full-analysis")
def analyze(request: EventRequest):

    return full_analysis(
        request.model_dump()
    )