from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# -----------------------------
# Import API Routers
# -----------------------------
from app.api.jobs import router as jobs_router
from app.api.profile import router as profile_router
from app.api.recommendations import router as recommendations_router
from app.api.resume import router as resume_router
from app.api.live_jobs import router as live_jobs_router
from app.api.search import router as search_router
from app.api.user import router as user_router
from app.api.applications import router as applications_router
from app.api.analytics import router as analytics_router
from app.api.cover_letter import router as cover_letter_router

# -----------------------------
# Create FastAPI App
# -----------------------------
app = FastAPI(
    title="JobHunter AI",
    description="AI Powered Career Platform",
    version="2.1.0"
)

# -----------------------------
# CORS Configuration
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://localhost:5176",
        "http://localhost:5177",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Register API Routes
# -----------------------------
app.include_router(profile_router)
app.include_router(jobs_router)
app.include_router(recommendations_router)
app.include_router(resume_router)
app.include_router(live_jobs_router)
app.include_router(search_router)
app.include_router(user_router)
app.include_router(applications_router)
app.include_router(analytics_router)
app.include_router(cover_letter_router)

# -----------------------------
# Root Endpoint
# -----------------------------
@app.get("/")
def home():
    return {
        "message": "🚀 Welcome to JobHunter AI Backend",
        "status": "Running Successfully",
        "version": "2.1.0"
    }

# -----------------------------
# Health Check
# -----------------------------
@app.get("/health")
def health():
    return {
        "status": "healthy",
        "backend": "JobHunter AI",
        "version": "2.1.0"
    }