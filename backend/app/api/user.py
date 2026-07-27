from fastapi import APIRouter

from app.services.user_service import (
    get_user_profile,
    get_user_skills
)

router = APIRouter(tags=["User"])


@router.get("/user")
def get_user():

    profile = get_user_profile()

    skills = get_user_skills()

    # Simple AI Readiness Score
    readiness = min(len(skills) * 10, 100)

    return {
        "profile": profile,
        "skills": skills,
        "readiness": readiness
    }