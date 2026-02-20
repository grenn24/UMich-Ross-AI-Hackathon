import Sidebar from "components/advisor/Sidebar";
import StudentCard from "components/advisor/StudentCard";

export default function AdvisorDashboard() {
    return (
        <section className="page-shell advisor-layout">
            <Sidebar />
            <div className="content">
                <div className="page-hdr">
                    <div>
                        <h1 className="page-title">Advisor Dashboard</h1>
                        <p className="page-sub">Behavioral early-warning list and intervention queue</p>
                    </div>
                    <div className="week-chip">2,004 students · Week 8</div>
                </div>

                <div className="section-row">
                    <span className="section-label">Priority Students</span>
                    <span className="section-line" />
                </div>

                <StudentCard name="Maya Chen" score={19} status="critical" />
                <StudentCard name="James Liu" score={38} status="warning" />
                <StudentCard name="Ava Martinez" score={64} status="stable" />
            </div>
        </section>
    );
}
