import os
from pathlib import Path

from dotenv import load_dotenv
from groq import Groq


# Load .env from backend folder
BASE_DIR = Path(__file__).resolve().parents[2]
load_dotenv(BASE_DIR / ".env")


# Get Groq API key
api_key = os.getenv("GROQ_API_KEY")

print("Groq API Key Loaded:", bool(api_key))


# Create Groq client
client = Groq(api_key=api_key)


def generate_ai_cover_letter(
    applicant_name,
    company,
    job_title,
    experience,
    skills,
):
    prompt = f"""
You are an expert HR recruiter and professional career writer.

Write a professional, personalized, ATS-friendly cover letter.

Applicant Name: {applicant_name}
Company: {company}
Job Title: {job_title}
Professional Experience: {experience}
Skills: {", ".join(skills)}

Requirements:
- Professional and natural tone
- ATS-friendly
- Around 350-450 words
- Tailor the letter to the job title and company
- Highlight relevant technical and professional skills
- Do not invent qualifications or experience
- Do not use markdown
- Do not use bullet points
- End professionally
"""

    response = client.chat.completions.create(
        model="openai/gpt-oss-120b",
        messages=[
            {
                "role": "system",
                "content": "You are an expert professional career writer.",
            },
            {
                "role": "user",
                "content": prompt,
            },
        ],
        temperature=0.7,
        max_tokens=700,
    )

    return response.choices[0].message.content


print("Groq service imported successfully!")