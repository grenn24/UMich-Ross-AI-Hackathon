import { useEffect, useMemo, useState } from "react";
import { generateOracleDraft, refineDraft } from "utilities/pulseApi";
import type { StudentDetail } from "types/api";

interface Props {
    student: StudentDetail;
}

export default function OraclePanel({ student }: Props) {
    const [draft, setDraft] = useState("");
    const [editedDraft, setEditedDraft] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [refineInput, setRefineInput] = useState("");
    const [refining, setRefining] = useState(false);
    const [savedAt, setSavedAt] = useState<string | null>(null);

    const recipient = useMemo(() => `${student.name.toLowerCase().replace(/\s+/g, ".")}@umich.edu`, [student.name]);

    const loadDraft = async () => {
        try {
            setLoading(true);
            const response = await generateOracleDraft(student.id);
            setDraft(response.draft);
            setEditedDraft(response.draft);
            setSavedAt(null);
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
        if (!refineInput.trim() || !editedDraft.trim()) return;
        try {
            setRefining(true);
            const response = await refineDraft(student.id, editedDraft, refineInput);
            setDraft(response.refinedDraft);
            setEditedDraft(response.refinedDraft);
            setRefineInput("");
            setSavedAt(new Date().toLocaleTimeString());
            setError(null);
        } catch {
            setError("Failed to refine draft.");
        } finally {
            setRefining(false);
        }
    };

    const handleSaveEdits = () => {
        setDraft(editedDraft);
        setSavedAt(new Date().toLocaleTimeString());
    };

    return (
        <div className="oracle-panel">
            <div className="oracle-hdr">
                <div>
                    <span className="oracle-badge">PulseAI Drafting</span>
                    <div className="oracle-name">Generated Outreach Email</div>
                    <div className="oracle-desc">Interactive editor + AI copilot for advisor outreach</div>
                </div>
            </div>

            <div className="email-editor-layout">
                <div className="email-editor-main">
                    <div className="email-to">To: {recipient} · Subject: Checking in — how are you?</div>
                    <textarea
                        className="email-editor"
                        value={loading ? "Generating draft..." : editedDraft}
                        onChange={(event) => setEditedDraft(event.target.value)}
                        disabled={loading}
                    />
                    {error && <p className="cause-paragraph">{error}</p>}
                </div>

                <aside className="email-editor-side">
                    <div className="panel-title">AI Actions</div>
                    <textarea
                        className="refine-input"
                        placeholder="Tell AI how to revise this email (tone, length, office hours, urgency, etc.)"
                        value={refineInput}
                        onChange={(event) => setRefineInput(event.target.value)}
                    />
                    <button className="btn-sm btn-primary" onClick={handleRefine} disabled={refining || !refineInput.trim()}>
                        {refining ? "Refining..." : "Apply AI Refinement"}
                    </button>
                    <button className="btn-sm" onClick={handleSaveEdits} disabled={!editedDraft.trim()}>
                        Save Manual Edits
                    </button>
                    <button className="btn-sm" onClick={loadDraft} disabled={loading}>
                        Regenerate Draft
                    </button>
                    <button className="btn-sm">Send to Student</button>
                    <button className="btn-sm">Refer to Counseling</button>
                    <div className="editor-meta">
                        <div>Current version: {draft ? "Ready" : "Drafting..."}</div>
                        <div>Last saved: {savedAt ?? "Not saved yet"}</div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
