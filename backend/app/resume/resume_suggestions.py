class ResumeSuggestions:

    def generate(self, profile, ats, missing_skills):

        strengths = []

        weaknesses = []

        suggestions = []

        # Strengths

        if profile["experience"] >= 2:
            strengths.append("2+ years of experience")

        if "Python" in profile["skills"]:
            strengths.append("Python knowledge")

        if "SQL" in profile["skills"]:
            strengths.append("SQL knowledge")

        if "Technical Support" in profile["skills"]:
            strengths.append("Technical Support background")

        # Weaknesses

        for skill in missing_skills:
            weaknesses.append(f"Missing {skill}")

        # Suggestions

        for skill in missing_skills:
            suggestions.append(f"Learn {skill}")

        if ats["score"] < 60:
            suggestions.append("Add measurable achievements")
            suggestions.append("Improve ATS keywords")
            suggestions.append("Upload GitHub projects")
            suggestions.append("Customize resume for every job")

        return {
            "strengths": strengths,
            "weaknesses": weaknesses,
            "suggestions": suggestions
        }