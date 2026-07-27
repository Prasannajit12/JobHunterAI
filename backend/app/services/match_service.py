"""
AI Resume Match Service

Calculates:
- Match Score
- Matched Skills
- Missing Skills
"""

def calculate_match(resume_skills, job_skills):

    # Normalize skills
    resume = {skill.lower().strip() for skill in resume_skills}
    job = {skill.lower().strip() for skill in job_skills}

    # Find common skills
    matched = sorted(resume.intersection(job))

    # Find missing skills
    missing = sorted(job.difference(resume))

    # Match percentage
    if len(job) == 0:
        score = 0
    else:
        score = round((len(matched) / len(job)) * 100)

    return {
        "score": score,
        "matched_skills": matched,
        "missing_skills": missing
    }