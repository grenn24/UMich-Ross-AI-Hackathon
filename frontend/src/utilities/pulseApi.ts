import createApiClient from "./apiClient";
import type {
	ChatbotInsightResponse,
	CourseSummary,
	HeatmapResponse,
	OracleDraftResponse,
	RefineDraftResponse,
	StressCauseResponse,
	StudentCardData,
	StudentDetail,
	TrajectoryResponse,
} from "types/api";

const studentsApi = createApiClient("/api/students");
const oracleApi = createApiClient("/api/oracle");
const coursesApi = createApiClient("/api/courses");

export const getStudents = async (riskLevel?: string): Promise<StudentCardData[]> => {
	const params = riskLevel && riskLevel !== "all" ? { risk_level: riskLevel } : undefined;
	const response = await studentsApi.get<StudentCardData[]>("/", { params });
	return Array.isArray(response.data) ? (response.data as StudentCardData[]) : [];
};

export const getStudentById = async (studentId: string): Promise<StudentDetail> => {
	const response = await studentsApi.get<StudentDetail>(`/${studentId}`);
	return response.data as StudentDetail;
};

export const getTrajectory = async (studentId: string): Promise<TrajectoryResponse> => {
	const response = await studentsApi.get<TrajectoryResponse>(`/${studentId}/trajectory`);
	return response.data as TrajectoryResponse;
};

export const generateOracleDraft = async (studentId: string): Promise<OracleDraftResponse> => {
	const response = await oracleApi.post<{ studentId: string }, OracleDraftResponse>(
		"/generate-draft",
		{ studentId }
	);
	return response.data as OracleDraftResponse;
};

export const getUniversityHeatmap = async (): Promise<HeatmapResponse> => {
	const response = await oracleApi.get<HeatmapResponse>("/university-heatmap");
	return response.data as HeatmapResponse;
};

export const getCourses = async (): Promise<CourseSummary[]> => {
	const response = await coursesApi.get<CourseSummary[]>("/");
	return Array.isArray(response.data) ? (response.data as CourseSummary[]) : [];
};

export const getChatbotInsight = async (
	studentId: string,
	prompt: string
): Promise<ChatbotInsightResponse> => {
	const response = await oracleApi.post<
		{ studentId: string; prompt: string },
		ChatbotInsightResponse
	>("/chatbot-insight", { studentId, prompt });
	return response.data as ChatbotInsightResponse;
};

export const refineDraft = async (
	studentId: string,
	currentDraft: string,
	instruction: string
): Promise<RefineDraftResponse> => {
	const response = await oracleApi.post<
		{ studentId: string; currentDraft: string; instruction: string },
		RefineDraftResponse
	>("/refine-draft", { studentId, currentDraft, instruction });
	return response.data as RefineDraftResponse;
};

export const getStressCause = async (studentId: string): Promise<StressCauseResponse> => {
	const response = await oracleApi.get<StressCauseResponse>(`/stress-cause/${studentId}`);
	return response.data as StressCauseResponse;
};
