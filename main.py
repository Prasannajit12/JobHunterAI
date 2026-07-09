from app.services.job_service import JobService
from app.services.resume_service import ResumeService
from app.services.profile_service import ProfileService


def main():
    print("=" * 60)
    print("🚀 Welcome to JobHunter AI")
    print("=" * 60)

    # Load User Profile
    profile_service = ProfileService()
    profile = profile_service.get_profile()

    print(f"\n👋 Welcome, {profile['name']}")
    print(f"💼 Experience        : {profile['experience']} Years")
    print(f"📍 Preferred Location: {profile['preferred_location']}")
    print(f"💰 Expected Salary   : ₹{profile['expected_salary']:,}")
    print(f"⏳ Notice Period     : {profile['notice_period']}")

    print("\n" + "=" * 60)

    # Read Resume
    resume_service = ResumeService()
    skills = resume_service.extract_skills()

    print("\n🧠 Skills Found\n")

    for skill in skills:
        print(f"✅ {skill}")

    print("\n" + "=" * 60)

    # Search Jobs
    job_service = JobService()

    location = input("📍 Enter location: ")

    jobs = job_service.get_jobs_by_location(location)

    print(f"\n✅ Found {len(jobs)} matching job(s)\n")

    if len(jobs) == 0:
        print("❌ No jobs found for this location.")
    else:
        for job in jobs:
            job.display()


if __name__ == "__main__":
    main()