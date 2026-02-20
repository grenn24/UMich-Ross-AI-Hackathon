interface Props {
    active: string;
    onChange: (v: string) => void;
    counts: {
        all: number;
        critical: number;
        high: number;
        watch: number;
        stable: number;
    };
}

const filters = [
    { key: "all", label: "All students", badge: "badge-stable" },
    { key: "critical", label: "Critical", badge: "badge-critical" },
    { key: "high", label: "High risk", badge: "badge-warning" },
    { key: "watch", label: "Watch list", badge: "badge-watch" },
    { key: "stable", label: "Stable", badge: "badge-stable" },
] as const;

export default function FilterButtons({ active, onChange, counts }: Props) {
    return (
        <>
            {filters.map((f) => (
                <button
                    key={f.key}
                    className={`filter-item ${active === f.key ? "active" : ""}`}
                    onClick={() => onChange(f.key)}
                >
                    <span>{f.label}</span>
                    <span className={`filter-badge ${f.badge}`}>{counts[f.key]}</span>
                </button>
            ))}
        </>
    );
}
