from fastapi import APIRouter, UploadFile, File
import os
import shutil
import json

from app.resume.resume_parser import ResumeParser
from app.resume.skill_extractor import SkillExtractor
from app.resume.profile_generator import ProfileGenerator
from app.resume.ats_calculator import ATSCalculator
from app.resume.missing_skills import MissingSkillsAnalyzer
from app.resume.resume_suggestions import ResumeSuggestions

router = APIRouter()


@router.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):

    # -------------------------
    # Save Uploaded Resume
    # -------------------------

    os.makedirs("uploads", exist_ok=True)

    file_path = os.path.join("uploads", file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # -------------------------
    # Parse Resume
    # -------------------------

    parser = ResumeParser()

    resume_text = parser.extract_text(file_path)

    # -------------------------
    # Extract Skills
    # -------------------------

    extractor = SkillExtractor()

    skills = extractor.extract_skills(resume_text)

    # -------------------------
    # Generate Profile
    # -------------------------

    generator = ProfileGenerator()

    profile = generator.generate_profile(
        resume_text,
        skills
    )

    # -------------------------
    # ATS Score
    # -------------------------

    ats = ATSCalculator()

    ats_result = ats.calculate(skills)

    # -------------------------
    # Missing Skills
    # -------------------------

    missing = MissingSkillsAnalyzer()

    missing_result = missing.find_missing_skills(skills)

    # -------------------------
    # AI Suggestions
    # -------------------------

    suggestion_engine = ResumeSuggestions()

    analysis = suggestion_engine.generate(
        profile,
        ats_result,
        missing_result
    )

    # -------------------------
    # Save User Data
    # -------------------------

    os.makedirs("data", exist_ok=True)

    with open("data/user_profile.json", "w") as f:

        json.dump(profile, f, indent=4)

    # NEW

    with open("data/user_skills.json", "w") as f:

        json.dump(
            {
                "skills": skills
            },
            f,
            indent=4
        )

    # -------------------------
    # Response
    # -------------------------

    return {

        "message": "Resume Uploaded Successfully",

        "filename": file.filename,

        "profile": profile,

        "ats": ats_result,

        "missing_skills": missing_result,

        "analysis": analysis

    }