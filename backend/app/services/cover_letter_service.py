from app.models.cover_letter import CoverLetterRequest
from app.services.groq_service import generate_ai_cover_letter


def generate_cover_letter(request: CoverLetterRequest):
    return generate_ai_cover_letter(
        applicant_name=request.applicant_name,
        company=request.company,
        job_title=request.job_title,
        experience=request.experience,
        skills=request.skills,
    )