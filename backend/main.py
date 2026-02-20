from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import students, oracle, courses
import os

app = FastAPI(
    title="Student Pulse API",
    description="Backend for the Student Pulse academic wellness platform. Powered by PulseAI mock integrations.",
    version="1.0.0"
)

default_origins = [
    "http://127.0.0.1:5173",
    "http://localhost:5173",
    "http://127.0.0.1:4173",
    "http://localhost:4173",
    "http://127.0.0.1:4174",
    "http://localhost:4174",
    "https://umich-ross-ai-hackathon.vercel.app",
]
extra_origins = [
    o.strip()
    for o in os.getenv("CORS_ALLOW_ORIGINS", "").split(",")
    if o.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=list(dict.fromkeys(default_origins + extra_origins)),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(students.router, prefix="/api/students", tags=["Students"])
app.include_router(oracle.router,   prefix="/api/oracle",   tags=["PulseAI"])
app.include_router(courses.router,  prefix="/api/courses",  tags=["Courses"])


@app.get("/", tags=["Health"])
def root():
    return {
        "status": "ok",
        "message": "Student Pulse API is running",
        "docs": "/docs"
    }


@app.get("/api/health", tags=["Health"])
def health():
    return {"status": "healthy", "version": "1.0.0"}


@app.get("/api/test-oci", tags=["Health"])
def test_oci():
    import oci
    from config import OCI_CONFIG
    try:
        ai_client = oci.ai_language.AIServiceLanguageClient(OCI_CONFIG)
        return {"status": "OCI connected successfully"}
    except Exception as e:
        return {"status": "failed", "error": str(e)}
