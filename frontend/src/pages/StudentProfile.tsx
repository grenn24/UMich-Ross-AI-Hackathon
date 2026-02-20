import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProfileHeader from "components/profile/ProfileHeader";
import MetricsGrid from "components/profile/MetricsGrid";
import TrajectoryChart from "../components/profile/TrajectoryChart";
import OraclePanel from "../components/profile/OraclePanel";
import ChatbotInsightHero from "components/profile/ChatbotInsightHero";
import LanguageDriftPanel from "components/profile/LanguageDriftPanel";
import { getStudentById, getStudents } from "utilities/pulseApi";
import type { StudentDetail } from "types/api";

export default function StudentProfile() {
    const { studentId } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState<StudentDetail | null>(null);
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

                const studentResponse = await getStudentById(targetId);
                if (mounted) {
                    setStudent(studentResponse);
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
            <button className="back-link" onClick={() => navigate("/")}>← Back to Dashboard</button>

            <ProfileHeader student={student} />
            <ChatbotInsightHero studentId={student.id} />
            <MetricsGrid student={student} />
            <TrajectoryChart studentId={student.id} />
            <LanguageDriftPanel student={student} />
            <OraclePanel student={student} />
        </section>
    );
}
