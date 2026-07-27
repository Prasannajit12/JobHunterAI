from fastapi import APIRouter

from app.services.live_jobs import get_live_jobs

router = APIRouter()


@router.get("/live-jobs")
def live_jobs():

    return get_live_jobs()