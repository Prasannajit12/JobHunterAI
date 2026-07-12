from fastapi import FastAPI
from backend.app.api.jobs import router as jobs_router

app = FastAPI(
    title="JobHunter AI",
    version="1.0.0",
    description="AI Powered Job Search Assistant"
)

app.include_router(jobs_router)


@app.get("/")
def home():
    return {
        "message": "Welcome to JobHunter AI 🚀"
    }