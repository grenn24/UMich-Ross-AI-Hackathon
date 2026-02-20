import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProfileHeader from "components/profile/ProfileHeader";
import MetricsGrid from "components/profile/MetricsGrid";
import TrajectoryChart from "../components/profile/TrajectoryChart";
import OraclePanel from "../components/profile/OraclePanel";
import { getStudentById, getStudents, getTrajectory } from "utilities/pulseApi";
import type { StudentDetail, WeeklyDataPoint } from "types/api";

export default function StudentProfile() {
    const { studentId } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState<StudentDetail | null>(null);
    const [weeklyData, setWeeklyData] = useState<WeeklyDataPoint[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;
        const load = async () => {
            try {
                setLoading(true);
                let targetId = studentId;
                if (!targetId) {
                    const allStudents = await getStudents();
                    targetId = allStudents[0]?.id;
                    if (targetId) {
                        navigate(`/profile/${targetId}`, { replace: true });
                    }
                }
                if (!targetId) throw new Error("No students available.");

                const [studentResponse, trajectoryResponse] = await Promise.all([
                    getStudentById(targetId),
                    getTrajectory(targetId),
                ]);
                if (mounted) {
                    setStudent(studentResponse);
                    setWeeklyData(trajectoryResponse.weeklyData);
                    setError(null);
                }
            } catch {
                if (mounted) setError("Failed to load student profile.");
            } finally {
                if (mounted) setLoading(false);
            }
        };

        load();
        return () => {
            mounted = false;
        };
    }, [studentId, navigate]);

    if (loading) return <section className="page-shell profile-wrap"><p>Loading student profile...</p></section>;
    if (error || !student) return <section className="page-shell profile-wrap"><p>{error ?? "Student not found."}</p></section>;

    return (
        <section className="page-shell profile-wrap">
            <div className="page-hdr">
                <div>
                    <h1 className="page-title">Student Profile</h1>
                    <p className="page-sub">Deep signals and recommended intervention content</p>
                </div>
                <div className="week-chip">{student.name} · Week {student.currentWeek}</div>
            </div>

            <ProfileHeader student={student} />
            <MetricsGrid student={student} />
            <TrajectoryChart weeklyData={weeklyData} />
            <OraclePanel student={student} />
        </section>
    );
}
