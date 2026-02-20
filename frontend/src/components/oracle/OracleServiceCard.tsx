interface Row {
    key: string;
    value: string;
    tone?: "critical" | "warning" | "stable" | "accent" | "neutral";
}

interface Props {
    badge: string;
    title: string;
    description: string;
    inputLabel?: string;
    input?: string;
    outputsLabel?: string;
    outputs?: Row[];
    showProcessing?: boolean;
    processingLabel?: string;
    formulaText?: string;
    splitTopLabel?: string;
    splitTopRows?: Row[];
    splitBottomLabel?: string;
    splitBottomRows?: Row[];
    actions?: string[];
}

const toneClass = (tone?: Row["tone"]) => {
    if (tone === "critical") return "tone-critical";
    if (tone === "warning") return "tone-warning";
    if (tone === "stable") return "tone-stable";
    if (tone === "accent") return "tone-accent";
    return "";
};

export default function OracleServiceCard({
    badge,
    title,
    description,
    inputLabel = "Input",
    input,
    outputsLabel = "Output",
    outputs,
    showProcessing,
    processingLabel,
    formulaText,
    splitTopLabel,
    splitTopRows,
    splitBottomLabel,
    splitBottomRows,
    actions,
}: Props) {
    return (
        <div className="oracle-svc">
            <div className="svc-hdr">
                <div className="svc-badge">{badge}</div>
                <h3 className="svc-name">{title}</h3>
                <p className="svc-desc">{description}</p>
            </div>

            {input && (
                <>
                    <div className="io-label">{inputLabel}</div>
                    <div className="io-box">{input}</div>
                </>
            )}

            {showProcessing && (
                <div className="proc-dots">
                    <span className="proc-dot" />
                    <span className="proc-dot" />
                    <span className="proc-dot" />
                    <span className="proc-label">{processingLabel ?? "Processing..."}</span>
                </div>
            )}

            {formulaText && <div className="formula-row">{formulaText}</div>}

            {splitTopRows && splitTopRows.length > 0 && (
                <>
                    <div className="io-label">{splitTopLabel}</div>
                    <div className="io-output split-top">
                        {splitTopRows.map((row) => (
                            <div key={row.key} className="out-row">
                                <span className="out-key">{row.key}</span>
                                <span className={`out-val ${toneClass(row.tone)}`}>{row.value}</span>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {splitBottomRows && splitBottomRows.length > 0 && (
                <>
                    <div className="io-label">{splitBottomLabel}</div>
                    <div className="io-output split-bottom">
                        {splitBottomRows.map((row) => (
                            <div key={row.key} className="out-row">
                                <span className="out-key">{row.key}</span>
                                <span className={`out-val ${toneClass(row.tone)}`}>{row.value}</span>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {outputs && outputs.length > 0 && (
                <>
                    <div className="io-label">{outputsLabel}</div>
                    <div className="io-output">
                        {outputs.map((row) => (
                            <div key={row.key} className="out-row">
                                <span className="out-key">{row.key}</span>
                                <span className={`out-val ${toneClass(row.tone)}`}>{row.value}</span>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {actions && actions.length > 0 && (
                <div className="btn-row">
                    {actions.map((action, index) => (
                        <button key={action} className={`btn-sm ${index === 0 ? "btn-primary" : ""}`}>{action}</button>
                    ))}
                </div>
            )}
        </div>
    );
}
