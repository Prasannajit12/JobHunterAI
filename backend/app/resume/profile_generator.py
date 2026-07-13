import re


class ProfileGenerator:

    def generate_profile(self, resume_text, skills):

        profile = {
            "name": "Unknown",
            "experience": 0,
            "preferred_location": "Hyderabad",
            "expected_salary": 400000,
            "notice_period": "Immediate",
            "skills": skills
        }

        # -------- Name --------
        words = resume_text.split()

        # First two words are usually the person's name
        if len(words) >= 2:
            profile["name"] = f"{words[0].title()} {words[1].title()}"

        # -------- Experience --------
        lower_text = resume_text.lower()

        if "2 year" in lower_text or "2 years" in lower_text:
            profile["experience"] = 2
        elif "1 year" in lower_text or "1 years" in lower_text:
            profile["experience"] = 1

        return profile