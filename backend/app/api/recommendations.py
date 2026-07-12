from fastapi import APIRouter

from app.services.profile_service import ProfileService
from app.services.job_service import JobService
from app.matcher.resume_matcher import ResumeMatcher

router = APIRouter()


@router.get("/recommendations")
def get_recommendations():

    profile_service = ProfileService()
    job_service = JobService()
    matcher = ResumeMatcher()

    profile = profile_service.get_profile()
    jobs = job_service.get_jobs()

    recommendations = []

    for job in jobs:

        recommendation = matcher.calculate_match(profile, job)

        recommendations.append({

            "company": job.company,
            "title": job.title,
            "location": job.location,
            "salary": job.salary,
            "job_type": job.job_type,
            "skills": job.skills,
            "link": job.link,

            "score": recommendation["score"],
            "matched_skills": recommendation["matched_skills"],
            "reasons": recommendation["reasons"]

        })

    recommendations.sort(
        key=lambda x: x["score"],
        reverse=True
    )

    return recommendations