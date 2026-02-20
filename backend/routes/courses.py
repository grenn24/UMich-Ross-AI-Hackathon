from fastapi import APIRouter, HTTPException
from mock_data import COURSE_DATA, STUDENTS

router = APIRouter()


@router.get("/")
def get_all_courses():
    """List all courses with their top-level pressure summary."""
    results = []
    for course_id, course in COURSE_DATA.items():
        pressures = [w["pressure"] for w in course["weeklyPressure"]]
        peak_week = max(course["weeklyPressure"], key=lambda w: w["pressure"])
        results.append({
            "courseId": course_id,
            "name": course["name"],
            "professor": course["professor"],
            "avgPressure": round(sum(pressures) / len(pressures), 1),
            "peakPressure": peak_week["pressure"],
            "peakWeek": peak_week["week"],
            "deadlineClusterDetected": _has_cluster(course["weeklyPressure"])
        })
    return results


@router.get("/{course_id}")
def get_course(course_id: str):
    """Full course detail including weekly pressure and Oracle recommendation."""
    course = COURSE_DATA.get(course_id.upper())
    if not course:
        raise HTTPException(status_code=404, detail=f"Course '{course_id}' not found.")

    enrolled = [
        {
            "id": s["id"],
            "name": s["name"],
            "riskLevel": s["riskLevel"],
            "pulseScore": s["pulseScore"],
            "pulseTrend": s["pulseTrend"]
        }
        for s in STUDENTS if s["course"] == course_id.upper()
    ]

    pressures = [w["pressure"] for w in course["weeklyPressure"]]

    return {
        "courseId": course_id.upper(),
        "name": course["name"],
        "professor": course["professor"],
        "avgPressure": round(sum(pressures) / len(pressures), 1),
        "weeklyPressure": [{**w, "riskZone": _pressure_to_zone(w["pressure"])} for w in course["weeklyPressure"]],
        "deadlineClusterDetected": _has_cluster(course["weeklyPressure"]),
        "enrolledStudents": sorted(enrolled, key=lambda s: s["pulseScore"]),
        "oracleRecommendation": course["oracleRecommendation"]
    }


@router.get("/{course_id}/recommendation")
def get_recommendation(course_id: str):
    """Return only the Oracle deadline redistribution recommendation for a course."""
    course = COURSE_DATA.get(course_id.upper())
    if not course:
        raise HTTPException(status_code=404, detail=f"Course '{course_id}' not found.")
    return {
        "courseId": course_id.upper(),
        **course["oracleRecommendation"]
    }


def _has_cluster(weekly_pressure: list) -> bool:
    return any(w["deadlines"] >= 3 for w in weekly_pressure)


def _pressure_to_zone(pressure: int) -> str:
    if pressure >= 60:
        return "RED"
    if pressure >= 45:
        return "ORANGE"
    if pressure >= 30:
        return "YELLOW"
    return "GREEN"
