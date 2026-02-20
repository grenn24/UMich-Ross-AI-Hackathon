import { NavLink } from "react-router-dom";

const TopNav = () => {
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
                    PulseAI Intelligence Studio
                </NavLink>
            </div>

            <div className="topbar-right">
                <span>University of Michigan</span>
                <span style={{ color: "var(--border-dark)" }}>|</span>
                <span>Dr. Sarah Chen</span>
                <div className="live-pill">
                    <span className="live-dot" />
                    Live
                </div>
            </div>
        </nav>
    );
};

export default TopNav;
