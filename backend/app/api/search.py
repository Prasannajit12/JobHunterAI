from fastapi import APIRouter, Query

from app.services.search_service import search_jobs

router = APIRouter(tags=["Search"])


@router.get("/search-jobs")
def search(
    keyword: str = Query(default=""),
    location: str = Query(default=""),
    experience: str = Query(default=""),
    work_mode: str = Query(default="Any")
):

    return search_jobs(
        keyword=keyword,
        location=location,
        experience=experience,
        work_mode=work_mode
    )