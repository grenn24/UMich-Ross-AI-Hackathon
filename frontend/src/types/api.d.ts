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
    predictedStress?: number;
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
    metadata?: {
        traceId: string;
        provider: string;
        model?: string | null;
        fallbackUsed: boolean;
        fallbackReason?: string | null;
        latencyMs?: number;
    };
}
export interface ChatbotInsightResponse {
    studentId: string;
    prompt: string;
    graphData: Array<{
        label: string;
        value: number;
    }>;
    paragraph: string;
    metadata: {
        traceId: string;
        provider: string;
        model?: string | null;
        fallbackUsed: boolean;
        fallbackReason?: string | null;
        latencyMs?: number;
    };
}
export interface RefineDraftResponse {
    studentId: string;
    refinedDraft: string;
    metadata: {
        traceId: string;
        provider: string;
        model?: string | null;
        fallbackUsed: boolean;
        fallbackReason?: string | null;
        latencyMs?: number;
    };
}
export interface StressCauseResponse {
    studentId: string;
    graphData: Array<{
        label: string;
        value: number;
    }>;
    paragraph: string;
    metadata: {
        traceId: string;
        provider: string;
        model?: string | null;
        fallbackUsed: boolean;
        fallbackReason?: string | null;
        latencyMs?: number;
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
    heatmap: Record<string, {
        courseName: string;
        weeklyPressure: Array<{
            week: number;
            pressure: number;
            riskZone: "GREEN" | "YELLOW" | "ORANGE" | "RED";
        }>;
    }>;
    generatedAt: string;
}
