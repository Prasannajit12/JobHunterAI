from fastapi import APIRouter
from app.services.profile_service import ProfileService

router = APIRouter()


@router.get("/profile")
def get_profile():

    profile_service = ProfileService()

    profile = profile_service.get_profile()

    return profile