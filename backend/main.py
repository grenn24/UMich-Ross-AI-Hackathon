from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import students, oracle, courses

app = FastAPI(
    title="Student Pulse API",
    description="Backend for the Student Pulse academic wellness platform. Powered by Oracle AI mock integrations.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],       # tighten this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(students.router, prefix="/api/students", tags=["Students"])
app.include_router(oracle.router,   prefix="/api/oracle",   tags=["Oracle AI"])
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
