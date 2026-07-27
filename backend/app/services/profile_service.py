import json
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[2]
PROFILE_FILE = BASE_DIR / "data" / "user_profile.json"


class ProfileService:

    def get_profile(self):
        with open(PROFILE_FILE, "r", encoding="utf-8") as file:
            return json.load(file)