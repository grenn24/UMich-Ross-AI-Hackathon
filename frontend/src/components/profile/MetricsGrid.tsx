import MetricPanel from "./MetricsPanel";
import type { StudentDetail } from "types/api";

interface Props {
    student: StudentDetail;
}

export default function MetricsGrid({ student }: Props) {
    const metrics = student.currentMetrics;
    const pressureRows = student.pressureBreakdown ?? [];
    const resilienceRows = student.resilienceBreakdown ?? [];

    return (
        <div className="two-col">
            <MetricPanel
                title="Academic Pressure"
                score={metrics.pressure}
                rows={pressureRows}
            />
            <MetricPanel
                title="Personal Resilience"
                score={metrics.resilience}
                rows={resilienceRows}
            />
        </div>
    );
}
