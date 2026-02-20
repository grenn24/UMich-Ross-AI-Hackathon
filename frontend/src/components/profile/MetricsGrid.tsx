import MetricPanel from "./MetricsPanel";

export default function MetricsGrid() {
    return (
        <div className="two-col">
            <MetricPanel title="Academic Pressure" score={88} />
            <MetricPanel title="Personal Resilience" score={23} />
        </div>
    );
}
