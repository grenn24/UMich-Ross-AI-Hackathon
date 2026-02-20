import { useEffect, useState } from "react";
import { getChatbotInsight } from "utilities/pulseApi";

interface Props {
    studentId: string;
}

const DEFAULT_INSIGHT_PROMPT =
    "Summarize this student's stress trajectory and explain why the risk trend is concerning.";

export default function ChatbotInsightHero({ studentId }: Props) {
    const [insight, setInsight] = useState("");
    const [loading, setLoading] = useState(true);

    const loadInsight = async () => {
        try {
            setLoading(true);
            const response = await getChatbotInsight(studentId, DEFAULT_INSIGHT_PROMPT);
            setInsight(response.paragraph);
        } catch {
            setInsight("Unable to generate insight right now.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadInsight();
    }, [studentId]);

    return (
        <div className="insight-hero">
            <div className="oracle-badge">PulseAI Digital Assistant</div>
            <div className="oracle-name">Chatbot Insight</div>
            <p className="insight-hero-text">
                {loading ? "Generating insight..." : insight}
            </p>
            <button className="btn-sm btn-primary" onClick={loadInsight} disabled={loading}>
                {loading ? "Refreshing..." : "Refresh Insight"}
            </button>
        </div>
    );
}
