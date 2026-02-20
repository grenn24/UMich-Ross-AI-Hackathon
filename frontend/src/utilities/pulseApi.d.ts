import type { CourseSummary, HeatmapResponse, OracleDraftResponse, StudentCardData, StudentDetail, TrajectoryResponse } from "types/api";
export declare const getStudents: (riskLevel?: string) => Promise<StudentCardData[]>;
export declare const getStudentById: (studentId: string) => Promise<StudentDetail>;
export declare const getTrajectory: (studentId: string) => Promise<TrajectoryResponse>;
export declare const generateOracleDraft: (studentId: string) => Promise<OracleDraftResponse>;
export declare const getUniversityHeatmap: () => Promise<HeatmapResponse>;
export declare const getCourses: () => Promise<CourseSummary[]>;
