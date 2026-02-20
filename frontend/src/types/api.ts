export type RiskLevel = "CRITICAL" | "HIGH" | "WATCH" | "STABLE";

export interface StudentMetricSnapshot {
	pressure: number;
	resilience: number;
	deadlines: number;
	engagement: number;
}

export interface WeeklyDataPoint {
	week: number;
	pressure: number;
	resilience: number;
	pulseScore: number;
}

export interface StudentCardData {
	id: string;
	name: string;
	course: string;
	riskLevel: RiskLevel;
	pulseScore: number;
	pulseTrend: number;
	topSignals: string[];
	currentWeek: number;
	currentMetrics: StudentMetricSnapshot;
}

export interface StudentDetail extends StudentCardData {
	strongestMoment: string;
	week1Post: string;
	currentPost: string;
	weeklyData: WeeklyDataPoint[];
}

export interface TrajectoryResponse {
	studentId: string;
	name: string;
	currentWeek: number;
	weeklyData: WeeklyDataPoint[];
}

export interface OracleDraftResponse {
	studentId: string;
	name: string;
	riskLevel: RiskLevel;
	draft: string;
	personalizationNotes: {
		strongestMomentUsed: string;
		primarySignalReferenced: string | null;
		toneCalibration: string;
	};
}

export interface CourseSummary {
	courseId: string;
	name: string;
	professor: string;
	avgPressure: number;
	peakPressure: number;
	peakWeek: number;
	deadlineClusterDetected: boolean;
}

export interface HeatmapResponse {
	heatmap: Record<
		string,
		{
			courseName: string;
			weeklyPressure: Array<{
				week: number;
				pressure: number;
				riskZone: "GREEN" | "YELLOW" | "ORANGE" | "RED";
			}>;
		}
	>;
	generatedAt: string;
}
