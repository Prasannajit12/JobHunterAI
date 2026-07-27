class MissingSkillsAnalyzer:

    def find_missing_skills(self, skills):

        required_skills = [
            "Python",
            "SQL",
            "Windows",
            "Linux",
            "AWS",
            "Azure",
            "Docker",
            "Kubernetes",
            "Networking",
            "Git",
            "GitHub",
            "Active Directory",
            "Office 365",
            "Technical Support",
            "Customer Support",
            "Excel"
        ]

        missing = []

        for skill in required_skills:
            if skill not in skills:
                missing.append(skill)

        return missing