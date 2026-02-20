import json
<<<<<<< Updated upstream
from pathlib import Path


_ROOT = Path(__file__).resolve().parent
_DATA_DIR = _ROOT / "data"


def _load_json(filename: str):
    with (_DATA_DIR / filename).open("r", encoding="utf-8") as fp:
        return json.load(fp)


def get_students():
    return _load_json("students.json")


def get_course_data():
    return _load_json("courses.json")


# Backward-compatible snapshots for modules that still import constants.
STUDENTS = get_students()
COURSE_DATA = get_course_data()
=======
import random
from pathlib import Path


_RNG = random.Random(42)
_ROOT = Path(__file__).resolve().parent
_SCENARIO_PATH = _ROOT / "data" / "student_scenario.json"


def _load_scenario() -> dict:
    with _SCENARIO_PATH.open("r", encoding="utf-8") as fp:
        return json.load(fp)


def _clamp(value: int, low: int, high: int) -> int:
    return max(low, min(high, value))


def _sample(range_pair: list[int]) -> int:
    return _RNG.randint(int(range_pair[0]), int(range_pair[1]))


def _tone(value: int, inverse: bool = False) -> str:
    if inverse:
        if value <= 25:
            return "critical"
        if value <= 55:
            return "warning"
        return "stable"
    if value >= 75:
        return "critical"
    if value >= 45:
        return "warning"
    return "stable"


def _risk_profile_rows(risk: str, pressure: int, resilience: int) -> tuple[list[dict], list[dict]]:
    pressure_rows = [
        ("Deadline density", _clamp(int(pressure * 1.05), 0, 100)),
        ("Exams (14 days)", _clamp(int(pressure * 0.95), 0, 100)),
        ("GPA trajectory", _clamp(int(pressure * 0.88), 0, 100)),
        ("Credit overload", _clamp(int(pressure * 0.98), 0, 100)),
        ("Late submissions", _clamp(int(pressure * 1.02), 0, 100)),
    ]
    resilience_rows = [
        ("Sleep stability", _clamp(int(resilience * 0.92), 0, 100)),
        ("Linguistic vitality", _clamp(int(resilience * 0.96), 0, 100)),
        ("Social connection", _clamp(int(resilience * 0.89), 0, 100)),
        ("Cognitive engagement", _clamp(int(resilience * 1.03), 0, 100)),
        ("Help-seeking", _clamp(int(resilience * 0.85), 0, 100)),
    ]
    return (
        [{"label": k, "value": v, "tone": _tone(v)} for k, v in pressure_rows],
        [{"label": k, "value": v, "tone": _tone(v, inverse=True)} for k, v in resilience_rows],
    )


def _generate_posts(risk: str, major: str) -> tuple[str, str]:
    baseline = (
        f"I've been connecting this week's {major.lower()} framework with prior coursework and "
        "I want to test whether my assumptions hold across different scenarios."
    )
    if risk == "CRITICAL":
        current = "Done."
    elif risk == "HIGH":
        current = "Submitted, still confused on parts."
    elif risk == "WATCH":
        current = "I think this approach works, but I need to verify one assumption."
    else:
        current = "I compared two approaches and found a useful pattern for next week's assignment."
    return baseline, current


def _generate_weekly_series(pressure_end: int, resilience_end: int, risk: str) -> list[dict]:
    points = []
    pressure_start = _clamp(pressure_end - _RNG.randint(18, 34), 10, 90)
    resilience_start = _clamp(resilience_end + _RNG.randint(14, 30), 15, 96)
    for week in range(1, 15):
        t = (week - 1) / 13
        pressure = int(round(pressure_start + (pressure_end - pressure_start) * t + _RNG.uniform(-2.5, 2.5)))
        resilience = int(round(resilience_start + (resilience_end - resilience_start) * t + _RNG.uniform(-2.5, 2.5)))
        pressure = _clamp(pressure, 0, 100)
        resilience = _clamp(resilience, 0, 100)
        pulse = round(min(100, (resilience / (pressure + 1)) * 100), 1)
        if risk == "CRITICAL":
            pulse = min(pulse, 29.0)
        elif risk == "HIGH":
            pulse = _clamp(int(pulse), 30, 49)
        elif risk == "WATCH":
            pulse = _clamp(int(pulse), 50, 69)
        else:
            pulse = _clamp(int(pulse), 70, 95)
        points.append(
            {
                "week": week,
                "pressure": pressure,
                "resilience": resilience,
                "pulseScore": pulse,
            }
        )
    return points


def _assign_courses(course_ids: list[str], primary: str) -> list[str]:
    available = [cid for cid in course_ids if cid != primary]
    chosen = _RNG.sample(available, k=min(3, len(available)))
    return [primary, *chosen]


def _build_course_data(scenario: dict) -> dict:
    courses = {}
    for course in scenario["course_catalog"]:
        weekly_pressure = []
        for idx, pressure in enumerate(course["weekly_pressure"], start=1):
            deadlines = int(course["deadline_pattern"][idx - 1])
            weekly_pressure.append(
                {
                    "week": idx,
                    "pressure": int(pressure),
                    "deadlines": deadlines,
                    "assignments": [f"Week {idx} Deliverable {n}" for n in range(1, deadlines + 1)],
                }
            )
        peak = max(weekly_pressure, key=lambda row: row["pressure"])
        courses[course["id"]] = {
            "name": course["name"],
            "professor": course["professor"],
            "weeklyPressure": weekly_pressure,
            "oracleRecommendation": {
                "issue": f"Peak pressure detected in Week {peak['week']} ({peak['pressure']}).",
                "action": f"Shift one deadline from Week {peak['week']} to Week {min(14, peak['week'] + 1)}.",
                "projectedPressureReduction": _clamp(int(peak["pressure"] * 0.18), 4, 36),
                "projectedOutcomeImprovement": _clamp(int(peak["pressure"] * 0.11), 3, 24),
            },
        }
    return courses


def _build_students(scenario: dict) -> list[dict]:
    total = int(scenario["total_students"])
    distribution = scenario["risk_distribution"]
    course_ids = [c["id"] for c in scenario["course_catalog"]]
    majors = scenario["majors"]
    years = scenario["year_levels"]
    advisors = scenario["advisor_pool"]
    departments = scenario["departments"]
    first_names = scenario["name_pool"]["first"]
    last_names = scenario["name_pool"]["last"]

    risk_sequence = []
    for risk, count in distribution.items():
        risk_sequence.extend([risk] * int(count))
    if len(risk_sequence) != total:
        raise ValueError(f"Risk counts ({len(risk_sequence)}) do not match total_students ({total}).")
    _RNG.shuffle(risk_sequence)

    students = []
    for idx, risk in enumerate(risk_sequence, start=1):
        profile = scenario["risk_profiles"][risk]
        major = _RNG.choice(majors)
        year = _RNG.choice(years)
        advisor = _RNG.choice(advisors)
        department = _RNG.choice(departments)
        primary_course = _RNG.choice(course_ids)
        enrolled = _assign_courses(course_ids, primary_course)
        course_labels = [cid.replace("ECON", "ECON ").replace("STATS", "STATS ").replace("POLISCI", "POLISCI ").replace("FIN", "FIN ").replace("MKT", "MKT ").replace("PSYCH", "PSYCH ").replace("BUS", "BUS ") for cid in enrolled]

        first = first_names[(idx - 1) % len(first_names)]
        last = last_names[((idx - 1) * 3) % len(last_names)]
        name = f"{first} {last}"
        if idx == 1:
            name = "Maya Chen"
            risk = "CRITICAL"
            profile = scenario["risk_profiles"][risk]
            primary_course = "ECON401"
            enrolled = _assign_courses(course_ids, primary_course)
            course_labels = [cid.replace("ECON", "ECON ").replace("STATS", "STATS ").replace("POLISCI", "POLISCI ").replace("FIN", "FIN ").replace("MKT", "MKT ").replace("PSYCH", "PSYCH ").replace("BUS", "BUS ") for cid in enrolled]

        pulse_score = _sample(profile["pulse_range"])
        pulse_trend = _sample(profile["trend_range"])
        declining_weeks = _sample(profile["declining_weeks_range"])
        pressure_current = _sample(profile["pressure_range"])
        resilience_current = _sample(profile["resilience_range"])
        baseline_pulse = _clamp(pulse_score + abs(min(pulse_trend, 0)) + _RNG.randint(4, 12), pulse_score, 99)
        credit_hours = _RNG.randint(13, 21)
        top_signals = profile["signals"]
        week1_post, current_post = _generate_posts(risk, major)
        pressure_rows, resilience_rows = _risk_profile_rows(risk, pressure_current, resilience_current)
        weekly = _generate_weekly_series(pressure_current, resilience_current, risk)

        baseline_words = len(week1_post.split())
        current_words = len(current_post.split())

        student = {
            "id": f"{idx:03d}",
            "name": name,
            "course": primary_course,
            "riskLevel": risk,
            "pulseScore": pulse_score,
            "pulseTrend": pulse_trend,
            "topSignals": top_signals,
            "strongestMoment": f"demonstrated strong analytical reasoning in {course_labels[0]}",
            "week1Post": week1_post,
            "currentPost": current_post,
            "year": year,
            "major": major,
            "creditHours": credit_hours,
            "advisorName": advisor,
            "department": department,
            "courses": course_labels,
            "decliningWeeks": declining_weeks,
            "baselinePulse": baseline_pulse,
            "dashboardTags": [
                top_signals[0],
                f"{credit_hours} credit load",
                f"{declining_weeks} weeks declining" if declining_weeks > 0 else "No decline streak",
            ],
            "pressureBreakdown": pressure_rows,
            "resilienceBreakdown": resilience_rows,
            "languageBaseline": {
                "title": "Week 2 — Baseline",
                "quote": week1_post,
                "metrics": [
                    f"Sentiment {round(_RNG.uniform(0.68, 0.87), 2)}",
                    f"Grade {_RNG.randint(10, 14)} level",
                    f"{_RNG.randint(2, 4)} questions asked",
                    f"{baseline_words} words",
                ],
            },
            "languageCurrent": {
                "title": "Week 8 — Current",
                "quote": current_post,
                "metrics": [
                    f"Sentiment {round(_RNG.uniform(0.35, 0.79), 2)}",
                    f"Grade {_RNG.randint(4, 12)} level",
                    f"{_RNG.randint(0, 2)} questions",
                    f"{current_words} words",
                ],
            },
            "behavioralBaseline": {
                "avgLoginHour": f"{_RNG.randint(8, 11)}:{_RNG.randint(0, 59):02d} AM",
                "submissionHour": f"{_RNG.randint(1, 5)}:{_RNG.randint(0, 59):02d} PM",
                "postWordCount": f"{baseline_words} avg",
                "peerReplyRate": f"{round(_RNG.uniform(2.0, 5.0), 1)} / week",
            },
            "behavioralDeviation": {
                "loginHour": f"{_RNG.randint(11, 23)}:{_RNG.randint(0, 59):02d}",
                "submissionHour": f"{_RNG.randint(8, 11)}:{_RNG.randint(0, 59):02d} PM",
                "postWordCount": f"{current_words} words",
                "anomalyFlag": f"{_RNG.randint(1, 6)} signals concurrent" if risk in {"HIGH", "CRITICAL"} else "No severe anomaly",
            },
            "weeklyData": weekly,
        }
        students.append(student)

    # Final exact distribution check (after forcing first row to CRITICAL)
    target = scenario["risk_distribution"]
    counts = {"STABLE": 0, "WATCH": 0, "HIGH": 0, "CRITICAL": 0}
    for s in students:
        counts[s["riskLevel"]] += 1
    # If first-student override skewed counts by 1, rebalance deterministically.
    for risk, want in target.items():
        while counts[risk] > want:
            for s in students[::-1]:
                if s["riskLevel"] == risk and s["id"] != "001":
                    for dst, dst_want in target.items():
                        if counts[dst] < dst_want:
                            s["riskLevel"] = dst
                            counts[risk] -= 1
                            counts[dst] += 1
                            break
                    break
    return students


SCENARIO = _load_scenario()
COURSE_DATA = _build_course_data(SCENARIO)
STUDENTS = _build_students(SCENARIO)
>>>>>>> Stashed changes
