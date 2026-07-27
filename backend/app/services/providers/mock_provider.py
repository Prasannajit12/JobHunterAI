"""
Mock Job Provider

This provider returns sample jobs.
Later we will replace or extend it with
real Indian job providers.
"""


def get_mock_jobs():

    return [

        {
            "id": 1,
            "company": "Microsoft",
            "title": "Technical Support Engineer",
            "location": "Hyderabad",
            "experience": 2,
            "salary": "6 LPA",
            "work_mode": "Hybrid",
            "skills": [
                "Windows",
                "Office 365",
                "Networking",
                "Technical Support"
            ],
            "url": "https://careers.microsoft.com/"
        },

        {
            "id": 2,
            "company": "Google",
            "title": "Application Support Engineer",
            "location": "Bangalore",
            "experience": 2,
            "salary": "8 LPA",
            "work_mode": "Hybrid",
            "skills": [
                "Linux",
                "SQL",
                "Python",
                "Application Support"
            ],
            "url": "https://careers.google.com/"
        },

        {
            "id": 3,
            "company": "Infosys",
            "title": "IT Support Engineer",
            "location": "Hyderabad",
            "experience": 1,
            "salary": "4.5 LPA",
            "work_mode": "On-site",
            "skills": [
                "Windows",
                "Active Directory",
                "Office 365"
            ],
            "url": "https://career.infosys.com/"
        },

        {
            "id": 4,
            "company": "TCS",
            "title": "Service Desk Analyst",
            "location": "Pune",
            "experience": 2,
            "salary": "5 LPA",
            "work_mode": "On-site",
            "skills": [
                "IT Support",
                "Networking",
                "Windows"
            ],
            "url": "https://www.tcs.com/careers"
        },

        {
            "id": 5,
            "company": "Accenture",
            "title": "Cloud Support Engineer",
            "location": "Bangalore",
            "experience": 2,
            "salary": "7 LPA",
            "work_mode": "Hybrid",
            "skills": [
                "AWS",
                "Linux",
                "Cloud",
                "Python"
            ],
            "url": "https://www.accenture.com/in-en/careers"
        }

    ]