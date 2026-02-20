interface Props {
    active: string;
    onChange: (v: string) => void;
}

const filters = [
    { key: "all", label: "All students", count: "2,004", badge: "badge-stable" },
    { key: "critical", label: "Critical", count: "2", badge: "badge-critical" },
    { key: "warning", label: "High risk", count: "11", badge: "badge-warning" },
    { key: "watch", label: "Watch list", count: "87", badge: "badge-watch" },
    { key: "stable", label: "Stable", count: "1,904", badge: "badge-stable" },
];

export default function FilterButtons({ active, onChange }: Props) {
    return (
        <>
            {filters.map((f) => (
                <button
                    key={f.key}
                    className={`filter-item ${active === f.key ? "active" : ""}`}
                    onClick={() => onChange(f.key)}
                >
                    <span>{f.label}</span>
                    <span className={`filter-badge ${f.badge}`}>{f.count}</span>
                </button>
            ))}
        </>
    );
}
