import { useEffect, useState } from "react";
import ScoreRings from "../components/visualisation/ScoreRings";
import Heatmap from "../components/visualisation/Heatmap";
import CoursePressure from "../components/visualisation/CoursePressure";
import { getStudents } from "utilities/pulseApi";

export default function PulseVisualization() {
    const [studentCount, setStudentCount] = useState<number>(0);

    useEffect(() => {
        let mounted = true;
        const load = async () => {
            try {
                const students = await getStudents();
                if (mounted) setStudentCount(students.length);
            } catch {
                if (mounted) setStudentCount(0);
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
                    <p className="page-sub">University-wide wellness view · Course pressure analysis</p>
                </div>
                <div className="week-chip">{studentCount} students · Week 8</div>
            </div>

            <div className="viz-grid">
                <ScoreRings />
                <Heatmap />
                <CoursePressure />
            </div>
        </section>
    );
}
