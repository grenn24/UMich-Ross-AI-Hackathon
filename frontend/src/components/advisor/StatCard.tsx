interface Props {
    number: number;
    label: string;
    type?: "critical" | "warning" | "watch" | "stable";
}

export default function StatCard({ number, label, type }: Props) {
    return (
        <div className={`sstat ${type ?? ""}`}>
            <div className="sstat-label">{label}</div>
            <div className={`sstat-count ${type ?? ""}`}>{number}</div>
        </div>
    );
}
