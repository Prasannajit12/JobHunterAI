from fastapi import APIRouter

from app.services.analytics_service import (
    get_dashboard_analytics
)

router = APIRouter(tags=["Analytics"])


@router.get("/analytics")
def analytics():

    return get_dashboard_analytics()