interface Props {
    title: string;
    score: number;
}

export default function MetricPanel({ title, score }: Props) {
    const isPressure = title.toLowerCase().includes("pressure");

    return (
        <div className="panel">
            <h3 className="panel-title">{title}</h3>
            <div className={`score-headline ${isPressure ? "critical-txt" : "stable-txt"}`}>{score}</div>
            <div className="signal-row">
                <span className="signal-name">Deadlines</span>
                <div className="signal-bar">
                    <div className={`signal-fill ${isPressure ? "fill-red" : "fill-green"}`} style={{ width: "78%" }} />
                </div>
                <span className="signal-val">78</span>
            </div>
            <div className="signal-row">
                <span className="signal-name">Engagement</span>
                <div className="signal-bar">
                    <div className={`signal-fill ${isPressure ? "fill-orange" : "fill-green"}`} style={{ width: "42%" }} />
                </div>
                <span className="signal-val">42</span>
            </div>
        </div>
    );
}
