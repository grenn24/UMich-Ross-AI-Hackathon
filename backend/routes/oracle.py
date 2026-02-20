from fastapi import APIRouter, HTTPException
from mock_data import STUDENTS

router = APIRouter()


# ── Oracle AI Language ────────────────────────────────────────────────────────

@router.post("/analyze-language")
def analyze_language(body: dict):
    """
    Oracle AI Language mock.
    Input:  { "text": str, "label": str (optional) }
    Output: Sentiment, complexity, curiosity, vitality scores + word/sentence breakdown.
    """
    text = body.get("text", "").strip()
    label = body.get("label", "text")

    if not text:
        raise HTTPException(status_code=400, detail="'text' field is required.")

    return {
        "label": label,
        "scores": _analyze(text),
        "wordCount": len(text.split()),
        "sentenceCount": max(1, text.count(".") + text.count("!") + text.count("?")),
    }


@router.post("/compare-language")
def compare_language(body: dict):
    """
    Oracle AI Language side-by-side comparison.
    Input:  { "week1": str, "current": str }
    Output: Scores for both + delta + degradation flag.
    """
    week1 = body.get("week1", "").strip()
    current = body.get("current", "").strip()

    if not week1 or not current:
        raise HTTPException(status_code=400, detail="Both 'week1' and 'current' fields are required.")

    week1_scores = _analyze(week1)
    current_scores = _analyze(current)

    deltas = {k: round(current_scores[k] - week1_scores[k], 1) for k in week1_scores}
    degraded = sum(1 for v in deltas.values() if v < -10) >= 2

    return {
        "week1": {"text": week1, "scores": week1_scores},
        "current": {"text": current, "scores": current_scores},
        "deltas": deltas,
        "linguisticDegradationDetected": degraded,
        "summary": _degradation_summary(deltas, degraded)
    }


@router.get("/compare-language/{student_id}")
def compare_student_language(student_id: str):
    """
    Convenience endpoint: compare a specific student's Week 1 vs current post
    using their pre-stored posts in mock data.
    """
    student = next((s for s in STUDENTS if s["id"] == student_id), None)
    if not student:
        raise HTTPException(status_code=404, detail=f"Student '{student_id}' not found.")

    week1_scores = _analyze(student["week1Post"])
    current_scores = _analyze(student["currentPost"])
    deltas = {k: round(current_scores[k] - week1_scores[k], 1) for k in week1_scores}
    degraded = sum(1 for v in deltas.values() if v < -10) >= 2

    return {
        "studentId": student_id,
        "name": student["name"],
        "week1": {"text": student["week1Post"], "scores": week1_scores},
        "current": {"text": student["currentPost"], "scores": current_scores},
        "deltas": deltas,
        "linguisticDegradationDetected": degraded,
        "summary": _degradation_summary(deltas, degraded)
    }


# ── Oracle Pulse Calculator ───────────────────────────────────────────────────

@router.post("/calculate-pulse")
def calculate_pulse_detailed(body: dict):
    """
    Oracle ML Pulse Calculator mock — shows the weighted formula step by step.
    Input: {
        "submissionTimeliness": 0-100,
        "postFrequency": 0-100,
        "postSentiment": 0-100,
        "loginFrequency": 0-100,
        "peerInteraction": 0-100,
        "gradeTrajectory": 0-100
    }
    Output: Weighted breakdown + final Pulse Score.
    """
    WEIGHTS = {
        "submissionTimeliness": 0.25,
        "postFrequency":        0.20,
        "postSentiment":        0.20,
        "loginFrequency":       0.15,
        "peerInteraction":      0.10,
        "gradeTrajectory":      0.10,
    }

    signals = {}
    for key, weight in WEIGHTS.items():
        val = body.get(key)
        if val is None:
            raise HTTPException(status_code=400, detail=f"Missing required signal: '{key}'")
        if not (0 <= val <= 100):
            raise HTTPException(status_code=400, detail=f"'{key}' must be between 0 and 100.")
        signals[key] = val

    breakdown = []
    weighted_total = 0.0
    for key, weight in WEIGHTS.items():
        contribution = round(signals[key] * weight, 2)
        weighted_total += contribution
        breakdown.append({
            "signal": key,
            "rawScore": signals[key],
            "weight": weight,
            "contribution": contribution
        })

    pulse_score = round(weighted_total, 1)
    risk_level = _pulse_to_risk(pulse_score)

    return {
        "pulseScore": pulse_score,
        "riskLevel": risk_level,
        "breakdown": breakdown,
        "formula": "Σ (signal × weight) for all 6 signals",
        "interpretation": _pulse_interpretation(pulse_score)
    }


# ── Oracle Digital Assistant ──────────────────────────────────────────────────

@router.post("/generate-draft")
def generate_draft(body: dict):
    """
    Oracle Digital Assistant mock — generates personalized outreach email.
    Input:  { "studentId": str } OR full override fields.
    Output: Personalized email draft + metadata.
    """
    student_id = body.get("studentId")
    student = None

    if student_id:
        student = next((s for s in STUDENTS if s["id"] == student_id), None)
        if not student:
            raise HTTPException(status_code=404, detail=f"Student '{student_id}' not found.")

    # Allow override of any field for flexibility
    name = body.get("name", student["name"] if student else "Student")
    course = body.get("course", student["course"] if student else "your course")
    risk_level = body.get("riskLevel", student["riskLevel"] if student else "HIGH")
    strongest_moment = body.get("strongestMoment", student["strongestMoment"] if student else "showed strong potential early in the course")
    top_signals = body.get("topSignals", student["topSignals"] if student else [])

    first_name = name.split()[0]
    signal_context = f" I noticed {top_signals[0].lower()}." if top_signals else ""

    draft = f"""Hi {first_name},

I wanted to reach out personally because I care about how you're doing in {course}.

I remember when you {strongest_moment} — that kind of work reflects exactly the ability I know you have.{signal_context}

The past few weeks seem like they may have been more challenging, and I completely understand that life gets busy. I'd love to connect for a quick 15-minute chat — no pressure at all, just a chance to check in and see if there's anything I can do to support you.

Would any time this week work for you?

Warm regards,
Your Academic Advisor"""

    return {
        "studentId": student_id,
        "name": name,
        "riskLevel": risk_level,
        "draft": draft,
        "personalizationNotes": {
            "strongestMomentUsed": strongest_moment,
            "primarySignalReferenced": top_signals[0] if top_signals else None,
            "toneCalibration": _tone_for_risk(risk_level)
        }
    }


# ── Oracle Analytics ──────────────────────────────────────────────────────────

@router.get("/university-heatmap")
def university_heatmap():
    """
    Oracle Analytics Cloud mock — university-wide wellness heatmap.
    Returns course-level aggregate Pulse Scores by week.
    """
    from mock_data import COURSE_DATA

    heatmap = {}
    for course_id, course in COURSE_DATA.items():
        heatmap[course_id] = {
            "courseName": course["name"],
            "weeklyPressure": [
                {
                    "week": row["week"],
                    "pressure": row["pressure"],
                    "riskZone": _pressure_to_zone(row["pressure"])
                }
                for row in course["weeklyPressure"]
            ]
        }
    return {"heatmap": heatmap, "generatedAt": "Week 9, Semester 1"}


# ── Private helpers ───────────────────────────────────────────────────────────

def _analyze(text: str) -> dict:
    """Deterministic scoring from raw text. No ML needed for demo."""
    words = text.split()
    word_count = len(words)
    avg_word_len = sum(len(w.strip(".,!?;:")) for w in words) / max(word_count, 1)
    questions = text.count("?")
    exclamations = text.count("!")
    unique_words = len(set(w.lower().strip(".,!?;:") for w in words))
    lexical_diversity = unique_words / max(word_count, 1)

    sentiment = min(100, round((word_count * 2.0) + (exclamations * 8) + (questions * 3)))
    complexity = min(100, round(avg_word_len * 11))
    curiosity  = min(100, round(questions * 20 + word_count * 0.8 + exclamations * 5))
    vitality   = min(100, round(word_count * 2.5 + lexical_diversity * 30))

    return {
        "sentiment": sentiment,
        "complexity": complexity,
        "curiosity": curiosity,
        "vitality": vitality
    }


def _degradation_summary(deltas: dict, degraded: bool) -> str:
    worst = min(deltas, key=deltas.get)
    worst_val = deltas[worst]
    if degraded:
        return (f"Significant linguistic degradation detected. "
                f"Largest decline in '{worst}' ({worst_val:+.0f} points). "
                f"Student engagement signals are weakening across multiple dimensions.")
    return "Language patterns remain relatively stable. No critical degradation detected."


def _pulse_to_risk(pulse: float) -> str:
    if pulse < 25: return "CRITICAL"
    if pulse < 45: return "HIGH"
    if pulse < 65: return "WATCH"
    return "STABLE"


def _pulse_interpretation(pulse: float) -> str:
    if pulse < 25:
        return "Student is in critical distress. Immediate advisor outreach is strongly recommended."
    if pulse < 45:
        return "Student is showing significant strain. Schedule a check-in within 48 hours."
    if pulse < 65:
        return "Student is on a watch list. Monitor trends closely over the next 1-2 weeks."
    return "Student is performing well. Maintain regular check-in cadence."


def _tone_for_risk(risk: str) -> str:
    return {
        "CRITICAL": "Urgent but warm — prioritize connection over academics",
        "HIGH":     "Concerned and supportive — offer concrete help",
        "WATCH":    "Gentle check-in — acknowledge effort, offer support",
        "STABLE":   "Positive reinforcement — celebrate progress"
    }.get(risk, "Supportive")


def _pressure_to_zone(pressure: int) -> str:
    if pressure >= 60: return "RED"
    if pressure >= 45: return "ORANGE"
    if pressure >= 30: return "YELLOW"
    return "GREEN"
