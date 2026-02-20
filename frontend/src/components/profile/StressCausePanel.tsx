import { useEffect, useState } from "react";
import { getStressCause } from "utilities/pulseApi";
import type { StudentDetail } from "types/api";

interface Props {
	student: StudentDetail;
}

const toCauseScore = (student: StudentDetail, index: number) => {
	const base = Number.isFinite(student.predictedStress)
		? Number(student.predictedStress)
		: Math.max(0, Math.min(100, Math.round((100 - student.pulseScore) * 0.8)));
	if (index === 0) return Math.min(100, base + 6);
	if (index === 1) return Math.max(0, base - 3);
	return Math.max(0, base - 12);
};

export default function StressCausePanel({ student }: Props) {
	const causes = student.topSignals.slice(0, 3);
	const [analysis, setAnalysis] = useState<{
		paragraph: string;
		graphData: Array<{ label: string; value: number }>;
		provider: string;
	} | null>(null);

	useEffect(() => {
		let mounted = true;
		const load = async () => {
			try {
				const response = await getStressCause(student.id);
				if (!mounted) return;
				setAnalysis({
					paragraph: response.paragraph,
					graphData: response.graphData,
					provider: response.metadata?.provider || "fallback",
				});
			} catch {
				if (!mounted) return;
				setAnalysis(null);
			}
		};
		load();
		return () => {
			mounted = false;
		};
	}, [student.id]);

	const paragraph =
		analysis?.paragraph ||
		`Primary driver appears to be ${(causes[0] || "deadline pressure").toLowerCase()}, amplified by a ${Math.abs(
			student.pulseTrend
		)}-point weekly pulse trend change.`;
	const rows =
		analysis?.graphData?.map((row) => ({
			label: row.label || "Signal",
			value: Number.isFinite(row.value) ? Math.max(0, Math.min(100, Number(row.value))) : 0,
		})) ||
		causes.map((cause, index) => ({ label: cause, value: toCauseScore(student, index) }));

	return (
		<div className="chart-panel">
			<h3 className="panel-title">Main Stress Cause (AI Analysis)</h3>
			{analysis && <div className="chatbot-meta">Provider: {analysis.provider}</div>}
			<div className="cause-bars">
				{rows.map((row, index) => (
					<div className="cause-row" key={`${row.label}-${index}`}>
						<span className="cause-label">{row.label}</span>
						<div className="cause-track">
							<div className="cause-fill" style={{ width: `${row.value}%` }} />
						</div>
						<span className="cause-val">{row.value}</span>
					</div>
				))}
			</div>
			<p className="cause-paragraph">{paragraph}</p>
		</div>
	);
}
