import { useEffect, useMemo, useState } from "react";
import Sidebar from "components/advisor/Sidebar";
import StudentCard from "components/advisor/StudentCard";
import { getStudents } from "utilities/pulseApi";
import type { StudentCardData } from "types/api";

export default function AdvisorDashboard() {
    const [students, setStudents] = useState<StudentCardData[]>([]);
    const [filter, setFilter] = useState("all");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;
        const load = async () => {
            try {
                setLoading(true);
                const data = await getStudents();
                if (mounted) {
                    setStudents(data);
                    setError(null);
                }
            } catch {
                if (mounted) setError("Failed to load students.");
            } finally {
                if (mounted) setLoading(false);
            }
        };
        load();
        return () => {
            mounted = false;
        };
    }, []);

    const counts = useMemo(
        () => ({
            all: students.length,
            critical: students.filter((s) => s.riskLevel === "CRITICAL").length,
            high: students.filter((s) => s.riskLevel === "HIGH").length,
            watch: students.filter((s) => s.riskLevel === "WATCH").length,
            stable: students.filter((s) => s.riskLevel === "STABLE").length,
        }),
        [students]
    );

    const visible = useMemo(() => {
        if (filter === "all") return students;
        return students.filter((s) => s.riskLevel.toLowerCase() === filter);
    }, [students, filter]);

    return (
        <section className="page-shell advisor-layout">
            <Sidebar filter={filter} onFilterChange={setFilter} counts={counts} />
            <div className="content">
                <div className="page-hdr">
                    <div>
                        <h1 className="page-title">Advisor Dashboard</h1>
                        <p className="page-sub">Behavioral early-warning list and intervention queue</p>
                    </div>
                    <div className="week-chip">{counts.all} students</div>
                </div>

                <div className="section-row">
                    <span className="section-label">Priority Students</span>
                    <span className="section-line" />
                </div>

                {loading && <p>Loading students...</p>}
                {error && <p>{error}</p>}
                {!loading && !error && visible.length === 0 && <p>No students match the selected filter.</p>}
                {!loading &&
                    !error &&
                    visible.map((student) => (
                        <StudentCard
                            key={student.id}
                            id={student.id}
                            name={student.name}
                            course={student.course}
                            score={student.pulseScore}
                            trend={student.pulseTrend}
                            riskLevel={student.riskLevel}
                            week={student.currentWeek}
                        />
                    ))}
            </div>
        </section>
    );
}
