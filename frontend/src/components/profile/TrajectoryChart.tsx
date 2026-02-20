import { useState } from "react";
import { getChatbotInsight } from "utilities/pulseApi";
import type { WeeklyDataPoint } from "types/api";

interface Props {
    weeklyData: WeeklyDataPoint[];
    studentId: string;
}

export default function TrajectoryChart({ weeklyData, studentId }: Props) {
    const width = 820;
    const height = 150;
    const leftPad = 20;
    const rightPad = 20;
    const topPad = 15;
    const bottomPad = 15;
    const xSpan = width - leftPad - rightPad;
    const ySpan = height - topPad - bottomPad;
    const maxIndex = Math.max(1, weeklyData.length - 1);
    const toY = (value: number) => topPad + ((100 - value) / 100) * ySpan;
    const toX = (index: number) => leftPad + (index / maxIndex) * xSpan;
    const pressurePoints = weeklyData.map((point, i) => `${toX(i)},${toY(point.pressure)}`).join(" ");
    const resiliencePoints = weeklyData.map((point, i) => `${toX(i)},${toY(point.resilience)}`).join(" ");
    const [insight, setInsight] = useState("");
    const [loading, setLoading] = useState(false);

    const generateInsight = async () => {
        try {
            setLoading(true);
            const response = await getChatbotInsight(
                studentId,
                "Summarize this student's stress trajectory and explain why the risk trend is concerning."
            );
            setInsight(response.paragraph);
        } catch {
            setInsight("Unable to generate insight right now.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="chart-panel">
            <div className="oracle-badge">PulseAI Digital Assistant</div>
            <div className="oracle-name">Chatbot Insight</div>
            <h3 className="panel-title">14-Week Pressure vs Resilience</h3>
            <svg className="chart" viewBox="0 0 820 150" height="150" role="img" aria-label="Trajectory chart">
                <line x1="0" y1="30" x2="820" y2="30" stroke="#e7eaf0" />
                <line x1="0" y1="75" x2="820" y2="75" stroke="#e7eaf0" />
                <line x1="0" y1="120" x2="820" y2="120" stroke="#e7eaf0" />
                <polyline
                    fill="none"
                    stroke="#d93025"
                    strokeWidth="2"
                    points={pressurePoints}
                />
                <polyline
                    fill="none"
                    stroke="#1a7f4b"
                    strokeWidth="2"
                    points={resiliencePoints}
                />
            </svg>
            <p className="cause-paragraph chart-insight">{insight}</p>
            <button className="btn-sm btn-primary chart-insight-btn" onClick={generateInsight} disabled={loading}>
                {loading ? "Generating..." : "Generate Insight"}
            </button>
        </div>
    );
}
