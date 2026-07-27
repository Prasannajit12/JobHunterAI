from pydantic import BaseModel

class CoverLetterRequest(BaseModel):
    company: str
    job_title: str
    job_description: str
    applicant_name: str
    experience: str
    skills: list[str]


class CoverLetterResponse(BaseModel):
    cover_letter: str