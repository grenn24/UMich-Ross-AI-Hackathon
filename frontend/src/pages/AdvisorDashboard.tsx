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

    const grouped = useMemo(() => ({
        critical: visible.filter((s) => s.riskLevel === "CRITICAL"),
        high: visible.filter((s) => s.riskLevel === "HIGH"),
        watch: visible.filter((s) => s.riskLevel === "WATCH"),
        stable: visible.filter((s) => s.riskLevel === "STABLE"),
    }), [visible]);

    return (
        <section className="page-shell advisor-layout">
            <Sidebar filter={filter} onFilterChange={setFilter} counts={counts} />
            <div className="content">
                <div className="page-hdr">
                    <div>
                        <h1 className="page-title">Student Wellness Dashboard</h1>
                        <p className="page-sub">400 students · ECON Department · Advisor: Dr. Sarah Chen</p>
                    </div>
                    <div className="week-chip">Week 8 of 14 · Nov 14, 2024</div>
                </div>

                {loading && <p>Loading students...</p>}
                {error && <p>{error}</p>}
                {!loading && !error && visible.length === 0 && <p>No students match the selected filter.</p>}
                {!loading && !error && (
                    <>
                        <div className="section-row">
                            <span className="section-label critical-txt">Critical — Act Today</span>
                            <span className="section-line" />
                        </div>
                        {grouped.critical.map((student) => (
                            <StudentCard
                                key={student.id}
                                id={student.id}
                                name={student.name}
                                course={student.course}
                                score={student.pulseScore}
                                trend={student.pulseTrend}
                                riskLevel={student.riskLevel}
                                week={student.currentWeek}
                                year={student.year}
                                major={student.major}
                                creditHours={student.creditHours}
                                decliningWeeks={student.decliningWeeks}
                                dashboardTags={student.dashboardTags}
                            />
                        ))}

                        <div className="section-row">
                            <span className="section-label warning-txt">High Risk — Reach Out This Week</span>
                            <span className="section-line" />
                        </div>
                        {grouped.high.map((student) => (
                            <StudentCard
                                key={student.id}
                                id={student.id}
                                name={student.name}
                                course={student.course}
                                score={student.pulseScore}
                                trend={student.pulseTrend}
                                riskLevel={student.riskLevel}
                                week={student.currentWeek}
                                year={student.year}
                                major={student.major}
                                creditHours={student.creditHours}
                                decliningWeeks={student.decliningWeeks}
                                dashboardTags={student.dashboardTags}
                            />
                        ))}

                        <div className="section-row">
                            <span className="section-label watch-txt">Watch — Monitor</span>
                            <span className="section-line" />
                        </div>
                        {grouped.watch.map((student) => (
                            <StudentCard
                                key={student.id}
                                id={student.id}
                                name={student.name}
                                course={student.course}
                                score={student.pulseScore}
                                trend={student.pulseTrend}
                                riskLevel={student.riskLevel}
                                week={student.currentWeek}
                                year={student.year}
                                major={student.major}
                                creditHours={student.creditHours}
                                decliningWeeks={student.decliningWeeks}
                                dashboardTags={student.dashboardTags}
                            />
                        ))}

                        <div className="section-row">
                            <span className="section-label stable-txt">Stable — Keep Momentum</span>
                            <span className="section-line" />
                        </div>
                        {grouped.stable.map((student) => (
                            <StudentCard
                                key={student.id}
                                id={student.id}
                                name={student.name}
                                course={student.course}
                                score={student.pulseScore}
                                trend={student.pulseTrend}
                                riskLevel={student.riskLevel}
                                week={student.currentWeek}
                                year={student.year}
                                major={student.major}
                                creditHours={student.creditHours}
                                decliningWeeks={student.decliningWeeks}
                                dashboardTags={student.dashboardTags}
                            />
                        ))}
                    </>
                )}
            </div>
        </section>
    );
}
