import webbrowser

from app.services.job_service import JobService
from app.services.resume_service import ResumeService
from app.services.profile_service import ProfileService
from app.matcher.resume_matcher import ResumeMatcher


def main():

    print("=" * 60)
    print("🚀 Welcome to JobHunter AI")
    print("=" * 60)

    # ==========================
    # Load User Profile
    # ==========================
    profile_service = ProfileService()
    profile = profile_service.get_profile()

    print(f"\n👋 Welcome, {profile['name']}")
    print(f"💼 Experience        : {profile['experience']} Years")
    print(f"📍 Preferred Location: {profile['preferred_location']}")
    print(f"💰 Expected Salary   : ₹{profile['expected_salary']:,}")
    print(f"⏳ Notice Period     : {profile['notice_period']}")

    print("\n" + "=" * 60)

    # ==========================
    # Read Resume
    # ==========================
    resume_service = ResumeService()
    skills = resume_service.extract_skills()

    print("\n🧠 Skills Found\n")

    for skill in skills:
        print(f"✅ {skill}")

    print("\n" + "=" * 60)

    # ==========================
    # Load Jobs
    # ==========================
    job_service = JobService()
    jobs = job_service.get_jobs()

    # ==========================
    # Recommendation Engine
    # ==========================
    matcher = ResumeMatcher()

    recommendations = []

    for job in jobs:
        result = matcher.calculate_match(profile, job)
        recommendations.append(result)

    # Sort jobs by highest score
    recommendations.sort(key=lambda x: x["score"], reverse=True)

    # ==========================
    # Display Recommended Jobs
    # ==========================
    print("\n🏆 TOP RECOMMENDED JOBS\n")

    for index, item in enumerate(recommendations, start=1):

        print("=" * 60)
        print(f"{index}. {item['company']}")
        print(f"💼 Role       : {item['title']}")
        print(f"⭐ Match Score: {item['score']}%")

        print("\nReasons:")
        for reason in item["reasons"]:
            print(reason)

        print("\nMatched Skills:")
        for skill in item["matched_skills"]:
            print(f"✔ {skill}")

        print(f"\n🔗 Apply Link : {item['job'].link}")

    print("=" * 60)

    # ==========================
    # Open Job Link
    # ==========================
    choice = input("\nEnter job number to open (0 to Exit): ")

    if choice.isdigit():

        choice = int(choice)

        if 1 <= choice <= len(recommendations):

            selected_job = recommendations[choice - 1]["job"]

            print(f"\n🌍 Opening {selected_job.company} Careers...\n")

            webbrowser.open(selected_job.link)

        else:

            print("\n👋 Thank you for using JobHunter AI.")


if __name__ == "__main__":
    main()