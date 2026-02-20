import ProfileHeader from "components/profile/ProfileHeader";
import MetricsGrid from "components/profile/MetricsGrid";
import TrajectoryChart from "../components/profile/TrajectoryChart";
import OraclePanel from "../components/profile/OraclePanel";

export default function StudentProfile() {
    return (
        <section className="page-shell profile-wrap">
            <div className="page-hdr">
                <div>
                    <h1 className="page-title">Student Profile</h1>
                    <p className="page-sub">Deep signals and recommended intervention content</p>
                </div>
                <div className="week-chip">Maya Chen · Week 8</div>
            </div>

            <ProfileHeader />
            <MetricsGrid />
            <TrajectoryChart />
            <OraclePanel />
        </section>
    );
}
