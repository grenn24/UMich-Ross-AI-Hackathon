from fastapi import APIRouter, HTTPException
import json
import os
import time
import uuid
from openai import OpenAI
from mock_data import get_course_data, get_students

router = APIRouter()
openai_client = OpenAI()


# ── PulseAI Narrative Intelligence ────────────────────────────────────────────────────────

@router.post("/analyze-language")
def analyze_language(body: dict):
    """
    PulseAI Narrative Intelligence mock.
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
    PulseAI Narrative Intelligence side-by-side comparison.
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
    students = get_students()
    student = next((s for s in students if s["id"] == student_id), None)
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


# ── PulseAI Forecast Matrix ───────────────────────────────────────────────────

@router.post("/calculate-pulse")
def calculate_pulse_detailed(body: dict):
    """
    PulseAI Aegis Pulse Index mock — shows the weighted formula step by step.
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


# ── PulseAI Concierge Copilot ──────────────────────────────────────────────────

@router.post("/generate-draft")
def generate_draft(body: dict):
    """
    PulseAI Concierge Copilot mock — generates personalized outreach email.
    Input:  { "studentId": str } OR full override fields.
    Output: Personalized email draft + metadata.
    """
    start_time = time.perf_counter()
    student_id = body.get("studentId")
    student = None

    if student_id:
        students = get_students()
        student = next((s for s in students if s["id"] == student_id), None)
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

    fallback_draft = f"""Hi {first_name},

I wanted to reach out personally because I care about how you're doing in {course}.

I remember when you {strongest_moment} — that kind of work reflects exactly the ability I know you have.{signal_context}

The past few weeks seem like they may have been more challenging, and I completely understand that life gets busy. I'd love to connect for a quick 15-minute chat — no pressure at all, just a chance to check in and see if there's anything I can do to support you.

Would any time this week work for you?

Warm regards,
Your Academic Advisor"""

    draft, draft_reason, draft_model = _openai_text(
        prompt=(
            "You are an empathetic academic advisor. "
            "Write a concise outreach email with warm, non-judgmental tone and one clear call to action.\n\n"
            f"Student first name: {first_name}\n"
            f"Course: {course}\n"
            f"Strongest moment: {strongest_moment}\n"
            f"Risk signal context:{signal_context or ' none'}\n"
            "Constraints: 120-180 words, include invitation for a 15-minute check-in this week."
        ),
        max_output_tokens=360,
    )
    fallback_used = False
    if not draft or not draft.strip():
        draft = fallback_draft
        fallback_used = True

    return {
        "studentId": student_id,
        "name": name,
        "riskLevel": risk_level,
        "draft": draft,
        "personalizationNotes": {
            "strongestMomentUsed": strongest_moment,
            "primarySignalReferenced": top_signals[0] if top_signals else None,
            "toneCalibration": _tone_for_risk(risk_level)
        },
        "metadata": _meta(
            provider="fallback" if fallback_used else "openai",
            model=None if fallback_used else draft_model,
            fallback_used=fallback_used,
            fallback_reason=draft_reason if fallback_used else None,
            started_at=start_time,
        ),
    }


@router.post("/chatbot-insight")
def chatbot_insight(body: dict):
    """
    Student-level chatbot endpoint.
    Input: { "studentId": str, "prompt": str }
    Output: graph + explanatory paragraph for stress causes.
    Uses OpenAI Chat Completions with deterministic fallback.
    """
    start_time = time.perf_counter()
    student_id = str(body.get("studentId", "")).strip()
    prompt = str(body.get("prompt", "")).strip()

    if not student_id:
        raise HTTPException(status_code=400, detail="'studentId' field is required.")
    if not prompt:
        raise HTTPException(status_code=400, detail="'prompt' field is required.")

    students = get_students()
    student = next((s for s in students if s["id"] == student_id), None)
    if not student:
        raise HTTPException(status_code=404, detail=f"Student '{student_id}' not found.")

    fallback = _fallback_chatbot_insight(student=student, prompt=prompt)
    openai_prompt = (
        "You are an academic advisor assistant. Based on the student profile and user prompt, "
        "return ONLY valid compact JSON with keys: paragraph (string), graphData (array of exactly 3 objects). "
        "Each graphData object must have: label (short string), value (integer 0-100).\n"
        "The paragraph must be structured exactly with section headers and bullets:\n"
        "Summary:\n"
        "Key Drivers:\n"
        "- item\n"
        "- item\n"
        "Recommended Actions:\n"
        "- item\n"
        "- item\n\n"
        f"Student name: {student['name']}\n"
        f"Risk level: {student['riskLevel']}\n"
        f"Pulse score: {student['pulseScore']}\n"
        f"Top signals: {', '.join(student['topSignals'])}\n"
        f"User prompt: {prompt}\n"
    )

    completion, reason, model = _openai_chat(
        prompt=openai_prompt,
        max_tokens=260,
        temperature=0.3,
    )

    provider = "openai"
    fallback_used = False
    graph_data = fallback["graphData"]
    paragraph = fallback["paragraph"]

    if completion:
        parsed = _extract_json(completion)
        if parsed:
            try:
                candidate_graph = parsed.get("graphData", [])
                candidate_paragraph = str(parsed.get("paragraph", "")).strip()
                validated = []
                for row in candidate_graph[:3]:
                    label = str(row.get("label", "")).strip()[:40]
                    value = int(row.get("value", 0))
                    validated.append({"label": label or "Signal", "value": max(0, min(100, value))})
                if len(validated) == 3 and candidate_paragraph:
                    graph_data = validated
                    paragraph = candidate_paragraph
                else:
                    fallback_used = True
                    reason = reason or "OpenAI JSON did not match expected schema."
            except Exception:
                fallback_used = True
                reason = reason or "OpenAI JSON parsing failed."
        else:
            fallback_used = True
            reason = reason or "OpenAI response had no JSON object."
    else:
        provider = "fallback"
        fallback_used = True

    return {
        "studentId": student_id,
        "prompt": prompt,
        "graphData": graph_data,
        "paragraph": paragraph,
        "metadata": _meta(
            provider=provider,
            model=model,
            fallback_used=fallback_used,
            fallback_reason=reason if fallback_used else None,
            started_at=start_time,
        ),
    }


@router.get("/stress-cause/{student_id}")
def stress_cause(student_id: str):
    """
    AI-generated stress-cause summary + graph based on real student stress scores.
    """
    start_time = time.perf_counter()
    students = get_students()
    student = next((s for s in students if s["id"] == student_id), None)
    if not student:
        raise HTTPException(status_code=404, detail=f"Student '{student_id}' not found.")

    latest = student.get("weeklyData", [])[-1] if student.get("weeklyData") else {"pressure": 0, "resilience": 0}
    prompt = (
        "Analyze student stress drivers and return ONLY valid JSON with keys: paragraph (string), "
        "graphData (array with 3 objects {label, value}). Values must be 0-100 integers.\n"
        "The paragraph must use this exact structure:\n"
        "Summary:\n"
        "Key Drivers:\n"
        "- item\n"
        "- item\n"
        "Recommended Actions:\n"
        "- item\n"
        "- item\n\n"
        f"Student: {student['name']}\n"
        f"Risk level: {student['riskLevel']}\n"
        f"Pulse score: {student['pulseScore']}\n"
        f"Pressure: {latest.get('pressure', 0)}\n"
        f"Resilience: {latest.get('resilience', 0)}\n"
        f"Top signals: {', '.join(student.get('topSignals', []))}\n"
    )

    completion, reason, model = _openai_chat(prompt=prompt, max_tokens=260, temperature=0.2)
    fallback = _fallback_chatbot_insight(student=student, prompt="stress-cause")
    graph_data = fallback["graphData"]
    paragraph = fallback["paragraph"]
    provider = "openai"
    fallback_used = False

    parsed = _extract_json(completion) if completion else None
    if parsed:
        try:
            rows = []
            for row in parsed.get("graphData", [])[:3]:
                label = str(row.get("label", "")).strip()[:40] or "Signal"
                value = int(row.get("value", 0))
                rows.append({"label": label, "value": max(0, min(100, value))})
            text = str(parsed.get("paragraph", "")).strip()
            if len(rows) == 3 and text:
                graph_data = rows
                paragraph = text
            else:
                fallback_used = True
                reason = reason or "OpenAI JSON missing required fields."
        except Exception:
            fallback_used = True
            reason = reason or "OpenAI JSON parse failed."
    else:
        provider = "fallback"
        fallback_used = True
        reason = reason or "OpenAI response missing JSON."

    return {
        "studentId": student_id,
        "graphData": graph_data,
        "paragraph": paragraph,
        "metadata": _meta(
            provider=provider,
            model=model,
            fallback_used=fallback_used,
            fallback_reason=reason if fallback_used else None,
            started_at=start_time,
        ),
    }


@router.post("/refine-draft")
def refine_draft(body: dict):
    """
    Human validation/refinement endpoint for outreach email.
    Input: { "studentId": str, "currentDraft": str, "instruction": str }
    """
    start_time = time.perf_counter()
    student_id = str(body.get("studentId", "")).strip()
    current_draft = str(body.get("currentDraft", "")).strip()
    instruction = str(body.get("instruction", "")).strip()

    if not student_id:
        raise HTTPException(status_code=400, detail="'studentId' field is required.")
    if not current_draft:
        raise HTTPException(status_code=400, detail="'currentDraft' field is required.")
    if not instruction:
        raise HTTPException(status_code=400, detail="'instruction' field is required.")

    students = get_students()
    student = next((s for s in students if s["id"] == student_id), None)
    if not student:
        raise HTTPException(status_code=404, detail=f"Student '{student_id}' not found.")

    refine_prompt = (
        "Revise the email draft with the user instruction. Keep it concise, supportive, and advisor-appropriate.\n\n"
        f"Student name: {student['name']}\n"
        f"Risk level: {student['riskLevel']}\n"
        f"Instruction: {instruction}\n\n"
        f"Current draft:\n{current_draft}\n"
    )

    completion, reason, model = _openai_chat(
        prompt=refine_prompt,
        max_tokens=360,
        temperature=0.4,
    )

    if completion and completion.strip():
        refined = completion.strip()
        provider = "openai"
        fallback_used = False
        fallback_reason = None
    else:
        refined = f"{current_draft}\n\n[Refinement request captured: {instruction}]"
        provider = "fallback"
        fallback_used = True
        fallback_reason = reason or "OpenAI completion was empty."

    return {
        "studentId": student_id,
        "refinedDraft": refined,
        "metadata": _meta(
            provider=provider,
            model=model,
            fallback_used=fallback_used,
            fallback_reason=fallback_reason,
            started_at=start_time,
        ),
    }


# ── PulseAI Insight Analytics ──────────────────────────────────────────────────────────

@router.get("/university-heatmap")
def university_heatmap():
    """
    PulseAI Insight Analytics Cloud mock — university-wide wellness heatmap.
    Returns course-level aggregate Pulse Scores by week.
    """
    students = get_students()
    course_data = get_course_data()
    heatmap = {}
    for course_id, course in course_data.items():
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

    # Student-level heatmap rows for visualization page (all students x 14 weeks)
    student_rows = []
    for i in range(len(students)):
        student = students[i % len(students)]
        weekly = student.get("weeklyData", [])
        by_week = {row["week"]: row for row in weekly}
        row_values = []
        for week in range(1, 15):
            point = by_week.get(week)
            if point:
                pressure = int(point.get("pressure", 50))
            else:
                # Deterministic filler for missing weeks while preserving student trend shape
                tail_pressure = int(weekly[-1]["pressure"]) if weekly else 50
                pressure = max(0, min(100, tail_pressure + ((week + i) % 7) - 3))
            row_values.append({
                "week": week,
                "pressure": pressure,
                "riskZone": _pressure_to_zone(pressure),
            })
        student_rows.append({
            "studentId": f"{student['id']}-{i+1:03d}",
            "name": student["name"],
            "weeklyPressure": row_values,
        })

    return {
        "heatmap": heatmap,
        "studentHeatmap": student_rows,
        "generatedAt": "Week 9, Semester 1",
    }


@router.get("/showcase/{student_id}")
def oracle_showcase(student_id: str):
    """
    Composite payload for PulseAI Intelligence Studio screen cards.
    Returns static-backed, student-specific blocks mirroring the demo UI.
    """
    students = get_students()
    student = next((s for s in students if s["id"] == student_id), None)
    if not student:
        raise HTTPException(status_code=404, detail=f"Student '{student_id}' not found.")

    pressure_score = 88 if student["id"] == "001" else student.get("currentMetrics", {}).get("pressure", 65)
    resilience_score = 23 if student["id"] == "001" else student.get("currentMetrics", {}).get("resilience", 40)

    return {
        "studentId": student_id,
        "languageService": {
            "badge": "PulseAI SignalSense Studio",
            "title": "Linguistic Vitality Analysis",
            "description": "NLP on Canvas discussion post text",
            "input": student.get("currentPost", ""),
            "outputs": [
                {"key": "Sentiment score", "value": "0.41 — neutral/negative", "tone": "warning"},
                {"key": "Reading level", "value": "Grade 4 (↓ from 14)", "tone": "critical"},
                {"key": "Word count", "value": "8 words (↓ from 127)", "tone": "critical"},
                {"key": "Curiosity markers", "value": "0 (↓ from 3)", "tone": "critical"},
                {"key": "Intellectual risk", "value": "None detected", "tone": "critical"},
                {"key": "Vitality change", "value": "↓ 71% from baseline", "tone": "critical"},
            ],
            "showProcessing": True,
            "processingLabel": "Processing NLP analysis...",
        },
        "mlService": {
            "badge": "PulseAI Forecast Matrix",
            "title": "Pulse Score Calculator",
            "description": "Pressure / Resilience ratio model",
            "formulaText": f"Pulse = ( Resilience ÷ Pressure ) × 100 = ( {resilience_score} ÷ {pressure_score} ) × 100 = 26",
            "pressureScore": pressure_score,
            "resilienceScore": resilience_score,
            "weightedBreakdown": {
                "pressure": [
                    {"key": "Deadlines × 30%", "value": "95 × .30 = 28.5", "tone": "critical"},
                    {"key": "Exams × 25%", "value": "80 × .25 = 20.0", "tone": "warning"},
                    {"key": "GPA trend × 20%", "value": "75 × .20 = 15.0", "tone": "warning"},
                ],
                "resilience": [
                    {"key": "Linguistic × 25%", "value": "20 × .25 = 5.0", "tone": "critical"},
                    {"key": "Sleep × 25%", "value": "15 × .25 = 3.75", "tone": "critical"},
                    {"key": "Social × 20%", "value": "18 × .20 = 3.6", "tone": "critical"},
                ],
            },
        },
        "databaseService": {
            "badge": "PulseAI Chronicle Vault",
            "title": "Behavioral Fingerprint",
            "description": "Personal baseline vs. current deviation",
            "baselineLabel": f"{student['name'].split()[0]} — Week 1-3 Baseline",
            "deviationLabel": "Week 8 — Deviation",
            "baseline": student.get("behavioralBaseline", {}),
            "deviation": student.get("behavioralDeviation", {}),
        },
        "assistantService": {
            "badge": "PulseAI Concierge Copilot",
            "title": "Personalized Outreach",
            "description": "Context-aware email generation",
            "context": [
                {"key": "Strongest moment", "value": "Week 2 behavioral econ", "tone": "accent"},
                {"key": "Pressure trigger", "value": "4 deadlines Nov 14", "tone": "critical"},
                {"key": "Tone", "value": "Warm, human, non-clinical", "tone": "accent"},
                {"key": "Avoid", "value": "AI scores, monitoring", "tone": "neutral"},
            ],
            "emailPreview": (
                f"Hi {student['name'].split()[0]}, I was looking back at your behavioral economics post "
                "from a few weeks ago — your perspective on loss aversion was genuinely insightful. "
                "I have office hours Thursday 2–4pm if you'd like to stop by."
            ),
        },
        "scaleStats": [
            {"value": "14M", "label": "Data points per semester"},
            {"value": "47", "label": "Behavioral variables tracked"},
            {"value": "3s", "label": "Full university analysis"},
            {"value": "4wk", "label": "Earlier than human detection"},
        ],
    }


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


def _openai_chat(prompt: str, max_tokens: int = 320, temperature: float = 0.4):
    text, reason, model = _openai_text(
        prompt=prompt,
        max_output_tokens=max_tokens,
        temperature=temperature,
    )
    return text, reason, model


def _openai_text(prompt: str, max_output_tokens: int = 320, temperature: float = 0.4):
    primary_model = os.getenv("OPENAI_MODEL", "gpt-5.2")
    fallback_model = os.getenv("OPENAI_FALLBACK_MODEL", "gpt-5.2-mini")
    if not os.getenv("OPENAI_API_KEY"):
        return None, "Missing OPENAI_API_KEY.", primary_model

    last_error = None
    for model in [primary_model, fallback_model]:
        try:
            response = openai_client.responses.create(
                model=model,
                input=prompt,
                temperature=temperature,
                max_output_tokens=max_output_tokens,
            )

            output_text = getattr(response, "output_text", None)
            if output_text and str(output_text).strip():
                return str(output_text).strip(), None, model

            if getattr(response, "output", None):
                for item in response.output:
                    for content in getattr(item, "content", []) or []:
                        text = getattr(content, "text", None)
                        if text and str(text).strip():
                            return str(text).strip(), None, model

            last_error = "OpenAI response had no text output."
        except Exception as error:
            last_error = f"OpenAI request failed on {model}: {str(error)[:180]}"

    return None, last_error or "OpenAI request failed.", primary_model


def _extract_json(text: str):
    start = text.find("{")
    end = text.rfind("}")
    if start == -1 or end == -1 or end <= start:
        return None
    try:
        return json.loads(text[start : end + 1])
    except Exception:
        return None


def _fallback_chatbot_insight(student: dict, prompt: str):
    risk_bias = {"CRITICAL": 88, "HIGH": 74, "WATCH": 58, "STABLE": 32}
    base = risk_bias.get(student["riskLevel"], 50)
    graph = [
        {"label": "Submission Delay", "value": min(100, max(0, base + 6))},
        {"label": "Engagement Drop", "value": min(100, max(0, base))},
        {"label": "Sentiment Shift", "value": min(100, max(0, base - 8))},
    ]
    paragraph = (
        f"Summary:\n{student['name']} is showing elevated stress pressure that needs near-term advisor support.\n"
        f"Key Drivers:\n- {student['topSignals'][0]}\n- Engagement pattern decline in recent weeks\n"
        f"Recommended Actions:\n- Run a 15-minute advisor check-in this week\n"
        f"- Reduce deadline pressure and follow up on prompt context: {prompt}"
    )
    return {"graphData": graph, "paragraph": paragraph}


def _meta(
    provider: str,
    started_at: float,
    model: str = None,
    fallback_used: bool = False,
    fallback_reason: str = None,
):
    return {
        "traceId": uuid.uuid4().hex,
        "provider": provider,
        "model": model,
        "fallbackUsed": fallback_used,
        "fallbackReason": fallback_reason,
        "latencyMs": int((time.perf_counter() - started_at) * 1000),
    }


