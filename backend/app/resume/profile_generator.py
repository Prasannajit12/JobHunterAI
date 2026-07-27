import re


class ProfileGenerator:

    def generate_profile(self, resume_text, skills):

        profile = {}

        # -----------------------------
        # Name
        # -----------------------------
        first_line = resume_text.split("\n")[0].strip()

        if len(first_line) > 3:
            profile["name"] = first_line.title()
        else:
            profile["name"] = "Unknown"

        # -----------------------------
        # Experience
        # -----------------------------
        profile["experience"] = self.extract_experience(resume_text)

        # -----------------------------
        # Preferred Location
        # -----------------------------
        if "hyderabad" in resume_text.lower():
            profile["preferred_location"] = "Hyderabad"
        else:
            profile["preferred_location"] = "Remote"

        # -----------------------------
        # Expected Salary
        # -----------------------------
        profile["expected_salary"] = 400000

        # -----------------------------
        # Notice Period
        # -----------------------------
        profile["notice_period"] = "Immediate"

        # -----------------------------
        # Skills
        # -----------------------------
        profile["skills"] = skills

        return profile

    def extract_experience(self, text):

        text = text.lower()

        # Pattern like:
        # "2 years"
        # "2 year"
        match = re.search(r"(\d+)\s*\+?\s*years?", text)

        if match:
            return int(match.group(1))

        # Count experience sections if no explicit years found
        jobs = [
            "aotax",
            "fortunapix",
            "tech mahindra",
            "seoczar"
        ]

        count = 0

        for job in jobs:
            if job in text:
                count += 1

        if count == 0:
            return 0

        # Internship counts as 0.5 year
        if count == 1:
            return 1

        if count == 2:
            return 1

        if count == 3:
            return 2

        return 2