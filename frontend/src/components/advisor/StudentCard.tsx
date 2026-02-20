interface Props {
    name: string;
    score: number;
    status: "critical" | "warning" | "stable";
}

export default function StudentCard({ name, score, status }: Props) {
    const initials = name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <div className={`student-card ${status}`}>
            <div className="card-left">
                <div className={`avatar av-${status}`}>{initials}</div>
                <div>
                    <h4 className="card-name">{name}</h4>
                    <p className="card-meta">Ross BBA · ECON 401 · Week 8</p>
                    <div className="tag-row">
                        <span className={`tag ${status === "critical" ? "tag-critical" : "tag-warning"}`}>
                            {status === "critical" ? "Immediate outreach" : "Needs check-in"}
                        </span>
                        <span className="tag tag-neutral">Deadline cluster</span>
                    </div>
                </div>
            </div>

            <div className="card-right">
                <div className="pulse-lbl">Pulse Score</div>
                <h2 className={`pulse-num ${status}`}>{score}</h2>
                <p className={`trend-txt ${status}`}>Down 21% this week</p>
                <button className={`btn-sm ${status === "critical" ? "btn-primary" : ""}`}>View Profile</button>
            </div>
        </div>
    );
}
