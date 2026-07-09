class ResumeService:

    def get_resume_text(self):

        with open("resume/resume.txt", "r") as file:
            return file.read()

    def extract_skills(self):

        text = self.get_resume_text()

        skills = []

        lines = text.split("\n")

        for line in lines:

            line = line.strip()

            if line and line not in ["Skills", "Prasannajit Panigrahi"]:

                skills.append(line)

        return skills