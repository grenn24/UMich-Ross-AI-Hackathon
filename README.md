# Student Pulse — FastAPI Backend

## Setup

```bash
python -m venv .venv
.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
Call the backend server at: https://umich-ross-ai-hackathon-production.up.railway.app\ 
Interactive docs auto-generated at: **http://localhost:8000/docs**

---

## Endpoint Reference

### 🏥 Health
| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Root health check |
| GET | `/api/health` | API health status |

---

### 👩‍🎓 Students — `/api/students`
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/students/` | All students (sorted by Pulse Score asc by default) |
| GET | `/api/students/?risk_level=CRITICAL` | Filter by CRITICAL / HIGH / WATCH / STABLE |
| GET | `/api/students/?sort_by=name&order=asc` | Sort by name, riskLevel, or pulseScore |
| GET | `/api/students/{id}` | Full student profile with 14-week trajectory |
| GET | `/api/students/{id}/trajectory` | Weekly Pressure/Resilience/Pulse chart data only |
| GET | `/api/students/{id}/signals` | Top risk signals for a student |
| POST | `/api/students/calculate-pulse` | Calculate Pulse Score from raw pressure+resilience |

**POST `/api/students/calculate-pulse` body:**
```json
{ "pressure": 75, "resilience": 30 }
```

---

### 🤖 Oracle AI — `/api/oracle`
| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/oracle/analyze-language` | Score a single text block |
| POST | `/api/oracle/compare-language` | Side-by-side Week 1 vs current comparison |
| GET | `/api/oracle/compare-language/{student_id}` | Auto-compare student's stored posts |
| POST | `/api/oracle/calculate-pulse` | Weighted signal breakdown (6-factor formula) |
| POST | `/api/oracle/generate-draft` | Generate personalized outreach email |
| GET | `/api/oracle/university-heatmap` | Course-level pressure heatmap data |

**POST `/api/oracle/analyze-language` body:**
```json
{ "text": "I love this course! So many great questions to explore.", "label": "Week 1" }
```

**POST `/api/oracle/compare-language` body:**
```json
{
  "week1": "I find this topic really fascinating...",
  "current": "submitted."
}
```

**POST `/api/oracle/calculate-pulse` body:**
```json
{
  "submissionTimeliness": 40,
  "postFrequency": 20,
  "postSentiment": 30,
  "loginFrequency": 50,
  "peerInteraction": 10,
  "gradeTrajectory": 60
}
```

**POST `/api/oracle/generate-draft` body:**
```json
{ "studentId": "001" }
```
Or with manual overrides:
```json
{
  "name": "Maya Chen",
  "course": "CS301",
  "riskLevel": "CRITICAL",
  "strongestMoment": "scored 94% on Week 3",
  "topSignals": ["Late submissions 3 weeks running"]
}
```

---

### 🏫 Courses — `/api/courses`
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/courses/` | All courses with pressure summary |
| GET | `/api/courses/{course_id}` | Full course detail + enrolled students + Oracle rec |
| GET | `/api/courses/{course_id}/recommendation` | Oracle deadline redistribution recommendation only |

Available course IDs: `CS301`, `BUS210`

---

## Pulse Score Formula

```
Pulse Score = resilience / (pressure + 1) * 100   [capped at 100]
```

| Pulse Score | Risk Level |
|-------------|------------|
| 0 – 24      | CRITICAL   |
| 25 – 44     | HIGH       |
| 45 – 64     | WATCH      |
| 65 – 100    | STABLE     |

## Weighted Pulse Formula (6-signal version)

| Signal | Weight |
|--------|--------|
| Submission Timeliness | 25% |
| Post Frequency | 20% |
| Post Sentiment | 20% |
| Login Frequency | 15% |
| Peer Interaction | 10% |
| Grade Trajectory | 10% |
