import type { StudentDetail } from "types/api";

interface Props {
    student: StudentDetail;
}

export default function ProfileHeader({ student }: Props) {
    const initials = student.name
        .split(" ")
        .map((name) => name[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
    const trendDirection = student.pulseTrend < 0 ? "Down" : "Up";
    const trendAmount = Math.abs(student.pulseTrend);

    return (
        <div className="profile-top">
            <div className="profile-id">
                <div className="profile-av">{initials}</div>
                <div>
                    <h2 className="profile-name">{student.name}</h2>
                    <p className="profile-meta">Course: {student.course} · Risk: {student.riskLevel}</p>
                </div>
            </div>

            <div className="big-score-box">
                <div className="big-score-lbl">Pulse Score</div>
                <div className="big-score-num">{student.pulseScore}</div>
                <div className="big-score-trend">{trendDirection} {trendAmount} this week</div>
            </div>
        </div>
    );
}
