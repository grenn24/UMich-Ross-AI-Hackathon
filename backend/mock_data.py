from copy import deepcopy

STUDENTS = [
    {
        "id": "001",
        "name": "Maya Chen",
        "course": "ECON401",
        "riskLevel": "CRITICAL",
        "pulseScore": 19,
        "pulseTrend": -38,
        "topSignals": [
            "Late submissions 3 weeks running",
            "Linguistic vitality collapse",
            "Social withdrawal in discussion boards",
        ],
        "strongestMoment": "shared one of the strongest Week 2 behavioral economics discussion posts",
        "week1Post": "The intersection of behavioral economics and rational choice theory creates fascinating paradoxes, especially when we consider how loss aversion challenges traditional utility maximization.",
        "currentPost": "I agree with what was said above.",
        "year": "Junior",
        "major": "Economics",
        "creditHours": 18,
        "advisorName": "Dr. Sarah Chen",
        "department": "ECON Department",
        "courses": ["ECON 401", "ECON 450", "STATS 301", "POLISCI 201"],
        "decliningWeeks": 3,
        "baselinePulse": 61,
        "dashboardTags": [
            "Linguistic collapse ↓71%",
            "Sleep disrupted — 3am logins",
            "Social withdrawal",
            "4 deadlines Nov 14",
        ],
        "pressureBreakdown": [
            {"label": "Deadline density", "value": 95, "tone": "critical"},
            {"label": "Exams (14 days)", "value": 80, "tone": "warning"},
            {"label": "GPA trajectory", "value": 75, "tone": "warning"},
            {"label": "Credit overload", "value": 85, "tone": "warning"},
            {"label": "Late submissions", "value": 90, "tone": "critical"},
        ],
        "resilienceBreakdown": [
            {"label": "Sleep stability", "value": 15, "tone": "critical"},
            {"label": "Linguistic vitality", "value": 20, "tone": "critical"},
            {"label": "Social connection", "value": 18, "tone": "critical"},
            {"label": "Cognitive engagement", "value": 25, "tone": "critical"},
            {"label": "Help-seeking", "value": 10, "tone": "critical"},
        ],
        "languageBaseline": {
            "title": "Week 2 — Baseline",
            "quote": "The intersection of behavioral economics and rational choice theory creates fascinating paradoxes — especially when we consider how loss aversion challenges traditional utility maximization...",
            "metrics": ["Sentiment 0.82", "Grade 14 level", "3 questions asked", "127 words"],
        },
        "languageCurrent": {
            "title": "Week 8 — Current ↓71%",
            "quote": "I agree with what was said above.",
            "metrics": ["Sentiment 0.41", "Grade 4 level", "0 questions", "8 words"],
        },
        "behavioralBaseline": {
            "avgLoginHour": "11:24 AM",
            "submissionHour": "2:15 PM Tues",
            "postWordCount": "127 avg",
            "peerReplyRate": "4.2 / week",
        },
        "behavioralDeviation": {
            "loginHour": "2:47 AM ↑15.5 hrs",
            "submissionHour": "11:58 PM Sun",
            "postWordCount": "8 words ↓94%",
            "anomalyFlag": "5 signals concurrent",
        },
        "weeklyData": [
            {"week": 1, "pressure": 20, "resilience": 78, "pulseScore": 81},
            {"week": 2, "pressure": 24, "resilience": 76, "pulseScore": 76},
            {"week": 3, "pressure": 28, "resilience": 74, "pulseScore": 71},
            {"week": 4, "pressure": 34, "resilience": 70, "pulseScore": 64},
            {"week": 5, "pressure": 40, "resilience": 65, "pulseScore": 58},
            {"week": 6, "pressure": 56, "resilience": 52, "pulseScore": 44},
            {"week": 7, "pressure": 70, "resilience": 36, "pulseScore": 31},
            {"week": 8, "pressure": 82, "resilience": 23, "pulseScore": 19},
            {"week": 9, "pressure": 84, "resilience": 21, "pulseScore": 18},
            {"week": 10, "pressure": 86, "resilience": 20, "pulseScore": 17},
            {"week": 11, "pressure": 88, "resilience": 19, "pulseScore": 16},
            {"week": 12, "pressure": 90, "resilience": 18, "pulseScore": 15},
            {"week": 13, "pressure": 91, "resilience": 18, "pulseScore": 15},
            {"week": 14, "pressure": 92, "resilience": 17, "pulseScore": 14},
        ],
    },
    {
        "id": "002",
        "name": "Rahul Kumar",
        "course": "ECON450",
        "riskLevel": "CRITICAL",
        "pulseScore": 24,
        "pulseTrend": -41,
        "topSignals": [
            "No peer interaction for 2 weeks",
            "Submissions after 4am",
            "Rapid decline in forum depth",
        ],
        "strongestMoment": "led a Week 3 case analysis with exceptional peer feedback",
        "week1Post": "I enjoyed tying the lecture concepts to current markets and policy implications.",
        "currentPost": "Done.",
        "year": "Sophomore",
        "major": "CS + Economics",
        "creditHours": 21,
        "advisorName": "Dr. Sarah Chen",
        "department": "ECON Department",
        "courses": ["ECON 450", "ECON 401", "STATS 301"],
        "decliningWeeks": 4,
        "baselinePulse": 66,
        "dashboardTags": [
            "No peer interaction",
            "Submissions at 4am",
            "GPA declining",
        ],
        "pressureBreakdown": [
            {"label": "Deadline density", "value": 89, "tone": "critical"},
            {"label": "Exams (14 days)", "value": 78, "tone": "warning"},
            {"label": "GPA trajectory", "value": 82, "tone": "critical"},
            {"label": "Credit overload", "value": 90, "tone": "critical"},
            {"label": "Late submissions", "value": 86, "tone": "critical"},
        ],
        "resilienceBreakdown": [
            {"label": "Sleep stability", "value": 16, "tone": "critical"},
            {"label": "Linguistic vitality", "value": 22, "tone": "critical"},
            {"label": "Social connection", "value": 14, "tone": "critical"},
            {"label": "Cognitive engagement", "value": 27, "tone": "critical"},
            {"label": "Help-seeking", "value": 12, "tone": "critical"},
        ],
        "languageBaseline": {
            "title": "Week 2 — Baseline",
            "quote": "The incentive structure in this model breaks down when we treat all agents as homogeneous.",
            "metrics": ["Sentiment 0.77", "Grade 13 level", "2 questions asked", "101 words"],
        },
        "languageCurrent": {
            "title": "Week 8 — Current ↓63%",
            "quote": "Here is my submission.",
            "metrics": ["Sentiment 0.48", "Grade 5 level", "0 questions", "12 words"],
        },
        "behavioralBaseline": {
            "avgLoginHour": "10:48 AM",
            "submissionHour": "1:35 PM Thurs",
            "postWordCount": "101 avg",
            "peerReplyRate": "3.7 / week",
        },
        "behavioralDeviation": {
            "loginHour": "3:52 AM ↑17.1 hrs",
            "submissionHour": "12:44 AM Mon",
            "postWordCount": "12 words ↓88%",
            "anomalyFlag": "4 signals concurrent",
        },
        "weeklyData": [
            {"week": 1, "pressure": 18, "resilience": 80, "pulseScore": 84},
            {"week": 2, "pressure": 24, "resilience": 76, "pulseScore": 77},
            {"week": 3, "pressure": 35, "resilience": 66, "pulseScore": 66},
            {"week": 4, "pressure": 46, "resilience": 57, "pulseScore": 54},
            {"week": 5, "pressure": 56, "resilience": 48, "pulseScore": 45},
            {"week": 6, "pressure": 63, "resilience": 40, "pulseScore": 38},
            {"week": 7, "pressure": 68, "resilience": 34, "pulseScore": 31},
            {"week": 8, "pressure": 76, "resilience": 28, "pulseScore": 24},
        ],
    },
    {
        "id": "003",
        "name": "Priya Sharma",
        "course": "STATS301",
        "riskLevel": "HIGH",
        "pulseScore": 42,
        "pulseTrend": -16,
        "topSignals": ["Submission timing drifting late", "Reduced forum participation", "Test anxiety indicators"],
        "strongestMoment": "asked the top-rated question in Week 4 office hours",
        "week1Post": "Excited to connect econometrics assumptions to real datasets this semester.",
        "currentPost": "Will try this method later tonight.",
        "year": "Junior",
        "major": "Economics",
        "creditHours": 17,
        "advisorName": "Dr. Sarah Chen",
        "department": "ECON Department",
        "courses": ["STATS 301", "ECON 450", "POLISCI 201"],
        "decliningWeeks": 2,
        "baselinePulse": 69,
        "dashboardTags": ["One missed checkpoint", "Late-night submissions", "Office-hour no-show"],
        "pressureBreakdown": [
            {"label": "Deadline density", "value": 68, "tone": "warning"},
            {"label": "Exams (14 days)", "value": 74, "tone": "warning"},
            {"label": "GPA trajectory", "value": 59, "tone": "warning"},
            {"label": "Credit overload", "value": 63, "tone": "warning"},
            {"label": "Late submissions", "value": 66, "tone": "warning"},
        ],
        "resilienceBreakdown": [
            {"label": "Sleep stability", "value": 34, "tone": "warning"},
            {"label": "Linguistic vitality", "value": 42, "tone": "warning"},
            {"label": "Social connection", "value": 38, "tone": "warning"},
            {"label": "Cognitive engagement", "value": 48, "tone": "warning"},
            {"label": "Help-seeking", "value": 31, "tone": "warning"},
        ],
        "languageBaseline": {
            "title": "Week 2 — Baseline",
            "quote": "I want to test whether omitted variable bias may be driving the observed effect size.",
            "metrics": ["Sentiment 0.74", "Grade 12 level", "2 questions asked", "84 words"],
        },
        "languageCurrent": {
            "title": "Week 8 — Current ↓38%",
            "quote": "I think this is correct but not sure.",
            "metrics": ["Sentiment 0.56", "Grade 8 level", "1 question", "28 words"],
        },
        "behavioralBaseline": {
            "avgLoginHour": "12:05 PM",
            "submissionHour": "3:05 PM Wed",
            "postWordCount": "84 avg",
            "peerReplyRate": "3.1 / week",
        },
        "behavioralDeviation": {
            "loginHour": "11:55 PM ↑11.8 hrs",
            "submissionHour": "11:10 PM Sun",
            "postWordCount": "28 words ↓67%",
            "anomalyFlag": "3 signals concurrent",
        },
        "weeklyData": [
            {"week": 1, "pressure": 22, "resilience": 76, "pulseScore": 79},
            {"week": 2, "pressure": 26, "resilience": 73, "pulseScore": 74},
            {"week": 3, "pressure": 30, "resilience": 71, "pulseScore": 70},
            {"week": 4, "pressure": 36, "resilience": 66, "pulseScore": 64},
            {"week": 5, "pressure": 44, "resilience": 60, "pulseScore": 57},
            {"week": 6, "pressure": 53, "resilience": 52, "pulseScore": 49},
            {"week": 7, "pressure": 58, "resilience": 46, "pulseScore": 44},
            {"week": 8, "pressure": 61, "resilience": 43, "pulseScore": 42},
        ],
    },
    {
        "id": "004",
        "name": "Daniel Torres",
        "course": "POLISCI201",
        "riskLevel": "STABLE",
        "pulseScore": 78,
        "pulseTrend": 6,
        "topSignals": ["Consistent submission timing", "High peer engagement", "Strong linguistic depth"],
        "strongestMoment": "earned the top score on Week 5 policy brief",
        "week1Post": "Looking forward to exploring the political economy dimensions this term.",
        "currentPost": "I compared two policy frameworks and the trade-offs are clearer now.",
        "year": "Senior",
        "major": "Public Policy",
        "creditHours": 15,
        "advisorName": "Dr. Sarah Chen",
        "department": "ECON Department",
        "courses": ["POLISCI 201", "ECON 401"],
        "decliningWeeks": 0,
        "baselinePulse": 74,
        "dashboardTags": ["Consistent attendance", "Healthy sleep rhythm", "Strong forum contributions"],
        "pressureBreakdown": [
            {"label": "Deadline density", "value": 34, "tone": "stable"},
            {"label": "Exams (14 days)", "value": 31, "tone": "stable"},
            {"label": "GPA trajectory", "value": 28, "tone": "stable"},
            {"label": "Credit overload", "value": 22, "tone": "stable"},
            {"label": "Late submissions", "value": 18, "tone": "stable"},
        ],
        "resilienceBreakdown": [
            {"label": "Sleep stability", "value": 79, "tone": "stable"},
            {"label": "Linguistic vitality", "value": 82, "tone": "stable"},
            {"label": "Social connection", "value": 76, "tone": "stable"},
            {"label": "Cognitive engagement", "value": 84, "tone": "stable"},
            {"label": "Help-seeking", "value": 74, "tone": "stable"},
        ],
        "languageBaseline": {
            "title": "Week 2 — Baseline",
            "quote": "I found the comparative framework useful for understanding institutional incentives.",
            "metrics": ["Sentiment 0.71", "Grade 11 level", "2 questions asked", "73 words"],
        },
        "languageCurrent": {
            "title": "Week 8 — Current ↑6%",
            "quote": "I compared two policy frameworks and the trade-offs are clearer now.",
            "metrics": ["Sentiment 0.78", "Grade 12 level", "3 questions asked", "81 words"],
        },
        "behavioralBaseline": {
            "avgLoginHour": "10:12 AM",
            "submissionHour": "1:22 PM Tue",
            "postWordCount": "73 avg",
            "peerReplyRate": "4.6 / week",
        },
        "behavioralDeviation": {
            "loginHour": "10:35 AM +0.4 hrs",
            "submissionHour": "1:40 PM Tue",
            "postWordCount": "81 words ↑11%",
            "anomalyFlag": "No anomalies",
        },
        "weeklyData": [
            {"week": 1, "pressure": 20, "resilience": 80, "pulseScore": 82},
            {"week": 2, "pressure": 22, "resilience": 79, "pulseScore": 80},
            {"week": 3, "pressure": 24, "resilience": 78, "pulseScore": 79},
            {"week": 4, "pressure": 26, "resilience": 79, "pulseScore": 80},
            {"week": 5, "pressure": 27, "resilience": 81, "pulseScore": 82},
            {"week": 6, "pressure": 30, "resilience": 80, "pulseScore": 80},
            {"week": 7, "pressure": 31, "resilience": 79, "pulseScore": 79},
            {"week": 8, "pressure": 34, "resilience": 82, "pulseScore": 78},
        ],
    },
]


COURSE_DATA = {
    "ECON401": {
        "name": "ECON 401 — Advanced Macro",
        "professor": "Prof. Johnson",
        "weeklyPressure": [
            {"week": 1, "pressure": 30, "deadlines": 1, "assignments": ["Quiz 1"]},
            {"week": 2, "pressure": 38, "deadlines": 1, "assignments": ["Problem Set 1"]},
            {"week": 3, "pressure": 44, "deadlines": 2, "assignments": ["Essay Draft", "Discussion"]},
            {"week": 4, "pressure": 52, "deadlines": 2, "assignments": ["Problem Set 2", "Quiz 2"]},
            {"week": 5, "pressure": 60, "deadlines": 2, "assignments": ["Case Memo", "Peer Review"]},
            {"week": 6, "pressure": 67, "deadlines": 3, "assignments": ["Midterm", "Lab", "Discussion"]},
            {"week": 7, "pressure": 79, "deadlines": 3, "assignments": ["Assignment 3", "Quiz 3", "Brief"]},
            {"week": 8, "pressure": 87, "deadlines": 4, "assignments": ["Assignment 4", "Project Checkpoint", "Quiz 4", "Reflection"]},
            {"week": 9, "pressure": 70, "deadlines": 2, "assignments": ["Lab 4", "Discussion"]},
            {"week": 10, "pressure": 64, "deadlines": 2, "assignments": ["Memo 2", "Quiz 5"]},
            {"week": 11, "pressure": 58, "deadlines": 1, "assignments": ["Reading Brief"]},
            {"week": 12, "pressure": 63, "deadlines": 2, "assignments": ["Policy Note", "Discussion"]},
            {"week": 13, "pressure": 75, "deadlines": 3, "assignments": ["Final Prep", "Lab", "Quiz 6"]},
            {"week": 14, "pressure": 82, "deadlines": 3, "assignments": ["Final Exam", "Project", "Reflection"]},
        ],
        "oracleRecommendation": {
            "issue": "ECON 401 has 3 deadlines converging around Nov 14.",
            "action": "Move Assignment 3 by 5 days to reduce deadline clustering pressure.",
            "projectedPressureReduction": 34,
            "projectedOutcomeImprovement": 12,
        },
    },
    "ECON450": {
        "name": "ECON 450 — Behavioral Econ",
        "professor": "Dr. Patel",
        "weeklyPressure": [
            {"week": 1, "pressure": 24, "deadlines": 1, "assignments": ["Intro Response"]},
            {"week": 2, "pressure": 30, "deadlines": 1, "assignments": ["Case 1"]},
            {"week": 3, "pressure": 35, "deadlines": 2, "assignments": ["Quiz 1", "Discussion"]},
            {"week": 4, "pressure": 42, "deadlines": 2, "assignments": ["Case 2", "Peer Reply"]},
            {"week": 5, "pressure": 54, "deadlines": 3, "assignments": ["Midterm Prep", "Case 3", "Quiz 2"]},
            {"week": 6, "pressure": 62, "deadlines": 3, "assignments": ["Midterm", "Memo", "Discussion"]},
            {"week": 7, "pressure": 69, "deadlines": 3, "assignments": ["Case 4", "Quiz 3", "Reflection"]},
            {"week": 8, "pressure": 71, "deadlines": 2, "assignments": ["Lab", "Discussion"]},
            {"week": 9, "pressure": 63, "deadlines": 2, "assignments": ["Case 5", "Peer Reply"]},
            {"week": 10, "pressure": 58, "deadlines": 1, "assignments": ["Reading Brief"]},
            {"week": 11, "pressure": 55, "deadlines": 2, "assignments": ["Memo 2", "Quiz 4"]},
            {"week": 12, "pressure": 49, "deadlines": 1, "assignments": ["Discussion"]},
            {"week": 13, "pressure": 61, "deadlines": 2, "assignments": ["Case 6", "Final Prep"]},
            {"week": 14, "pressure": 68, "deadlines": 2, "assignments": ["Final Exam", "Reflection"]},
        ],
        "oracleRecommendation": {
            "issue": "Week 6 and 7 contain stacked case + quiz deadlines.",
            "action": "Shift Quiz 3 to Week 8 to smooth mid-semester pressure.",
            "projectedPressureReduction": 19,
            "projectedOutcomeImprovement": 9,
        },
    },
    "STATS301": {
        "name": "STATS 301 — Econometrics",
        "professor": "Dr. Lin",
        "weeklyPressure": [
            {"week": 1, "pressure": 18, "deadlines": 1, "assignments": ["Problem Set 0"]},
            {"week": 2, "pressure": 22, "deadlines": 1, "assignments": ["Lab 1"]},
            {"week": 3, "pressure": 28, "deadlines": 2, "assignments": ["PS1", "Discussion"]},
            {"week": 4, "pressure": 34, "deadlines": 2, "assignments": ["Lab 2", "Quiz 1"]},
            {"week": 5, "pressure": 40, "deadlines": 2, "assignments": ["PS2", "Peer Review"]},
            {"week": 6, "pressure": 48, "deadlines": 3, "assignments": ["Midterm", "Lab 3", "Discussion"]},
            {"week": 7, "pressure": 54, "deadlines": 2, "assignments": ["PS3", "Quiz 2"]},
            {"week": 8, "pressure": 58, "deadlines": 2, "assignments": ["Lab 4", "Reading"]},
            {"week": 9, "pressure": 52, "deadlines": 2, "assignments": ["PS4", "Discussion"]},
            {"week": 10, "pressure": 49, "deadlines": 1, "assignments": ["Quiz 3"]},
            {"week": 11, "pressure": 47, "deadlines": 1, "assignments": ["Lab 5"]},
            {"week": 12, "pressure": 44, "deadlines": 1, "assignments": ["PS5"]},
            {"week": 13, "pressure": 53, "deadlines": 2, "assignments": ["Final Prep", "Lab 6"]},
            {"week": 14, "pressure": 60, "deadlines": 2, "assignments": ["Final Exam", "Project"]},
        ],
        "oracleRecommendation": {
            "issue": "Midterm and lab due date are currently aligned in Week 6.",
            "action": "Move Lab 3 to Week 7 office-hour window.",
            "projectedPressureReduction": 11,
            "projectedOutcomeImprovement": 7,
        },
    },
    "POLISCI201": {
        "name": "POLISCI 201 — Pol. Economy",
        "professor": "Dr. Ramirez",
        "weeklyPressure": [
            {"week": 1, "pressure": 16, "deadlines": 1, "assignments": ["Intro Post"]},
            {"week": 2, "pressure": 18, "deadlines": 1, "assignments": ["Response 1"]},
            {"week": 3, "pressure": 24, "deadlines": 1, "assignments": ["Discussion"]},
            {"week": 4, "pressure": 27, "deadlines": 1, "assignments": ["Policy Memo Draft"]},
            {"week": 5, "pressure": 30, "deadlines": 1, "assignments": ["Peer Review"]},
            {"week": 6, "pressure": 33, "deadlines": 2, "assignments": ["Quiz 1", "Discussion"]},
            {"week": 7, "pressure": 35, "deadlines": 1, "assignments": ["Memo 1"]},
            {"week": 8, "pressure": 34, "deadlines": 1, "assignments": ["Reading Response"]},
            {"week": 9, "pressure": 32, "deadlines": 1, "assignments": ["Discussion"]},
            {"week": 10, "pressure": 30, "deadlines": 1, "assignments": ["Quiz 2"]},
            {"week": 11, "pressure": 28, "deadlines": 1, "assignments": ["Memo 2"]},
            {"week": 12, "pressure": 29, "deadlines": 1, "assignments": ["Peer Review"]},
            {"week": 13, "pressure": 31, "deadlines": 1, "assignments": ["Final Prep"]},
            {"week": 14, "pressure": 34, "deadlines": 1, "assignments": ["Final Reflection"]},
        ],
        "oracleRecommendation": {
            "issue": "Course pressure remains stable with no severe deadline clustering.",
            "action": "Maintain cadence and send weekly planning reminders.",
            "projectedPressureReduction": 4,
            "projectedOutcomeImprovement": 3,
        },
    },
}


def _risk_from_pulse(pulse_score: int) -> str:
    if pulse_score < 25:
        return "CRITICAL"
    if pulse_score < 45:
        return "HIGH"
    if pulse_score < 65:
        return "WATCH"
    return "STABLE"


def _expand_students(seed_students: list[dict], target_count: int = 120) -> list[dict]:
    if len(seed_students) >= target_count:
        return seed_students

    generated = list(seed_students)
    majors = [
        "Economics",
        "Public Policy",
        "Finance",
        "Data Science",
        "Statistics",
        "Political Science",
    ]
    first_names = [
        "Avery", "Jordan", "Taylor", "Morgan", "Riley", "Casey", "Parker", "Quinn", "Skyler", "Alex",
        "Logan", "Sam", "Drew", "Reese", "Cameron", "Harper", "Blake", "Hayden", "Kendall", "Rowan",
    ]
    last_names = [
        "Nguyen", "Patel", "Garcia", "Kim", "Miller", "Robinson", "Clark", "Diaz", "Lopez", "Wilson",
        "Turner", "Wright", "Hill", "Scott", "Adams", "Baker", "Nelson", "Mitchell", "Carter", "Phillips",
    ]
    courses = list(COURSE_DATA.keys())
    years = ["Freshman", "Sophomore", "Junior", "Senior"]

    idx = 0
    while len(generated) < target_count:
        template = deepcopy(seed_students[idx % len(seed_students)])
        serial = len(generated) + 1
        first = first_names[idx % len(first_names)]
        last = last_names[(idx * 3) % len(last_names)]
        name = f"{first} {last}"
        pulse_shift = ((idx % 9) - 4) * 2
        pulse = max(14, min(86, int(template["pulseScore"] + pulse_shift)))
        trend = int(template["pulseTrend"] + ((idx % 5) - 2) * 3)
        course_id = courses[idx % len(courses)]
        risk_level = _risk_from_pulse(pulse)
        major = majors[idx % len(majors)]
        declining_weeks = max(0, min(6, template.get("decliningWeeks", 1) + ((idx % 4) - 1)))
        credit_hours = 14 + (idx % 8)
        baseline = max(pulse, min(95, pulse + abs(min(trend, 0)) + 8))

        template["id"] = f"{serial:03d}"
        template["name"] = name
        template["course"] = course_id
        template["riskLevel"] = risk_level
        template["pulseScore"] = pulse
        template["pulseTrend"] = trend
        template["year"] = years[idx % len(years)]
        template["major"] = major
        template["creditHours"] = credit_hours
        template["decliningWeeks"] = declining_weeks
        template["baselinePulse"] = baseline
        template["courses"] = [COURSE_DATA[course_id]["name"].split(" — ")[0], "ECON 450", "STATS 301"]
        template["dashboardTags"] = [
            template["topSignals"][0],
            f"{credit_hours} credit load",
            f"Week {template['weeklyData'][-1]['week']} trend",
        ]
        template["strongestMoment"] = f"delivered standout work in {template['courses'][0]}"

        generated.append(template)
        idx += 1

    return generated


STUDENTS = _expand_students(STUDENTS, target_count=120)
