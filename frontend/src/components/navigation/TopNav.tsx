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
                    PulseAI Engine
                </NavLink>
            </div>

            <div className="topbar-right">
                <div className="live-pill">
                    <span className="live-dot" />
                    Live
                </div>
                <span>Week 8</span>
            </div>
        </nav>
    );
};

export default TopNav;
