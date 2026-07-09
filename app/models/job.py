class Job:
    def __init__(
        self,
        title,
        company,
        location,
        experience,
        salary,
        job_type,
        skills,
        description,
        link
    ):
        self.title = title
        self.company = company
        self.location = location
        self.experience = experience
        self.salary = salary
        self.job_type = job_type
        self.skills = skills
        self.description = description
        self.link = link

    def display(self):
        print("=" * 50)
        print(f"🏢 Company      : {self.company}")
        print(f"💼 Role         : {self.title}")
        print(f"📍 Location     : {self.location}")
        print(f"👨‍💻 Experience : {self.experience} Years")
        print(f"💰 Salary       : ₹{self.salary:,}")
        print(f"🧑‍💼 Job Type    : {self.job_type}")
        print(f"🛠 Skills       : {', '.join(self.skills)}")
        print(f"🔗 Link         : {self.link}")