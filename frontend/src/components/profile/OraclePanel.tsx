import { useEffect, useState } from "react";
import { generateOracleDraft, refineDraft } from "utilities/pulseApi";
import type { StudentDetail } from "types/api";

interface Props {
    student: StudentDetail;
}

export default function OraclePanel({ student }: Props) {
    const [draft, setDraft] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [refineInput, setRefineInput] = useState("");
    const [refining, setRefining] = useState(false);

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

    const handleRefine = async () => {
        if (!refineInput.trim() || !draft.trim()) return;
        try {
            setRefining(true);
            const response = await refineDraft(student.id, draft, refineInput);
            setDraft(response.refinedDraft);
            setRefineInput("");
        } catch {
            setError("Failed to refine draft.");
        } finally {
            setRefining(false);
        }
    };

    return (
        <div className="oracle-panel">
            <div className="oracle-hdr">
                <div>
                    <span className="oracle-badge">PulseAI Drafting</span>
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

            <div className="refine-box">
                <div className="panel-title">Human Validation / Refine</div>
                <textarea
                    className="refine-input"
                    placeholder="Add a refinement instruction (e.g., make this more direct and include office hours)."
                    value={refineInput}
                    onChange={(event) => setRefineInput(event.target.value)}
                />
                <button className="btn-sm" onClick={handleRefine} disabled={refining || !refineInput.trim()}>
                    {refining ? "Refining..." : "Apply Refinement"}
                </button>
            </div>
        </div>
    );
}
