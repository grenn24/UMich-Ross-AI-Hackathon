import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getStudents } from "utilities/pulseApi";

const TopNav = () => {
    const [currentWeek, setCurrentWeek] = useState<number | null>(null);

    useEffect(() => {
        let mounted = true;
        const load = async () => {
            try {
                const students = await getStudents();
                if (!mounted || students.length === 0) return;
                const week = students.reduce((max, s) => Math.max(max, s.currentWeek), 0);
                setCurrentWeek(week);
            } catch {
                setCurrentWeek(null);
            }
        };
        load();
        return () => {
            mounted = false;
        };
    }, []);

    return (
        <nav className="topbar">
            <div className="logo">
                <span className="logo-mark">P</span>
                PulseAI
            </div>

            <div className="topbar-nav">
                <NavLink to="/" end className={({ isActive }) => `tnav ${isActive ? "active" : ""}`}>
                    Advisor Dashboard
                </NavLink>
                <NavLink to="/profile" className={({ isActive }) => `tnav ${isActive ? "active" : ""}`}>
                    Student Profile
                </NavLink>
                <NavLink to="/visualization" className={({ isActive }) => `tnav ${isActive ? "active" : ""}`}>
                    Pulse Visualization
                </NavLink>
                <NavLink to="/oracle" className={({ isActive }) => `tnav ${isActive ? "active" : ""}`}>
                    PulseAI Engine
                </NavLink>
            </div>

            <div className="topbar-right">
                <div className="live-pill">
                    <span className="live-dot" />
                    Live
                </div>
                <span>{currentWeek ? `Week ${currentWeek}` : "Week --"}</span>
            </div>
        </nav>
    );
};

export default TopNav;
