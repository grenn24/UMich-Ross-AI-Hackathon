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
                <div className="sidebar-label">This Week</div>
                <StatCard number={counts.critical} label="Critical" type="critical" />
                <StatCard number={counts.high} label="High Risk" type="warning" />
                <StatCard number={counts.watch} label="Watch" type="watch" />
                <StatCard number={counts.stable} label="Stable" type="stable" />
            </div>

            <div className="sidebar-section">
                <div className="sidebar-label">Filter</div>
                <FilterButtons active={filter} onChange={onFilterChange} counts={counts} />
            </div>

            <div className="sidebar-section">
                <div className="sidebar-label">Oracle AI</div>
                <div className="oracle-side-box">
                    <div className="oracle-side-lbl">Last processed</div>
                    <div className="oracle-side-time">Today 6:00 AM</div>
                    <div className="oracle-side-sub">14.2M signals</div>
                </div>
            </div>
        </aside>
    );
}
