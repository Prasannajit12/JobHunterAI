from fastapi import APIRouter
from app.services.job_service import JobService

router = APIRouter()

@router.get("/jobs")
def get_jobs():

    job_service = JobService()

    jobs = job_service.get_jobs()

    result = []

    for job in jobs:
        result.append({
            "company": job.company,
            "title": job.title,
            "location": job.location,
            "experience": job.experience,
            "salary": job.salary,
            "job_type": job.job_type,
            "skills": job.skills,
            "link": job.link
        })

    return result