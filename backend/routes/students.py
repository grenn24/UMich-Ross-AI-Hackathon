from fastapi import APIRouter, HTTPException, Query
from typing import Optional
from mock_data import get_course_data, get_students

router = APIRouter()


def compute_pulse(pressure: float, resilience: float) -> float:
    """Core Pulse Score formula: resilience / (pressure + 1) * 100, capped at 100."""
    return round(min(100, (resilience / (pressure + 1)) * 100), 1)


@router.get("/")
def get_all_students(
    risk_level: Optional[str] = Query(None, description="Filter by CRITICAL / HIGH / WATCH / STABLE"),
    sort_by: Optional[str] = Query("pulseScore", description="Sort field: pulseScore | name | riskLevel"),
    order: Optional[str] = Query("asc", description="asc or desc")
):
    """
    Return all students, optionally filtered by risk level and sorted.
    Default: sorted by pulseScore ascending (lowest = most at risk first).
    """
    students = get_students()
    results = [_enrich_student(s) for s in students]

    if risk_level:
        valid_levels = {"CRITICAL", "HIGH", "WATCH", "STABLE"}
        if risk_level.upper() not in valid_levels:
            raise HTTPException(status_code=400, detail=f"Invalid risk_level. Choose from {valid_levels}")
        results = [s for s in results if s["riskLevel"] == risk_level.upper()]

    reverse = order.lower() == "desc"
    if sort_by == "name":
        results.sort(key=lambda s: s["name"], reverse=reverse)
    elif sort_by == "riskLevel":
        priority = {"CRITICAL": 0, "HIGH": 1, "WATCH": 2, "STABLE": 3}
        results.sort(key=lambda s: priority.get(s["riskLevel"], 9), reverse=reverse)
    else:
        results.sort(key=lambda s: s["pulseScore"], reverse=reverse)

    # Return summary cards (no weeklyData to keep response lean)
    return [_to_card(s) for s in results]


@router.get("/{student_id}")
def get_student(student_id: str):
    """Return full student profile including 14-week trajectory."""
    students = get_students()
    student = next((s for s in students if s["id"] == student_id), None)
    if not student:
        raise HTTPException(status_code=404, detail=f"Student '{student_id}' not found")
    return _enrich_student(student)


@router.get("/{student_id}/trajectory")
def get_trajectory(student_id: str):
    """Return only the weekly Pressure / Resilience / Pulse data for charting."""
    students = get_students()
    student = next((s for s in students if s["id"] == student_id), None)
    if not student:
        raise HTTPException(status_code=404, detail=f"Student '{student_id}' not found")
    enriched = _enrich_student(student)
    return {
        "studentId": student_id,
        "name": student["name"],
        "weeklyData": student["weeklyData"],
        "currentWeek": enriched["currentWeek"],
    }


@router.get("/{student_id}/signals")
def get_signals(student_id: str):
    """Return top contributing risk signals for a student."""
    students = get_students()
    student = next((s for s in students if s["id"] == student_id), None)
    if not student:
        raise HTTPException(status_code=404, detail=f"Student '{student_id}' not found")
    return {
        "studentId": student_id,
        "riskLevel": student["riskLevel"],
        "pulseScore": student["pulseScore"],
        "pulseTrend": student["pulseTrend"],
        "topSignals": student["topSignals"]
    }


@router.get("/{student_id}/language-drift")
def get_language_drift(student_id: str):
    """Return student writing baseline vs current drift block."""
    students = get_students()
    student = next((s for s in students if s["id"] == student_id), None)
    if not student:
        raise HTTPException(status_code=404, detail=f"Student '{student_id}' not found")
    return {
        "studentId": student_id,
        "languageBaseline": student.get("languageBaseline"),
        "languageCurrent": student.get("languageCurrent"),
    }


@router.post("/calculate-pulse")
def calculate_pulse(body: dict):
    """
    Calculate a Pulse Score on the fly from raw pressure/resilience values.
    Body: { "pressure": float, "resilience": float }
    """
    pressure = body.get("pressure")
    resilience = body.get("resilience")

    if pressure is None or resilience is None:
        raise HTTPException(status_code=400, detail="Both 'pressure' and 'resilience' are required.")
    if not (0 <= pressure <= 100) or not (0 <= resilience <= 100):
        raise HTTPException(status_code=400, detail="Values must be between 0 and 100.")

    pulse = compute_pulse(pressure, resilience)
    risk = _pulse_to_risk(pulse)

    return {
        "pressure": pressure,
        "resilience": resilience,
        "pulseScore": pulse,
        "riskLevel": risk,
        "formula": f"resilience({resilience}) / (pressure({pressure}) + 1) * 100 = {pulse}"
    }


# ── Helpers ──────────────────────────────────────────────────────────────────

def _to_card(student: dict) -> dict:
    """Strip weeklyData and posts for the dashboard list view."""
    return {
        k: v
        for k, v in student.items()
        if k not in ("weeklyData", "week1Post", "currentPost", "strongestMoment")
    }


def _pulse_to_risk(pulse: float) -> str:
    if pulse < 25:
        return "CRITICAL"
    elif pulse < 45:
        return "HIGH"
    elif pulse < 65:
        return "WATCH"
    return "STABLE"


def _enrich_student(student: dict) -> dict:
    """Attach frontend-ready current week + key metric summary."""
    weekly = student.get("weeklyData", [])
    latest = weekly[-1] if weekly else {"week": 0, "pressure": 0, "resilience": 0}
    current_week = latest.get("week", 0)

    course_data = get_course_data()
    course = course_data.get(student["course"], {})
    course_week = next(
        (w for w in course.get("weeklyPressure", []) if w["week"] == current_week),
        None,
    )
    deadlines = course_week["deadlines"] if course_week else 0

    post_words = len(student.get("currentPost", "").split())
    engagement = min(100, max(8, post_words * 6))

    enriched = {**student}
    enriched["currentWeek"] = current_week
    enriched["currentMetrics"] = {
        "pressure": latest.get("pressure", 0),
        "resilience": latest.get("resilience", 0),
        "deadlines": deadlines,
        "engagement": engagement,
    }
    enriched["predictedStress"] = min(
        100,
        max(
            0,
            int((100 - enriched.get("pulseScore", 0)) * 0.75 + latest.get("pressure", 0) * 0.25),
        ),
    )
    return enriched
