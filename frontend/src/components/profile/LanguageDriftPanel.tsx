import type { StudentDetail } from "types/api";

interface Props {
    student: StudentDetail;
}

export default function LanguageDriftPanel({ student }: Props) {
    if (!student.languageBaseline || !student.languageCurrent) return null;

    return (
        <div className="panel">
            <div className="panel-title">Oracle AI Language — Writing Voice Drift</div>
            <div className="ling-grid">
                <div className="ling-card healthy">
                    <div className="ling-week healthy">{student.languageBaseline.title}</div>
                    <div className="ling-quote">{student.languageBaseline.quote}</div>
                    <div className="ling-metrics">
                        {student.languageBaseline.metrics.map((item) => (
                            <span key={item} className="lm lm-green">{item}</span>
                        ))}
                    </div>
                </div>

                <div className="ling-card declining">
                    <div className="ling-week declining">{student.languageCurrent.title}</div>
                    <div className="ling-quote">{student.languageCurrent.quote}</div>
                    <div className="ling-metrics">
                        {student.languageCurrent.metrics.map((item) => (
                            <span key={item} className="lm lm-red">{item}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
