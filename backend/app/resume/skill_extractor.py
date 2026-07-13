class SkillExtractor:

    def __init__(self):

        self.skills_database = [
            "Python",
            "Java",
            "JavaScript",
            "React",
            "FastAPI",
            "SQL",
            "MySQL",
            "PostgreSQL",
            "Windows",
            "Linux",
            "Networking",
            "Active Directory",
            "Office 365",
            "Azure",
            "AWS",
            "Docker",
            "Kubernetes",
            "Git",
            "GitHub",
            "Technical Support",
            "Application Support",
            "Customer Support",
            "Incident Management",
            "ServiceNow",
            "Jira",
            "HTML",
            "CSS",
            "SEO",
            "US Taxation",
            "Excel"
        ]

    def extract_skills(self, resume_text):

        found_skills = []

        resume_lower = resume_text.lower()

        for skill in self.skills_database:

            if skill.lower() in resume_lower:
                found_skills.append(skill)

        return sorted(list(set(found_skills)))