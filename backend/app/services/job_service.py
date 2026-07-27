"""
Job Service

This service manages all job providers.

Later we can add:

- Adzuna
- Remotive
- Internal Database
- AI Recommended Jobs

without changing the frontend.
"""

from app.services.providers.mock_provider import get_mock_jobs

class JobService:

    def __init__(self):

        self.providers = [
            get_mock_jobs
        ]

    def get_all_jobs(self):

        jobs = []

        for provider in self.providers:

            try:

                provider_jobs = provider()

                jobs.extend(provider_jobs)

            except Exception as error:

                print(f"Provider Error: {error}")

        return jobs


# Singleton Instance

job_service = JobService()