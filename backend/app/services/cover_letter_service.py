from datetime import datetime
from app.models.cover_letter import CoverLetterRequest


def generate_cover_letter(request: CoverLetterRequest) -> str:
    today = datetime.today().strftime("%d %B %Y")

    skills = ", ".join(request.skills)

    company = request.company.strip().title()
    job_title = request.job_title.strip().title()

    return f"""{today}

Hiring Manager
{company}

Subject: Application for the position of {job_title}

Dear Hiring Manager,

I am writing to express my interest in the {job_title} position at {company}. With {request.experience} of professional experience, I have developed strong technical, analytical, and customer-focused skills that align well with the requirements of this role.

Throughout my career, I have worked in Technical Support and US Taxation, where I gained hands-on experience in troubleshooting, client communication, issue resolution, and delivering high-quality service. My technical expertise includes {skills}.

After reviewing your job description, I am confident that my background, problem-solving mindset, and ability to work effectively in fast-paced environments would enable me to make a valuable contribution to your team.

I am enthusiastic about joining {company} because of its reputation for innovation and professional excellence. I would welcome the opportunity to discuss how my skills and experience can support your organization's goals.

Thank you for considering my application. I look forward to the opportunity to speak with you.

Sincerely,

{request.applicant_name}

Email: prasannajit12@gmail.com
Phone: +91-6372735873
Location: Hyderabad, Telangana
"""