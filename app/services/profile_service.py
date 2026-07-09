import json


class ProfileService:

    def get_profile(self):

        with open("data/user_profile.json", "r") as file:
            return json.load(file)