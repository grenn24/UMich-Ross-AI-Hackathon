import { useEffect, useMemo, useState } from "react";
import { getUniversityHeatmap } from "utilities/pulseApi";
import type { HeatmapResponse } from "types/api";

const Heatmap = () => {
    const [heatmap, setHeatmap] = useState<HeatmapResponse["heatmap"]>({});

    useEffect(() => {
        let mounted = true;
        const load = async () => {
            try {
                const response = await getUniversityHeatmap();
                if (mounted) setHeatmap(response.heatmap);
            } catch {
                if (mounted) setHeatmap({});
            }
        };
        load();
        return () => {
            mounted = false;
        };
    }, []);

    const weeks = useMemo(() => {
        const values = Object.values(heatmap);
        const maxWeek = Math.max(0, ...values.map((course) => course.weeklyPressure.length));
        return Array.from({ length: maxWeek }, (_, i) => i + 1);
    }, [heatmap]);

    const cells = useMemo(
        () =>
            Object.values(heatmap).flatMap((course) =>
                course.weeklyPressure.map((item) => {
                    if (item.riskZone === "RED") return "hm-red";
                    if (item.riskZone === "ORANGE") return "hm-orange";
                    if (item.riskZone === "GREEN") return "hm-green";
                    return "hm-yellow";
                })
            ),
        [heatmap]
    );

    return (
        <div className="viz-panel">
            <h3 className="panel-title">Student Wellness Heatmap</h3>
            <div className="hm-labels">
                {weeks.map((week) => (
                    <span key={week} className="hm-lbl">
                        W{week}
                    </span>
                ))}
            </div>
            <div className="hm-grid">
                {cells.map((tone, i) => (
                    <span key={i} className={`hm-cell ${tone}`} />
                ))}
            </div>
        </div>
    );
};

export default Heatmap;
