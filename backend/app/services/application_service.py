import json
import os

BASE_DIR = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "..")
)

DATA_DIR = os.path.join(BASE_DIR, "data")

FILE_PATH = os.path.join(DATA_DIR, "applications.json")


def ensure_file():

    os.makedirs(DATA_DIR, exist_ok=True)

    if not os.path.exists(FILE_PATH):

        with open(FILE_PATH, "w") as f:

            json.dump([], f)


def get_applications():

    ensure_file()

    with open(FILE_PATH, "r") as f:

        return json.load(f)


def save_applications(data):

    ensure_file()

    with open(FILE_PATH, "w") as f:

        json.dump(data, f, indent=4)


def add_application(application):

    apps = get_applications()

    apps.append(application)

    save_applications(apps)

    return application
def update_application_status(index, status):

    apps = get_applications()

    if index < 0 or index >= len(apps):
        return None

    apps[index]["status"] = status

    save_applications(apps)

    return apps[index]