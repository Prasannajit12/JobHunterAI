class ResumeMatcher:

    def calculate_match(self, profile, job):

        score = 0
        reasons = []
        matched_skills = []

        # ------------------------
        # Experience Match (40)
        # ------------------------
        if profile["experience"] >= job.experience:
            score += 40
            reasons.append("✅ Experience Match")

        # ------------------------
        # Location Match (20)
        # ------------------------
        if profile["preferred_location"].lower() == job.location.lower():
            score += 20
            reasons.append("✅ Preferred Location")

        # ------------------------
        # Salary Match (10)
        # ------------------------
        if job.salary >= profile["expected_salary"]:
            score += 10
            reasons.append("✅ Salary Meets Expectation")

        # ------------------------
        # Skills Match (30)
        # ------------------------
        for skill in profile["skills"]:

            if skill in job.skills:
                matched_skills.append(skill)

        if len(job.skills) > 0:

            skill_score = (len(matched_skills) / len(job.skills)) * 30

            score += skill_score

        return {
            "company": job.company,
            "title": job.title,
            "score": round(score),
            "matched_skills": matched_skills,
            "reasons": reasons,
            "job": job
        }