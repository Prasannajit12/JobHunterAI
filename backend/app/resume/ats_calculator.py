class ATSCalculator:

    def calculate(self, skills):

        # Standard ATS skills list
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
            "Active Directory",
            "Office 365",
            "Technical Support",
            "Customer Support",
            "Excel"
        ]

        matched = []

        for skill in skills:
            if skill in required_skills:
                matched.append(skill)

        score = int((len(matched) / len(required_skills)) * 100)

        if score > 100:
            score = 100

        return {
            "score": score,
            "matched_skills": matched,
            "total_required": len(required_skills),
            "matched_count": len(matched)
        }