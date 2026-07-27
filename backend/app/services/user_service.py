import json
import os


PROFILE_FILE = "data/user_profile.json"
SKILLS_FILE = "data/user_skills.json"


def get_user_profile():

    if not os.path.exists(PROFILE_FILE):

        return {}

    try:

        with open(PROFILE_FILE, "r") as f:

            return json.load(f)

    except Exception:

        return {}


def get_user_skills():

    if not os.path.exists(SKILLS_FILE):

        return []

    try:

        with open(SKILLS_FILE, "r") as f:

            data = json.load(f)

            return data.get("skills", [])

    except Exception:

        return []