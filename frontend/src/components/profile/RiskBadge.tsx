import type { RiskLevel } from "types/api";

interface Props {
    riskLevel: RiskLevel;
}

const cls: Record<RiskLevel, string> = {
    CRITICAL: "rb-critical",
    HIGH: "rb-warning",
    WATCH: "rb-watch",
    STABLE: "rb-stable",
};

const label: Record<RiskLevel, string> = {
    CRITICAL: "Critical Risk",
    HIGH: "High Risk",
    WATCH: "Watch",
    STABLE: "Stable",
};

export default function RiskBadge({ riskLevel }: Props) {
    return <span className={`rbadge ${cls[riskLevel]}`}>{label[riskLevel]}</span>;
}
