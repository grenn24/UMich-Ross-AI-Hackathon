STUDENTS = [
    {
        "id": "001",
        "name": "Maya Chen",
        "course": "CS301",
        "riskLevel": "CRITICAL",
        "pulseScore": 18,
        "pulseTrend": -22,
        "topSignals": [
            "Late submissions 3 weeks running",
            "Discussion posts dropped 80%",
            "Sentiment score declined 41%"
        ],
        "strongestMoment": "scored 94% on the Week 3 data structures assignment",
        "week1Post": "I find this topic really fascinating. The way algorithms build on each other reminds me of how I used to solve puzzles as a kid. Excited to dig deeper into recursion next week!",
        "currentPost": "submitted. not sure if right.",
        "weeklyData": [
            {"week": 1,  "pressure": 20, "resilience": 78, "pulseScore": 81},
            {"week": 2,  "pressure": 25, "resilience": 75, "pulseScore": 77},
            {"week": 3,  "pressure": 30, "resilience": 80, "pulseScore": 73},
            {"week": 4,  "pressure": 38, "resilience": 72, "pulseScore": 63},
            {"week": 5,  "pressure": 45, "resilience": 68, "pulseScore": 57},
            {"week": 6,  "pressure": 60, "resilience": 55, "pulseScore": 42},
            {"week": 7,  "pressure": 72, "resilience": 40, "pulseScore": 30},
            {"week": 8,  "pressure": 80, "resilience": 28, "pulseScore": 21},
            {"week": 9,  "pressure": 85, "resilience": 22, "pulseScore": 18},
        ]
    },
    {
        "id": "002",
        "name": "James Okafor",
        "course": "BUS210",
        "riskLevel": "HIGH",
        "pulseScore": 34,
        "pulseTrend": -11,
        "topSignals": [
            "Assignment quality declining",
            "Login frequency dropped",
            "Peer collaboration stopped"
        ],
        "strongestMoment": "led the Week 2 group case study with a perfect peer review score",
        "week1Post": "Really enjoying the group dynamics in this course. The case study format is going to push us to think critically about real business problems. Looking forward to collaborating.",
        "currentPost": "I completed the assignment.",
        "weeklyData": [
            {"week": 1, "pressure": 18, "resilience": 82, "pulseScore": 85},
            {"week": 2, "pressure": 22, "resilience": 79, "pulseScore": 80},
            {"week": 3, "pressure": 35, "resilience": 70, "pulseScore": 68},
            {"week": 4, "pressure": 48, "resilience": 60, "pulseScore": 53},
            {"week": 5, "pressure": 55, "resilience": 50, "pulseScore": 44},
            {"week": 6, "pressure": 62, "resilience": 42, "pulseScore": 37},
            {"week": 7, "pressure": 65, "resilience": 38, "pulseScore": 34},
        ]
    },
    {
        "id": "003",
        "name": "Priya Sharma",
        "course": "CS301",
        "riskLevel": "WATCH",
        "pulseScore": 55,
        "pulseTrend": -8,
        "topSignals": [
            "Submission timing shifting later",
            "Post length decreasing",
            "One missed deadline"
        ],
        "strongestMoment": "asked the most insightful question in the Week 4 live session",
        "week1Post": "This is challenging but I am determined to keep up. I have so many questions already but I think that just means I am genuinely engaging with the material. Can't wait to see where we are by Week 14.",
        "currentPost": "Done. Will review later if time.",
        "weeklyData": [
            {"week": 1, "pressure": 25, "resilience": 75, "pulseScore": 78},
            {"week": 2, "pressure": 28, "resilience": 73, "pulseScore": 75},
            {"week": 3, "pressure": 32, "resilience": 70, "pulseScore": 70},
            {"week": 4, "pressure": 38, "resilience": 65, "pulseScore": 64},
            {"week": 5, "pressure": 44, "resilience": 60, "pulseScore": 58},
            {"week": 6, "pressure": 48, "resilience": 58, "pulseScore": 55},
        ]
    },
    {
        "id": "004",
        "name": "Daniel Torres",
        "course": "BUS210",
        "riskLevel": "STABLE",
        "pulseScore": 82,
        "pulseTrend": 5,
        "topSignals": [
            "Consistent submission timing",
            "High peer engagement",
            "Linguistic vitality maintained"
        ],
        "strongestMoment": "received the highest peer review score in the class on Week 5",
        "week1Post": "Looking forward to learning with everyone here. Finance has always been my passion and I am hoping this course bridges theory with real market dynamics.",
        "currentPost": "Finished the analysis. I think the market trend data actually connects to what we covered in Week 3 — curious if others see that link too. Happy to discuss in the forum.",
        "weeklyData": [
            {"week": 1, "pressure": 22, "resilience": 78, "pulseScore": 80},
            {"week": 2, "pressure": 20, "resilience": 80, "pulseScore": 82},
            {"week": 3, "pressure": 25, "resilience": 79, "pulseScore": 81},
            {"week": 4, "pressure": 28, "resilience": 80, "pulseScore": 80},
            {"week": 5, "pressure": 26, "resilience": 82, "pulseScore": 83},
            {"week": 6, "pressure": 30, "resilience": 81, "pulseScore": 82},
        ]
    }
]

COURSE_DATA = {
    "CS301": {
        "name": "CS301 — Data Structures",
        "professor": "Dr. Alan Webb",
        "weeklyPressure": [
            {"week": 1,  "pressure": 20, "deadlines": 1, "assignments": ["Quiz 1"]},
            {"week": 2,  "pressure": 28, "deadlines": 1, "assignments": ["Lab 1"]},
            {"week": 3,  "pressure": 35, "deadlines": 2, "assignments": ["Assignment 1", "Reading Response"]},
            {"week": 4,  "pressure": 55, "deadlines": 3, "assignments": ["Lab 2", "Quiz 2", "Project Proposal"]},
            {"week": 5,  "pressure": 48, "deadlines": 2, "assignments": ["Assignment 2", "Peer Review"]},
            {"week": 6,  "pressure": 70, "deadlines": 4, "assignments": ["Midterm Exam", "Lab 3", "Quiz 3", "Project Check-in"]},
            {"week": 7,  "pressure": 40, "deadlines": 1, "assignments": ["Assignment 3"]},
        ],
        "oracleRecommendation": {
            "issue": "Deadline cluster detected in Week 4 (3 items) and Week 6 (4 items including Midterm).",
            "action": "Move the Week 4 Project Proposal to Week 3 and the Week 6 Quiz 3 to Week 7.",
            "projectedPressureReduction": 18,
            "projectedOutcomeImprovement": 23
        }
    },
    "BUS210": {
        "name": "BUS210 — Business Finance",
        "professor": "Dr. Sandra Mwangi",
        "weeklyPressure": [
            {"week": 1,  "pressure": 18, "deadlines": 1, "assignments": ["Intro Post"]},
            {"week": 2,  "pressure": 25, "deadlines": 1, "assignments": ["Case Study 1"]},
            {"week": 3,  "pressure": 38, "deadlines": 2, "assignments": ["Quiz 1", "Reading Response"]},
            {"week": 4,  "pressure": 45, "deadlines": 2, "assignments": ["Case Study 2", "Peer Review"]},
            {"week": 5,  "pressure": 60, "deadlines": 3, "assignments": ["Midterm", "Group Report", "Quiz 2"]},
            {"week": 6,  "pressure": 42, "deadlines": 2, "assignments": ["Reflection", "Lab Exercise"]},
            {"week": 7,  "pressure": 38, "deadlines": 1, "assignments": ["Case Study 3"]},
        ],
        "oracleRecommendation": {
            "issue": "Deadline cluster detected in Week 5 (3 items including Midterm and Group Report).",
            "action": "Move the Week 5 Group Report deadline to Week 6 to reduce peak pressure.",
            "projectedPressureReduction": 15,
            "projectedOutcomeImprovement": 19
        }
    }
}
