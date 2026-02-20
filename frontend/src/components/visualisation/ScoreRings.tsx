import { useEffect, useMemo, useState } from "react";
import { getStudents } from "utilities/pulseApi";
import type { StudentCardData } from "types/api";

const ScoreRings = () => {
    const [students, setStudents] = useState<StudentCardData[]>([]);

    useEffect(() => {
        let mounted = true;
        const load = async () => {
            try {
                const data = await getStudents();
                if (mounted) setStudents(data);
            } catch {
                if (mounted) setStudents([]);
            }
        };
        load();
        return () => {
            mounted = false;
        };
    }, []);

    const counts = useMemo(
        () => ({
            critical: students.filter((s) => s.riskLevel === "CRITICAL").length,
            high: students.filter((s) => s.riskLevel === "HIGH").length,
            watch: students.filter((s) => s.riskLevel === "WATCH").length,
            stable: students.filter((s) => s.riskLevel === "STABLE").length,
        }),
        [students]
    );

    return (
        <div className="viz-panel full-col">
            <h3 className="panel-title">University Wellness Distribution</h3>
            <div className="stat-strip">
                <div className="stat-box">
                    <div className="stat-num critical-txt">{counts.critical}</div>
                    <div className="stat-lbl">Critical this week</div>
                </div>
                <div className="stat-box">
                    <div className="stat-num warning-txt">{counts.high}</div>
                    <div className="stat-lbl">High risk</div>
                </div>
                <div className="stat-box">
                    <div className="stat-num watch-txt">{counts.watch}</div>
                    <div className="stat-lbl">Watch list</div>
                </div>
                <div className="stat-box">
                    <div className="stat-num stable-txt">{counts.stable}</div>
                    <div className="stat-lbl">Stable</div>
                </div>
            </div>
        </div>
    );
};

export default ScoreRings;
