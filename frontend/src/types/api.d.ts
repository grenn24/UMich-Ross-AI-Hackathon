export type RiskLevel = "CRITICAL" | "HIGH" | "WATCH" | "STABLE";
export interface StudentMetricSnapshot {
    pressure: number;
    resilience: number;
    deadlines: number;
    engagement: number;
}
export interface SignalBreakdownItem {
    label: string;
    value: number;
    tone: "critical" | "warning" | "stable";
}
export interface LanguageDriftBlock {
    title: string;
    quote: string;
    metrics: string[];
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
    year?: string;
    major?: string;
    creditHours?: number;
    decliningWeeks?: number;
    dashboardTags?: string[];
}
export interface StudentDetail extends StudentCardData {
    strongestMoment: string;
    week1Post: string;
    currentPost: string;
    weeklyData: WeeklyDataPoint[];
    advisorName?: string;
    department?: string;
    courses?: string[];
    baselinePulse?: number;
    pressureBreakdown?: SignalBreakdownItem[];
    resilienceBreakdown?: SignalBreakdownItem[];
    languageBaseline?: LanguageDriftBlock;
    languageCurrent?: LanguageDriftBlock;
    behavioralBaseline?: Record<string, string>;
    behavioralDeviation?: Record<string, string>;
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
    studentHeatmap?: Array<{
        studentId: string;
        name: string;
        weeklyPressure: Array<{
            week: number;
            pressure: number;
            riskZone: "GREEN" | "YELLOW" | "ORANGE" | "RED";
        }>;
    }>;
    generatedAt: string;
}
export interface OracleShowcaseResponse {
    studentId: string;
    languageService: {
        badge: string;
        title: string;
        description: string;
        input: string;
        outputs: Array<{
            key: string;
            value: string;
            tone: "critical" | "warning" | "stable" | "accent" | "neutral";
        }>;
        showProcessing?: boolean;
        processingLabel?: string;
    };
    mlService: {
        badge: string;
        title: string;
        description: string;
        formulaText: string;
        pressureScore: number;
        resilienceScore: number;
        weightedBreakdown: {
            pressure: Array<{
                key: string;
                value: string;
                tone: "critical" | "warning" | "stable" | "accent" | "neutral";
            }>;
            resilience: Array<{
                key: string;
                value: string;
                tone: "critical" | "warning" | "stable" | "accent" | "neutral";
            }>;
        };
    };
    databaseService: {
        badge: string;
        title: string;
        description: string;
        baselineLabel: string;
        deviationLabel: string;
        baseline: Record<string, string>;
        deviation: Record<string, string>;
    };
    assistantService: {
        badge: string;
        title: string;
        description: string;
        context: Array<{
            key: string;
            value: string;
            tone: "critical" | "warning" | "stable" | "accent" | "neutral";
        }>;
        emailPreview: string;
    };
    scaleStats: Array<{
        value: string;
        label: string;
    }>;
}
export interface CompareLanguageResponse {
    studentId: string;
    name: string;
    week1: {
        text: string;
        scores: {
            sentiment: number;
            complexity: number;
            curiosity: number;
            vitality: number;
        };
    };
    current: {
        text: string;
        scores: {
            sentiment: number;
            complexity: number;
            curiosity: number;
            vitality: number;
        };
    };
    deltas: Record<string, number>;
    linguisticDegradationDetected: boolean;
    summary: string;
}
export interface OraclePulseCalcResponse {
    pulseScore: number;
    riskLevel: RiskLevel;
    breakdown: Array<{
        signal: string;
        rawScore: number;
        weight: number;
        contribution: number;
    }>;
    formula: string;
    interpretation: string;
}
