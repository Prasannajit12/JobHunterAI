class ResumeMatcher:
    def __init__(self):
        pass

    def calculate_match(self, user_skills, job_skills):
        """
        Calculate a simple skill match percentage.
        """

        if not job_skills:
            return 0

        user_skills = {skill.lower() for skill in user_skills}
        job_skills = {skill.lower() for skill in job_skills}

        matched = user_skills.intersection(job_skills)

        score = int((len(matched) / len(job_skills)) * 100)

        return score

    def recommend_jobs(self, jobs, user_skills):
        """
        Add match score to each job and sort by highest match.
        """

        recommendations = []

        for job in jobs:
            score = self.calculate_match(
                user_skills,
                job.get("skills", [])
            )

            job_copy = job.copy()
            job_copy["match_score"] = score

            recommendations.append(job_copy)

        recommendations.sort(
            key=lambda x: x["match_score"],
            reverse=True
        )

        return recommendations