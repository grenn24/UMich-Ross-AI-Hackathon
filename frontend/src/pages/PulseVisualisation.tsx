import ScoreRings from "../components/visualisation/ScoreRings";
import Heatmap from "../components/visualisation/Heatmap";
import CoursePressure from "../components/visualisation/CoursePressure";

export default function PulseVisualization() {
    return (
        <section className="page-shell">
            <div className="page-hdr">
                <div>
                    <h1 className="page-title">Pulse Intelligence</h1>
                    <p className="page-sub">University-wide wellness pattern and pressure trends</p>
                </div>
                <div className="week-chip">20,000 students · Week 8</div>
            </div>

            <div className="viz-grid">
                <ScoreRings />
                <Heatmap />
                <CoursePressure />
            </div>
        </section>
    );
}
