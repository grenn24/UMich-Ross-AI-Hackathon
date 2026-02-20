from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def get_all_courses():
    """Return available courses."""
    return {
        "courses": [
            {"id": "CS301", "name": "Data Structures & Algorithms", "instructor": "Dr. Smith"},
            {"id": "BUS210", "name": "Financial Analysis", "instructor": "Prof. Johnson"}
        ]
    }
