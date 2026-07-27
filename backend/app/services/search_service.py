"""
Search Service

Filters jobs and calculates AI Match Score
using the uploaded resume skills.
"""

import json
import os

from app.services.job_service import job_service
from app.services.match_service import calculate_match


def load_user_skills():

    skills_file = "data/user_skills.json"

    if not os.path.exists(skills_file):

        return []

    try:

        with open(skills_file, "r") as f:

            data = json.load(f)

            return data.get("skills", [])

    except Exception as error:

        print("Error loading user skills:", error)

        return []


def search_jobs(
    keyword: str = "",
    location: str = "",
    experience: str = "",
    work_mode: str = ""
):

    jobs = job_service.get_all_jobs()

    # Load skills from uploaded resume
    user_skills = load_user_skills()

    results = []

    for job in jobs:

        title = job.get("title", "").lower()

        company = job.get("company", "").lower()

        skills = job.get("skills", [])

        job_location = job.get("location", "").lower()

        # ----------------------------
        # Keyword Filter
        # ----------------------------

        if keyword:

            search = keyword.lower()

            if (
                search not in title
                and search not in company
                and search not in " ".join(skills).lower()
            ):
                continue

        # ----------------------------
        # Location Filter
        # ----------------------------

        if location:

            if location.lower() not in job_location:
                continue

        # ----------------------------
        # Experience Filter
        # ----------------------------

        if experience:

            try:

                if job.get("experience", 0) < int(experience):
                    continue

            except Exception:
                pass

        # ----------------------------
        # Work Mode Filter
        # ----------------------------

        if work_mode and work_mode != "Any":

            if job.get("work_mode", "").lower() != work_mode.lower():
                continue

        # ----------------------------
        # AI Match
        # ----------------------------

        match = calculate_match(
            user_skills,
            skills
        )

        job["score"] = match["score"]

        job["matched_skills"] = match["matched_skills"]

        job["missing_skills"] = match["missing_skills"]

        results.append(job)

    # Highest Match First

    results.sort(
        key=lambda x: x["score"],
        reverse=True
    )

    return results