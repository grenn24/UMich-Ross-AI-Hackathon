import { useEffect, useState } from "react";
import ScoreRings from "../components/visualisation/ScoreRings";
import Heatmap from "../components/visualisation/Heatmap";
import CoursePressure from "../components/visualisation/CoursePressure";
import { getStudents } from "utilities/pulseApi";

export default function PulseVisualization() {
    const [studentCount, setStudentCount] = useState(0);
    const [currentWeek, setCurrentWeek] = useState<number | null>(null);

    useEffect(() => {
        let mounted = true;
        const load = async () => {
            try {
                const students = await getStudents();
                if (!mounted) return;
                setStudentCount(students.length);
                const week = students.reduce((max, student) => Math.max(max, student.currentWeek), 0);
                setCurrentWeek(week);
            } catch {
                if (!mounted) return;
                setStudentCount(0);
                setCurrentWeek(null);
            }
        };
        load();
        return () => {
            mounted = false;
        };
    }, []);

    return (
        <section className="page-shell">
            <div className="page-hdr">
                <div>
                    <h1 className="page-title">Pulse Intelligence</h1>
                    <p className="page-sub">University-wide wellness pattern and pressure trends</p>
                </div>
                <div className="week-chip">{studentCount} students · Week {currentWeek ?? "--"}</div>
            </div>

            <div className="viz-grid">
                <ScoreRings />
                <Heatmap />
                <CoursePressure />
            </div>
        </section>
    );
}
