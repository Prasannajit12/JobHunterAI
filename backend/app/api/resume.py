from fastapi import APIRouter, UploadFile, File

from backend.app.resume.resume_parser import ResumeParser
from backend.app.resume.skill_extractor import SkillExtractor
from backend.app.resume.profile_generator import ProfileGenerator
from backend.app.resume.ats_calculator import ATSCalculator

import os
import shutil
import json

router = APIRouter()


@router.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):

    # -----------------------------------
    # Create uploads folder
    # -----------------------------------
    os.makedirs("uploads", exist_ok=True)

    # -----------------------------------
    # Save uploaded resume
    # -----------------------------------
    file_path = os.path.join("uploads", file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # -----------------------------------
    # Parse Resume
    # -----------------------------------
    parser = ResumeParser()
    resume_text = parser.extract_text(file_path)

    # -----------------------------------
    # Extract Skills
    # -----------------------------------
    extractor = SkillExtractor()
    skills = extractor.extract_skills(resume_text)

    # -----------------------------------
    # Generate Profile
    # -----------------------------------
    generator = ProfileGenerator()
    profile = generator.generate_profile(resume_text, skills)

    # -----------------------------------
    # Calculate ATS Score
    # -----------------------------------
    ats = ATSCalculator()
    ats_result = ats.calculate(skills)

    # -----------------------------------
    # Save Profile
    # -----------------------------------
    os.makedirs("data", exist_ok=True)

    with open("data/user_profile.json", "w") as f:
        json.dump(profile, f, indent=4)

    # -----------------------------------
    # Return Response
    # -----------------------------------
    return {
        "message": "Resume uploaded successfully ✅",
        "filename": file.filename,
        "profile": profile,
        "ats": ats_result
    }