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
    year?: string;
    major?: string;
    creditHours?: number;
    decliningWeeks?: number;
    dashboardTags?: string[];
}

const toStatus = (riskLevel: RiskLevel): "critical" | "warning" | "stable" => {
    if (riskLevel === "CRITICAL") return "critical";
    if (riskLevel === "HIGH" || riskLevel === "WATCH") return "warning";
    return "stable";
};

export default function StudentCard({
    id,
    name,
    course,
    score,
    trend,
    riskLevel,
    week,
    year,
    major,
    creditHours,
    decliningWeeks,
    dashboardTags,
}: Props) {
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
                    <p className="card-meta">
                        {year ?? "Student"} · {major ?? course} · {creditHours ?? 0} credits · {decliningWeeks ?? 0} weeks declining
                    </p>
                    <div className="tag-row">
                        {(dashboardTags && dashboardTags.length > 0
                            ? dashboardTags
                            : [status === "critical" ? "Immediate outreach" : "Needs check-in", `${course} · Week ${week}`]
                        ).map((tag) => (
                            <span
                                key={`${id}-${tag}`}
                                className={`tag ${tagClass}`}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="card-right">
                <div className="pulse-lbl">Pulse Score</div>
                <h2 className={`pulse-num ${status}`}>{score}</h2>
                <p className={`trend-txt ${status}`}>{trendDirection} {trendAmount}% this week</p>
                <Link to={`/profile/${id}`} className={`btn-sm ${status === "critical" ? "btn-primary" : ""}`}>
                    {status === "critical" ? "Draft Outreach" : "View Profile"}
                </Link>
            </div>
        </div>
    );
}
    const tagClass = status === "critical" ? "tag-critical" : status === "warning" ? "tag-warning" : "tag-neutral";
