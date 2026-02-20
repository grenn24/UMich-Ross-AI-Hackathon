import { useEffect, useState } from "react";
import { generateOracleDraft } from "utilities/pulseApi";
import type { StudentDetail } from "types/api";

interface Props {
    student: StudentDetail;
}

export default function OraclePanel({ student }: Props) {
    const [draft, setDraft] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadDraft = async () => {
        try {
            setLoading(true);
            const response = await generateOracleDraft(student.id);
            setDraft(response.draft);
            setError(null);
        } catch {
            setError("Failed to generate draft.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDraft();
    }, [student.id]);

    return (
        <div className="oracle-panel">
            <div className="oracle-hdr">
                <div>
                    <span className="oracle-badge">PulseAI Digital Assistant</span>
                    <div className="oracle-name">Generated Outreach Email</div>
                    <div className="oracle-desc">Built from strongest academic signal + current stress markers</div>
                </div>
            </div>

            <div className="email-box">
                <div className="email-to">To: {student.name.toLowerCase().replace(" ", ".")}@umich.edu · Subject: Checking in</div>
                {loading ? "Generating draft..." : draft}
                {error && <p>{error}</p>}
            </div>

            <div className="btn-row">
                <button className="btn-sm btn-primary">Edit & Send</button>
                <button className="btn-sm" onClick={loadDraft} disabled={loading}>Regenerate</button>
            </div>
        </div>
    );
}
