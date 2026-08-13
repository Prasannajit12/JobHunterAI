"""
Smart Job Match Service

Calculates:
- Overall Match Score
- Skills Match
- Job Title / Role Relevance
- Experience Match
- Location Match
- Salary Compatibility
- Matched Skills
- Missing Skills
- Recommendation
"""


# =========================================================
# Utility
# =========================================================

def normalize(value):
    """Normalize text for reliable comparisons."""

    if value is None:
        return ""

    return str(value).lower().strip()


# =========================================================
# Skill Matching
# =========================================================

def calculate_skill_score(resume_skills, job_skills):
    """
    Calculate skill match percentage.

    Returns:
        score
        matched_skills
        missing_skills
    """

    resume = {
        normalize(skill)
        for skill in resume_skills
        if skill
    }

    job = {
        normalize(skill)
        for skill in job_skills
        if skill
    }

    if not job:
        return 0, [], []

    matched = sorted(
        resume.intersection(job)
    )

    missing = sorted(
        job.difference(resume)
    )

    score = round(
        (len(matched) / len(job)) * 100
    )

    return score, matched, missing


# =========================================================
# Job Title / Role Matching
# =========================================================

def calculate_title_score(profile, job):
    """
    Calculate job-title relevance based on the user's
    actual skills and closely related career roles.
    """

    job_title = normalize(
        job.get("title")
    )

    profile_skills = {
        normalize(skill)
        for skill in profile.get("skills", [])
        if skill
    }

    # -----------------------------------------------------
    # User's actual role families
    # -----------------------------------------------------

    user_families = set()

    if "technical support" in profile_skills:
        user_families.add("technical_support")

    if "application support" in profile_skills:
        user_families.add("application_support")

    if "it support" in profile_skills:
        user_families.add("it_support")

    # -----------------------------------------------------
    # Job role families
    # -----------------------------------------------------

    job_families = {

        "technical_support": [
            "technical support",
            "technical support engineer",
            "technical support specialist",
        ],

        "it_support": [
            "it support",
            "it support engineer",
            "desktop support",
            "desktop support engineer",
        ],

        "service_desk": [
            "service desk",
            "service desk analyst",
            "service desk engineer",
            "help desk",
            "help desk analyst",
            "it service desk",
        ],

        "application_support": [
            "application support",
            "application support engineer",
            "application support analyst",
        ],

        "cloud_support": [
            "cloud support",
            "cloud support engineer",
            "cloud engineer",
        ],

        "software_development": [
            "software engineer",
            "software developer",
            "python developer",
            "backend developer",
            "frontend developer",
        ],
    }

    # -----------------------------------------------------
    # Exact role match
    # -----------------------------------------------------

    for family in user_families:

        for keyword in job_families.get(
            family,
            []
        ):

            if keyword == job_title:
                return 100

    # -----------------------------------------------------
    # Strong role match
    # -----------------------------------------------------

    for family in user_families:

        for keyword in job_families.get(
            family,
            []
        ):

            if keyword in job_title:

                if family == "technical_support":
                    return 100

                if family == "application_support":
                    return 100

                if family == "it_support":
                    return 95

    # -----------------------------------------------------
    # Related role scoring
    # -----------------------------------------------------

    related_roles = {

        "technical_support": {

            "service_desk": 80,
            "it_support": 85,
            "application_support": 75,
            "cloud_support": 65,
        },

        "application_support": {

            "technical_support": 80,
            "service_desk": 75,
            "it_support": 75,
            "cloud_support": 65,
        },

        "it_support": {

            "technical_support": 85,
            "service_desk": 85,
            "application_support": 75,
            "cloud_support": 65,
        },
    }

    # -----------------------------------------------------
    # Determine job family
    # -----------------------------------------------------

    detected_job_families = set()

    for family, keywords in job_families.items():

        for keyword in keywords:

            if keyword in job_title:
                detected_job_families.add(
                    family
                )

    # -----------------------------------------------------
    # Calculate related-role score
    # -----------------------------------------------------

    related_scores = []

    for user_family in user_families:

        relationships = related_roles.get(
            user_family,
            {}
        )

        for job_family in detected_job_families:

            if job_family in relationships:

                related_scores.append(
                    relationships[job_family]
                )

    if related_scores:
        return max(
            related_scores
        )

    # -----------------------------------------------------
    # Technical keywords in title
    # -----------------------------------------------------

    technical_keywords = [
        "support",
        "service",
        "technical",
        "application",
        "it",
        "system",
    ]

    if any(
        keyword in job_title
        for keyword in technical_keywords
    ):
        return 40

    # -----------------------------------------------------
    # Unrelated role
    # -----------------------------------------------------

    return 20


# =========================================================
# Experience Matching
# =========================================================

def calculate_experience_score(profile, job):
    """
    Compare user's experience with the job requirement.
    """

    try:

        user_experience = float(
            str(
                profile.get(
                    "experience",
                    "0"
                )
            )
            .lower()
            .replace("years", "")
            .replace("year", "")
            .strip()
        )

        required_experience = float(
            job.get(
                "experience",
                0
            )
        )

    except (ValueError, TypeError):

        return 0

    # No experience requirement
    if required_experience <= 0:
        return 100

    # User meets or exceeds requirement
    if user_experience >= required_experience:
        return 100

    # User is slightly below requirement
    if user_experience >= required_experience - 1:
        return 70

    # User is significantly below requirement
    return 30


# =========================================================
# Location Matching
# =========================================================

def calculate_location_score(profile, job):
    """
    Compare user's preferred/current location
    with the job location.
    """

    user_location = normalize(
        profile.get("location")
    )

    job_location = normalize(
        job.get("location")
    )

    if not user_location or not job_location:
        return 50

    # Exact location match
    if user_location == job_location:
        return 100

    # Remote job
    if "remote" in job_location:
        return 100

    # Location does not match
    return 0


# =========================================================
# Salary Matching
# =========================================================

def calculate_salary_score(profile, job):
    """
    Compare expected salary with offered salary.

    Example:

        Expected salary = 4 LPA
        Job salary      = 6 LPA
    """

    try:

        expected_salary = float(
            str(
                profile.get(
                    "expected_salary",
                    "0"
                )
            )
            .lower()
            .replace("lpa", "")
            .strip()
        )

        job_salary = float(
            str(
                job.get(
                    "salary",
                    "0"
                )
            )
            .lower()
            .replace("lpa", "")
            .strip()
        )

    except (ValueError, TypeError):

        return 0

    # Unknown salary
    if job_salary <= 0:
        return 50

    # Job meets or exceeds expectation
    if job_salary >= expected_salary:
        return 100

    # Slightly below expectation
    if job_salary >= expected_salary * 0.90:
        return 80

    # Moderately below expectation
    if job_salary >= expected_salary * 0.75:
        return 60

    # Significantly below expectation
    return 30


# =========================================================
# Recommendation
# =========================================================

def get_recommendation(score):
    """
    Convert numerical score into an actionable
    recommendation.
    """

    if score >= 80:
        return "Strongly Apply"

    if score >= 65:
        return "Apply"

    if score >= 50:
        return "Consider"

    return "Low Match"


# =========================================================
# Main Match Engine
# =========================================================

def calculate_match(profile, job):
    """
    Calculate the complete job match.

    Weighted scoring:

    Skills       = 45%
    Title        = 20%
    Experience   = 15%
    Location     = 10%
    Salary       = 10%

    Total        = 100%
    """

    # -----------------------------------------------------
    # Skills
    # -----------------------------------------------------

    (
        skill_score,
        matched_skills,
        missing_skills
    ) = calculate_skill_score(
        profile.get(
            "skills",
            []
        ),
        job.get(
            "skills",
            []
        )
    )

    # -----------------------------------------------------
    # Job title / role relevance
    # -----------------------------------------------------

    title_score = calculate_title_score(
        profile,
        job
    )

    # -----------------------------------------------------
    # Experience
    # -----------------------------------------------------

    experience_score = calculate_experience_score(
        profile,
        job
    )

    # -----------------------------------------------------
    # Location
    # -----------------------------------------------------

    location_score = calculate_location_score(
        profile,
        job
    )

    # -----------------------------------------------------
    # Salary
    # -----------------------------------------------------

    salary_score = calculate_salary_score(
        profile,
        job
    )

    # -----------------------------------------------------
    # Weighted final score
    # -----------------------------------------------------

    final_score = round(

        (skill_score * 0.45)

        + (title_score * 0.20)

        + (experience_score * 0.15)

        + (location_score * 0.10)

        + (salary_score * 0.10)

    )

    # -----------------------------------------------------
    # Recommendation
    # -----------------------------------------------------

    recommendation = get_recommendation(
        final_score
    )

    # -----------------------------------------------------
    # Return result
    # -----------------------------------------------------

    return {

        "score": final_score,

        "skill_score": skill_score,

        "title_score": title_score,

        "experience_score": experience_score,

        "location_score": location_score,

        "salary_score": salary_score,

        "matched_skills": matched_skills,

        "missing_skills": missing_skills,

        "recommendation": recommendation

    }