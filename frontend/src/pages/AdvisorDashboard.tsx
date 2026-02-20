import { useEffect, useMemo, useState } from "react";
import Sidebar from "components/advisor/Sidebar";
import StudentCard from "components/advisor/StudentCard";
import Loading from "./Loading";
import { getStudents } from "utilities/pulseApi";
import type { StudentCardData } from "types/api";

export default function AdvisorDashboard() {
    const [students, setStudents] = useState<StudentCardData[]>([]);
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");
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
        const filteredByRisk = filter === "all" ? students : students.filter((s) => s.riskLevel.toLowerCase() === filter);
        const term = search.trim().toLowerCase();
        if (!term) return filteredByRisk;
        return filteredByRisk.filter(
            (student) =>
                student.name.toLowerCase().includes(term) ||
                student.id.toLowerCase().includes(term) ||
                student.course.toLowerCase().includes(term) ||
                (student.major ?? "").toLowerCase().includes(term)
        );
    }, [students, filter, search]);

    const grouped = useMemo(
        () => ({
            critical: visible.filter((s) => s.riskLevel === "CRITICAL"),
            high: visible.filter((s) => s.riskLevel === "HIGH"),
            watch: visible.filter((s) => s.riskLevel === "WATCH"),
            stable: visible.filter((s) => s.riskLevel === "STABLE"),
        }),
        [visible]
    );

    const sections = useMemo(
        () => [
            { key: "critical", label: "Critical - Act Today", labelClass: "critical-txt", students: grouped.critical },
            { key: "high", label: "High Risk - Reach Out This Week", labelClass: "warning-txt", students: grouped.high },
            { key: "watch", label: "Watch - Monitor", labelClass: "watch-txt", students: grouped.watch },
            { key: "stable", label: "Stable - Keep Momentum", labelClass: "stable-txt", students: grouped.stable },
        ],
        [grouped]
    );

    const visibleSections = useMemo(() => {
        if (filter === "all") return sections;
        return sections.filter((section) => section.key === filter);
    }, [sections, filter]);

    return (
        <section className="page-shell advisor-layout">
            <Sidebar filter={filter} onFilterChange={setFilter} counts={counts} />
            <div className="content">
                <div className="page-hdr">
                    <div>
                        <h1 className="page-title">Student Wellness Dashboard</h1>
                        <p className="page-sub">{counts.all} students · ECON Department · Advisor: Dr. Sarah Chen</p>
                    </div>
                    <div className="week-chip">Week 8 of 14 - Nov 14, 2024</div>
                </div>

                <div className="dashboard-search-row">
                    <input
                        className="dashboard-search"
                        type="text"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search by name, student ID, course, or major"
                    />
                    <span className="dashboard-search-count">{visible.length} shown</span>
                </div>

                {loading && <Loading />}
                {error && <p>{error}</p>}
                {!loading && !error && visible.length === 0 && <p>No students match your filter/search.</p>}
                {!loading && !error && (
                    <>
                        {visibleSections.map((section) => (
                            <div key={section.key}>
                                <div className="section-row">
                                    <span className={`section-label ${section.labelClass}`}>{section.label}</span>
                                    <span className="section-line" />
                                </div>
                                {section.students.map((student) => (
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
                            </div>
                        ))}
                    </>
                )}
            </div>
        </section>
    );
}
