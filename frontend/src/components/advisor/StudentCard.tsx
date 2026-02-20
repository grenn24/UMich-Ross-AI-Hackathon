import { Link } from "react-router-dom";
import type { RiskLevel } from "types/api";

interface Props {
    id: string;
    name: string;
    course: string;
    score: number;
    trend: number;
    riskLevel: RiskLevel;
    week: number;
}

const toStatus = (riskLevel: RiskLevel): "critical" | "warning" | "stable" => {
    if (riskLevel === "CRITICAL") return "critical";
    if (riskLevel === "HIGH" || riskLevel === "WATCH") return "warning";
    return "stable";
};

export default function StudentCard({ id, name, course, score, trend, riskLevel, week }: Props) {
    const status = toStatus(riskLevel);
    const initials = name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
    const trendDirection = trend < 0 ? "Down" : "Up";
    const trendAmount = Math.abs(trend);

    return (
        <div className={`student-card ${status}`}>
            <div className="card-left">
                <div className={`avatar av-${status}`}>{initials}</div>
                <div>
                    <h4 className="card-name">{name}</h4>
                    <p className="card-meta">Course: {course} · Week {week}</p>
                    <div className="tag-row">
                        <span className={`tag ${status === "critical" ? "tag-critical" : "tag-warning"}`}>
                            {status === "critical" ? "Immediate outreach" : "Needs check-in"}
                        </span>
                        <span className="tag tag-neutral">{riskLevel}</span>
                    </div>
                </div>
            </div>

            <div className="card-right">
                <div className="pulse-lbl">Pulse Score</div>
                <h2 className={`pulse-num ${status}`}>{score}</h2>
                <p className={`trend-txt ${status}`}>{trendDirection} {trendAmount}% this week</p>
                <Link to={`/profile/${id}`} className={`btn-sm ${status === "critical" ? "btn-primary" : ""}`}>
                    View Profile
                </Link>
            </div>
        </div>
    );
}
