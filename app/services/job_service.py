import json

from app.models.job import Job


class JobService:

    def get_jobs(self):

        with open("data/jobs.json", "r") as file:
            data = json.load(file)

        jobs = []

        for item in data:

            job = Job(
                item["title"],
                item["company"],
                item["location"],
                item["experience"],
                item["salary"],
                item["job_type"],
                item["skills"],
                item["description"],
                item["link"]
            )

            jobs.append(job)

        return jobs

    def get_jobs_by_location(self, location):

        jobs = self.get_jobs()

        filtered_jobs = []

        for job in jobs:

            if job.location.lower() == location.lower():
                filtered_jobs.append(job)

        return filtered_jobs