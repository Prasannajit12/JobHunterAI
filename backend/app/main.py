from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.app.api.jobs import router as jobs_router
from backend.app.api.profile import router as profile_router
from backend.app.api.recommendations import router as recommendations_router
from backend.app.api.resume import router as resume_router

app = FastAPI(
    title="JobHunter AI",
    description="AI Powered Job Search Assistant",
    version="1.0.0"
)

# ----------------------------
# CORS
# ----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------------
# API Routes
# ----------------------------
app.include_router(jobs_router)
app.include_router(profile_router)
app.include_router(recommendations_router)
app.include_router(resume_router)

# ----------------------------
# Home
# ----------------------------
@app.get("/")
def home():

    return {

        "message": "🚀 Welcome to JobHunter AI"

    }