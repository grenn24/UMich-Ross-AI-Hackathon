import MetricPanel from "./MetricsPanel";
import type { StudentDetail } from "types/api";

interface Props {
    student: StudentDetail;
}

export default function MetricsGrid({ student }: Props) {
    const metrics = student.currentMetrics;

    return (
        <div className="two-col">
            <MetricPanel
                title="Academic Pressure"
                score={metrics.pressure}
                deadlines={metrics.deadlines}
                engagement={metrics.engagement}
            />
            <MetricPanel
                title="Personal Resilience"
                score={metrics.resilience}
                deadlines={metrics.deadlines}
                engagement={metrics.engagement}
            />
        </div>
    );
}
