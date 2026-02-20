interface Props {
    title: string;
    score: number;
    deadlines: number;
    engagement: number;
}

export default function MetricPanel({ title, score, deadlines, engagement }: Props) {
    const isPressure = title.toLowerCase().includes("pressure");
    const deadlinesPct = Math.min(100, Math.max(0, deadlines * 20));
    const engagementPct = Math.min(100, Math.max(0, engagement));

    return (
        <div className="panel">
            <h3 className="panel-title">{title}</h3>
            <div className={`score-headline ${isPressure ? "critical-txt" : "stable-txt"}`}>{score}</div>
            <div className="signal-row">
                <span className="signal-name">Deadlines</span>
                <div className="signal-bar">
                    <div className={`signal-fill ${isPressure ? "fill-red" : "fill-green"}`} style={{ width: `${deadlinesPct}%` }} />
                </div>
                <span className="signal-val">{deadlines}</span>
            </div>
            <div className="signal-row">
                <span className="signal-name">Engagement</span>
                <div className="signal-bar">
                    <div className={`signal-fill ${isPressure ? "fill-orange" : "fill-green"}`} style={{ width: `${engagementPct}%` }} />
                </div>
                <span className="signal-val">{engagement}</span>
            </div>
        </div>
    );
}
