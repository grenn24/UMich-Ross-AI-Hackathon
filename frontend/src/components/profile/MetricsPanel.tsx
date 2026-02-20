import type { SignalBreakdownItem } from "types/api";

interface Props {
    title: string;
    score: number;
    rows: SignalBreakdownItem[];
}

export default function MetricPanel({ title, score, rows }: Props) {
    const isPressure = title.toLowerCase().includes("pressure");
    const titleWithScore = `${title} — ${score}/100`;
    const toToneClass = (tone: SignalBreakdownItem["tone"]) => {
        if (tone === "critical") return "fill-red";
        if (tone === "warning") return "fill-orange";
        return "fill-green";
    };

    return (
        <div className="panel">
            <h3 className="panel-title">{titleWithScore}</h3>
            <div className={`score-headline ${isPressure ? "critical-txt" : "warning-txt"}`}>{score}</div>
            {rows.map((row) => (
                <div className="signal-row" key={`${title}-${row.label}`}>
                    <span className="signal-name">{row.label}</span>
                    <div className="signal-bar">
                        <div className={`signal-fill ${toToneClass(row.tone)}`} style={{ width: `${row.value}%` }} />
                    </div>
                    <span className={`signal-val ${row.tone === "critical" ? "critical-txt" : row.tone === "warning" ? "warning-txt" : "stable-txt"}`}>
                        {row.value}
                    </span>
                </div>
            ))}
        </div>
    );
}
