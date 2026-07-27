from app.services.application_service import get_applications

def get_dashboard_analytics():

    applications = get_applications()

    total = len(applications)

    interviews = 0
    offers = 0
    joined = 0
    rejected = 0

    for app in applications:

        status = app.get("status", "")

        if status in [
            "HR Interview",
            "Technical Interview",
            "Manager Interview"
        ]:
            interviews += 1

        elif status == "Offer":
            offers += 1

        elif status == "Joined":
            joined += 1

        elif status == "Rejected":
            rejected += 1

    return {

        "total": total,

        "interviews": interviews,

        "offers": offers,

        "joined": joined,

        "rejected": rejected

    }