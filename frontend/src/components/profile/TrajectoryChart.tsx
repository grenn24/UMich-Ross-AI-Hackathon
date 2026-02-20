import { useEffect, useState } from "react";
import { getChatbotInsight } from "utilities/pulseApi";

interface Props {
    studentId: string;
}

export default function TrajectoryChart({ studentId }: Props) {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [graphData, setGraphData] = useState<Array<{ label: string; value: number }>>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const runQuestion = async (prompt: string) => {
        if (!prompt.trim()) return;
        try {
            setLoading(true);
            setError(null);
            const response = await getChatbotInsight(studentId, prompt.trim());
            setAnswer(response.paragraph);
            setGraphData(response.graphData.slice(0, 3));
        } catch {
            setError("Unable to generate a chatbot response right now.");
            setAnswer("");
            setGraphData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        runQuestion("What are the top three current risk drivers and how severe is each one?");
    }, [studentId]);

    const handleSubmit = async () => {
        await runQuestion(question);
    };

    return (
        <div className="chart-panel">
            <div className="oracle-badge">PulseAI Digital Assistant</div>
            <div className="oracle-name">Student Performance Q&A</div>
            <h3 className="panel-title">14-Week Pressure vs. Resilience — Ask Follow-ups</h3>

            <div className="chatbot-layout">
                <textarea
                    className="refine-input chatbot-input"
                    placeholder="Ask a question about this student’s performance (e.g., What changed in the last 3 weeks?)"
                    value={question}
                    onChange={(event) => setQuestion(event.target.value)}
                />
                <button className="btn-sm btn-primary insight-btn" onClick={handleSubmit} disabled={loading || !question.trim()}>
                    {loading ? "Thinking..." : "Ask Chatbot"}
                </button>
            </div>

            {error && <p className="cause-paragraph chart-insight">{error}</p>}

            {graphData.length > 0 && (
                <div className="cause-bars chart-insight">
                    {graphData.map((point) => (
                        <div className="cause-row" key={point.label}>
                            <div className="cause-label">{point.label}</div>
                            <div className="cause-track">
                                <div className="cause-fill" style={{ width: `${point.value}%` }} />
                            </div>
                            <div className="cause-val">{point.value}</div>
                        </div>
                    ))}
                </div>
            )}

            {answer && <p className="cause-paragraph">{answer}</p>}
        </div>
    );
}
