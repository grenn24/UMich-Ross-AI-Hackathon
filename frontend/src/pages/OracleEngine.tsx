import OracleServiceCard from "components/oracle/OracleServiceCard";

export default function OracleEngine() {
    return (
        <section className="page-shell">
            <div className="page-hdr">
                <div>
                    <h1 className="page-title">Oracle AI Engine</h1>
                    <p className="page-sub">How Oracle services power each PulseAI prediction layer</p>
                </div>
            </div>

            <div className="oracle-grid">
                <OracleServiceCard
                    badge="Oracle AI Language"
                    title="Linguistic Vitality Analysis"
                    description="NLP on Canvas discussion activity"
                    input="I agree with what was said above."
                    outputs={[
                        { key: "Sentiment", value: "0.41 neutral/negative", tone: "warning" },
                        { key: "Reading level", value: "Grade 4, down from 14", tone: "critical" },
                        { key: "Vitality change", value: "Down 71% from baseline", tone: "critical" },
                    ]}
                />
                <OracleServiceCard
                    badge="Oracle ML"
                    title="Pulse Score Calculator"
                    description="Pressure / resilience ratio model"
                    input="Pulse = (Resilience / Pressure) * 100"
                    outputs={[
                        { key: "Pressure", value: "88", tone: "critical" },
                        { key: "Resilience", value: "23", tone: "warning" },
                        { key: "Final pulse", value: "26", tone: "accent" },
                    ]}
                />
            </div>
        </section>
    );
}
