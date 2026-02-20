interface Props {
    badge: string;
    title: string;
    description: string;
    input: string;
    outputs: Array<{ key: string; value: string; tone?: "critical" | "warning" | "stable" | "accent" }>;
}

export default function OracleServiceCard({ badge, title, description, input, outputs }: Props) {
    return (
        <div className="oracle-svc">
            <div className="svc-hdr">
                <div className="svc-badge">{badge}</div>
                <h3 className="svc-name">{title}</h3>
                <p className="svc-desc">{description}</p>
            </div>

            <div className="io-label">Input</div>
            <div className="io-box">{input}</div>

            <div className="io-label">Output</div>
            <div className="io-output">
                {outputs.map((row) => (
                    <div key={row.key} className="out-row">
                        <span className="out-key">{row.key}</span>
                        <span className={`out-val ${row.tone ? `tone-${row.tone}` : ""}`}>{row.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
