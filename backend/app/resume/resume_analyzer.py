class ResumeAnalyzer:

    def analyze(self, skills):

        required_skills = [
            "Python",
            "SQL",
            "Git",
            "GitHub",
            "React",
            "Docker",
            "AWS",
            "Windows",
            "Technical Support",
            "Customer Support"
        ]

        matched = []
        missing = []

        for skill in required_skills:
            if skill in skills:
                matched.append(skill)
            else:
                missing.append(skill)

        ats_score = int((len(matched) / len(required_skills)) * 100)

        suggestions = []

        if "GitHub" not in skills:
            suggestions.append("Create a GitHub portfolio.")

        if "Docker" not in skills:
            suggestions.append("Learn Docker.")

        if "React" not in skills:
            suggestions.append("Build one React project.")

        if "AWS" not in skills:
            suggestions.append("Learn AWS Cloud Fundamentals.")

        if "Git" not in skills:
            suggestions.append("Use Git for version control.")

        return {
            "ats_score": ats_score,
            "matched_skills": matched,
            "missing_skills": missing,
            "suggestions": suggestions
        }