import StatCard from "./StatCard";
import FilterButtons from "./FilterButtons";

interface Props {
    filter: string;
    onFilterChange: (value: string) => void;
    counts: {
        all: number;
        critical: number;
        high: number;
        watch: number;
        stable: number;
    };
}

export default function Sidebar({ filter, onFilterChange, counts }: Props) {

    return (
        <aside className="sidebar">
            <div className="sidebar-section">
                <div className="sidebar-label">Risk Summary</div>
                <StatCard number={counts.critical} label="Critical" type="critical" />
                <StatCard number={counts.high} label="High Risk" type="warning" />
                <StatCard number={counts.stable} label="Stable" type="stable" />
            </div>

            <div className="sidebar-section">
                <div className="sidebar-label">Filter Queue</div>
                <FilterButtons active={filter} onChange={onFilterChange} counts={counts} />
            </div>
        </aside>
    );
}
