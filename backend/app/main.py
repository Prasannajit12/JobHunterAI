from fastapi import FastAPI

from backend.app.api.jobs import router as jobs_router
from backend.app.api.profile import router as profile_router
from backend.app.api.recommendations import router as recommendations_router

app = FastAPI(
    title="JobHunter AI",
    description="AI Powered Job Search Assistant",
    version="1.0.0"
)

app.include_router(jobs_router)
app.include_router(profile_router)
app.include_router(recommendations_router)


@app.get("/")
def home():
    return {
        "message": "Welcome to JobHunter AI 🚀"
    }