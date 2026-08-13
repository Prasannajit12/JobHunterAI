from fastapi import APIRouter

from app.services.profile_service import ProfileService
from app.services.job_service import job_service
from app.services.match_service import calculate_match


router = APIRouter()


@router.get("/recommendations")
def get_recommendations():

    profile_service = ProfileService()

    profile = profile_service.get_profile()
    jobs = job_service.get_all_jobs()

    recommendations = []

    for job in jobs:

        # Pass the COMPLETE profile and COMPLETE job
        # because the advanced matcher needs:
        # skills + experience + location + salary
        match = calculate_match(
            profile,
            job
        )

        recommendations.append({

            "id": job.get("id"),
            "company": job.get("company"),
            "title": job.get("title"),
            "location": job.get("location"),
            "salary": job.get("salary"),
            "experience": job.get("experience"),
            "work_mode": job.get("work_mode"),
            "skills": job.get("skills", []),
            "url": job.get("url"),

            "score": match["score"],

            "skill_score": match["skill_score"],
            "title_score": match["title_score"],
            "experience_score": match["experience_score"],
            "location_score": match["location_score"],
            "salary_score": match["salary_score"],

            "matched_skills": match["matched_skills"],
            "missing_skills": match["missing_skills"],

            "recommendation": match["recommendation"]
        })

    recommendations.sort(
        key=lambda x: x["score"],
        reverse=True
    )

    return recommendations