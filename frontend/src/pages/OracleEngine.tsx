import { useEffect, useState } from "react";
import OracleServiceCard from "components/oracle/OracleServiceCard";
import { calculateOraclePulse, compareStudentLanguage, generateOracleDraft, getOracleShowcase, refineDraft } from "utilities/pulseApi";
import type { OracleShowcaseResponse } from "types/api";

const fallbackShowcase: OracleShowcaseResponse = {
    studentId: "001",
    languageService: {
        badge: "Oracle AI Language Service",
        title: "Linguistic Vitality Analysis",
        description: "NLP on Canvas discussion post text",
        input: "I agree with what was said above.",
        outputs: [
            { key: "Sentiment score", value: "0.41 — neutral/negative", tone: "warning" },
            { key: "Reading level", value: "Grade 4 (↓ from 14)", tone: "critical" },
            { key: "Word count", value: "8 words (↓ from 127)", tone: "critical" },
            { key: "Curiosity markers", value: "0 (↓ from 3)", tone: "critical" },
            { key: "Intellectual risk", value: "None detected", tone: "critical" },
            { key: "Vitality change", value: "↓ 71% from baseline", tone: "critical" },
        ],
        showProcessing: true,
        processingLabel: "Processing NLP analysis...",
    },
    mlService: {
        badge: "Oracle ML Services",
        title: "Pulse Score Calculator",
        description: "Pressure / Resilience ratio model",
        formulaText: "Pulse = ( Resilience ÷ Pressure ) × 100 = ( 23 ÷ 88 ) × 100 = 26",
        pressureScore: 88,
        resilienceScore: 23,
        weightedBreakdown: {
            pressure: [
                { key: "Deadlines × 30%", value: "95 × .30 = 28.5", tone: "critical" },
                { key: "Exams × 25%", value: "80 × .25 = 20.0", tone: "warning" },
                { key: "GPA trend × 20%", value: "75 × .20 = 15.0", tone: "warning" },
            ],
            resilience: [
                { key: "Linguistic × 25%", value: "20 × .25 = 5.0", tone: "critical" },
                { key: "Sleep × 25%", value: "15 × .25 = 3.75", tone: "critical" },
                { key: "Social × 20%", value: "18 × .20 = 3.6", tone: "critical" },
            ],
        },
    },
    databaseService: {
        badge: "Oracle Autonomous Database",
        title: "Behavioral Fingerprint",
        description: "Personal baseline vs. current deviation",
        baselineLabel: "Maya — Week 1-3 Baseline",
        deviationLabel: "Week 8 — Deviation",
        baseline: {
            "Avg login hour": "11:24 AM",
            "Submission hour": "2:15 PM Tues",
            "Post word count": "127 avg",
            "Peer reply rate": "4.2 / week",
        },
        deviation: {
            "Login hour": "2:47 AM ↑15.5 hrs",
            "Submission hour": "11:58 PM Sun",
            "Post word count": "8 words ↓94%",
            "Anomaly flag": "5 signals concurrent",
        },
    },
    assistantService: {
        badge: "Oracle Digital Assistant",
        title: "Personalized Outreach",
        description: "Context-aware email generation",
        context: [
            { key: "Strongest moment", value: "Week 2 behavioral econ", tone: "accent" },
            { key: "Pressure trigger", value: "4 deadlines Nov 14", tone: "critical" },
            { key: "Tone", value: "Warm, human, non-clinical", tone: "accent" },
            { key: "Avoid", value: "AI scores, monitoring", tone: "neutral" },
        ],
        emailPreview:
            "Hi Maya, I was looking back at your behavioral economics post from a few weeks ago — your perspective on loss aversion was genuinely insightful. I have office hours Thursday 2–4pm if you'd like to stop by.",
    },
    scaleStats: [
        { value: "14M", label: "Data points per semester" },
        { value: "47", label: "Behavioral variables tracked" },
        { value: "3s", label: "Full university analysis" },
        { value: "4wk", label: "Earlier than human detection" },
    ],
};

export default function OracleEngine() {
    const [showcase, setShowcase] = useState<OracleShowcaseResponse>(fallbackShowcase);
    const [assistantDraft, setAssistantDraft] = useState(fallbackShowcase.assistantService.emailPreview);
    const [assistantInstruction, setAssistantInstruction] = useState("");
    const [draftLoading, setDraftLoading] = useState(false);
    const [refining, setRefining] = useState(false);
    const [assistantError, setAssistantError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;
        const load = async () => {
            try {
                const [response, language, pulse, draft] = await Promise.all([
                    getOracleShowcase("001"),
                    compareStudentLanguage("001"),
                    calculateOraclePulse({
                        submissionTimeliness: 22,
                        postFrequency: 18,
                        postSentiment: 20,
                        loginFrequency: 25,
                        peerInteraction: 16,
                        gradeTrajectory: 31,
                    }),
                    generateOracleDraft("001"),
                ]);
                if (mounted) {
                    setShowcase({
                        ...response,
                        languageService: {
                            ...response.languageService,
                            input: language.current.text,
                            outputs: [
                                { key: "Sentiment score", value: `${(language.current.scores.sentiment / 100).toFixed(2)} — neutral/negative`, tone: "warning" },
                                { key: "Reading level", value: `Complexity ${language.current.scores.complexity}`, tone: "critical" },
                                { key: "Word count", value: `${language.current.text.split(/\s+/).filter(Boolean).length} words`, tone: "critical" },
                                { key: "Curiosity markers", value: `${language.current.scores.curiosity}`, tone: "critical" },
                                { key: "Vitality change", value: `${language.summary}`, tone: "critical" },
                            ],
                        },
                        mlService: {
                            ...response.mlService,
                            formulaText: `Oracle ML Pulse = ${pulse.pulseScore} (${pulse.riskLevel})`,
                            weightedBreakdown: {
                                pressure: pulse.breakdown.slice(0, 3).map((b) => ({
                                    key: `${b.signal} × ${(b.weight * 100).toFixed(0)}%`,
                                    value: `${b.rawScore} × ${b.weight.toFixed(2)} = ${b.contribution}`,
                                    tone: b.rawScore < 40 ? "critical" : "warning",
                                })),
                                resilience: pulse.breakdown.slice(3).map((b) => ({
                                    key: `${b.signal} × ${(b.weight * 100).toFixed(0)}%`,
                                    value: `${b.rawScore} × ${b.weight.toFixed(2)} = ${b.contribution}`,
                                    tone: b.rawScore < 40 ? "critical" : "warning",
                                })),
                            },
                        },
                        assistantService: {
                            ...response.assistantService,
                            emailPreview: draft.draft,
                        },
                    });
                    setAssistantDraft(draft.draft);
                }
            } catch {
                if (mounted) setShowcase(fallbackShowcase);
            }
        };
        load();
        return () => {
            mounted = false;
        };
    }, []);

    const regenerateAssistantDraft = async () => {
        try {
            setDraftLoading(true);
            setAssistantError(null);
            const response = await generateOracleDraft("001");
            setAssistantDraft(response.draft);
        } catch {
            setAssistantError("Failed to regenerate outreach draft.");
        } finally {
            setDraftLoading(false);
        }
    };

    const applyAssistantRefine = async () => {
        if (!assistantInstruction.trim() || !assistantDraft.trim()) return;
        try {
            setRefining(true);
            setAssistantError(null);
            const response = await refineDraft("001", assistantDraft, assistantInstruction);
            setAssistantDraft(response.refinedDraft);
            setAssistantInstruction("");
        } catch {
            setAssistantError("Failed to apply AI refinement.");
        } finally {
            setRefining(false);
        }
    };

    return (
        <section className="page-shell">
            <div className="page-hdr">
                <div>
                    <h1 className="page-title">Oracle AI Engine</h1>
                    <p className="page-sub">How Oracle AI Cloud powers each layer of PulseAI</p>
                </div>
            </div>

            <div className="oracle-grid">
                <OracleServiceCard
                    badge={showcase.languageService.badge}
                    title={showcase.languageService.title}
                    description={showcase.languageService.description}
                    inputLabel="Input — Maya's Week 8 post"
                    input={showcase.languageService.input}
                    outputs={showcase.languageService.outputs}
                    showProcessing={showcase.languageService.showProcessing}
                    processingLabel={showcase.languageService.processingLabel}
                />

                <OracleServiceCard
                    badge={showcase.mlService.badge}
                    title={showcase.mlService.title}
                    description={showcase.mlService.description}
                    formulaText={showcase.mlService.formulaText}
                    splitTopLabel={`PRESSURE (${showcase.mlService.pressureScore})`}
                    splitTopRows={showcase.mlService.weightedBreakdown.pressure}
                    splitBottomLabel={`RESILIENCE (${showcase.mlService.resilienceScore})`}
                    splitBottomRows={showcase.mlService.weightedBreakdown.resilience}
                />

                <OracleServiceCard
                    badge={showcase.databaseService.badge}
                    title={showcase.databaseService.title}
                    description={showcase.databaseService.description}
                    splitTopLabel={showcase.databaseService.baselineLabel}
                    splitTopRows={Object.entries(showcase.databaseService.baseline).map(([key, value]) => ({ key, value, tone: "stable" as const }))}
                    splitBottomLabel={showcase.databaseService.deviationLabel}
                    splitBottomRows={Object.entries(showcase.databaseService.deviation).map(([key, value]) => ({ key, value, tone: "critical" as const }))}
                />

                <div className="oracle-svc">
                    <div className="svc-hdr">
                        <div className="svc-badge">{showcase.assistantService.badge}</div>
                        <h3 className="svc-name">{showcase.assistantService.title}</h3>
                        <p className="svc-desc">{showcase.assistantService.description}</p>
                    </div>

                    <div className="io-label">Context fed to Oracle</div>
                    <div className="io-output split-top">
                        {showcase.assistantService.context.map((row) => (
                            <div key={row.key} className="out-row">
                                <span className="out-key">{row.key}</span>
                                <span className={`out-val ${row.tone ? `tone-${row.tone}` : ""}`}>{row.value}</span>
                            </div>
                        ))}
                    </div>

                    <div className="io-label">Generated email — editable</div>
                    <div className="email-editor-main">
                        <textarea
                            className="email-editor"
                            value={assistantDraft}
                            onChange={(event) => setAssistantDraft(event.target.value)}
                            placeholder="AI draft will appear here."
                        />
                    </div>

                    <div className="io-label">Refine instruction</div>
                    <textarea
                        className="refine-input"
                        placeholder="e.g., Make it more concise and include Thursday office hours."
                        value={assistantInstruction}
                        onChange={(event) => setAssistantInstruction(event.target.value)}
                    />

                    <div className="btn-row">
                        <button className="btn-sm btn-primary">Send to Advisor</button>
                        <button className="btn-sm" onClick={regenerateAssistantDraft} disabled={draftLoading}>
                            {draftLoading ? "Regenerating..." : "Regenerate"}
                        </button>
                        <button className="btn-sm" onClick={applyAssistantRefine} disabled={refining || !assistantInstruction.trim()}>
                            {refining ? "Applying..." : "Apply AI Refine"}
                        </button>
                    </div>
                    {assistantError && <p className="cause-paragraph">{assistantError}</p>}
                </div>
            </div>

            <div className="scale-bar">
                {showcase.scaleStats.map((item) => (
                    <div className="scale-item" key={item.label}>
                        <div className="scale-num">{item.value}</div>
                        <div className="scale-lbl">{item.label}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}
