import requests


def get_live_jobs():

    url = "https://www.arbeitnow.com/api/job-board-api"

    try:

        response = requests.get(url, timeout=10)

        response.raise_for_status()

        data = response.json()

        jobs = []

        for job in data.get("data", [])[:20]:

            jobs.append({
                "company": job.get("company_name"),
                "title": job.get("title"),
                "location": job.get("location"),
                "remote": job.get("remote"),
                "url": job.get("url"),
                "tags": job.get("tags", [])
            })

        return jobs

    except Exception as e:

        return {
            "error": str(e)
        }