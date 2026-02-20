import { useState } from "react";
import StatCard from "./StatCard";
import FilterButtons from "./FilterButtons";

export default function Sidebar() {
    const [filter, setFilter] = useState("all");

    return (
        <aside className="sidebar">
            <div className="sidebar-section">
                <div className="sidebar-label">Risk Summary</div>
                <StatCard number={2} label="Critical" type="critical" />
                <StatCard number={11} label="High Risk" type="warning" />
                <StatCard number={387} label="Stable" type="stable" />
            </div>

            <div className="sidebar-section">
                <div className="sidebar-label">Filter Queue</div>
                <FilterButtons active={filter} onChange={setFilter} />
            </div>
        </aside>
    );
}
