import { useEffect, useMemo, useState } from "react";
import { getUniversityHeatmap } from "utilities/pulseApi";
import type { HeatmapResponse } from "types/api";

const Heatmap = () => {
    const [heatmap, setHeatmap] = useState<HeatmapResponse["heatmap"]>({});
    const [studentHeatmap, setStudentHeatmap] = useState<NonNullable<HeatmapResponse["studentHeatmap"]>>([]);

    useEffect(() => {
        let mounted = true;
        const load = async () => {
            try {
                const response = await getUniversityHeatmap();
                if (mounted) {
                    setHeatmap(response.heatmap);
                    setStudentHeatmap(response.studentHeatmap ?? []);
                }
            } catch {
                if (mounted) {
                    setHeatmap({});
                    setStudentHeatmap([]);
                }
            }
        };
        load();
        return () => {
            mounted = false;
        };
    }, []);

    const weeks = useMemo(() => {
        const values = Object.values(heatmap);
        const maxWeek = Math.max(14, ...values.map((course) => course.weeklyPressure.length), 0);
        return Array.from({ length: maxWeek }, (_, i) => i + 1);
    }, [heatmap]);

    const cells = useMemo(() => {
        if (studentHeatmap.length > 0) {
            return studentHeatmap
                .flatMap((student) =>
                    student.weeklyPressure.map((item) => ({
                        week: item.week,
                        pulse: Math.max(0, 100 - item.pressure),
                        tone:
                            item.riskZone === "RED"
                                ? "hm-red"
                                : item.riskZone === "ORANGE"
                                    ? "hm-orange"
                                    : item.riskZone === "GREEN"
                                        ? "hm-green"
                                        : "hm-yellow",
                    }))
                );
        }
        return Object.values(heatmap).flatMap((course) =>
            course.weeklyPressure.map((item) => ({
                week: item.week,
                pulse: Math.max(0, 100 - item.pressure),
                tone:
                    item.riskZone === "RED"
                        ? "hm-red"
                        : item.riskZone === "ORANGE"
                            ? "hm-orange"
                            : item.riskZone === "GREEN"
                                ? "hm-green"
                                : "hm-yellow",
            }))
        );
    }, [heatmap, studentHeatmap]);

    return (
        <div className="viz-panel">
            <h3 className="panel-title">Student Wellness Heatmap - All Students by Week</h3>
            <div className="heatmap-wrap">
                <div className="hm-labels">
                    {weeks.map((week) => (
                        <span key={week} className="hm-lbl">
                            W{week}
                        </span>
                    ))}
                </div>
                <div className="hm-grid">
                    {cells.map((cell, i) => (
                        <span
                            key={i}
                            className={`hm-cell ${cell.tone}`}
                            data-tooltip={`Pulse ${cell.pulse}`}
                            title={`Week ${cell.week} - Pulse ${cell.pulse}`}
                        />
                    ))}
                </div>
                <div className="heatmap-legend">
                    <span>Low wellness</span>
                    <div className="heatmap-swatch">
                        <span className="sw-red" />
                        <span className="sw-orange" />
                        <span className="sw-yellow" />
                        <span className="sw-green" />
                    </div>
                    <span>High wellness</span>
                </div>
            </div>
        </div>
    );
};

export default Heatmap;
