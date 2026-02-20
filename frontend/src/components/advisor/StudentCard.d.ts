import type { RiskLevel } from "types/api";
interface Props {
    id: string;
    name: string;
    course: string;
    score: number;
    trend: number;
    riskLevel: RiskLevel;
    week: number;
    year?: string;
    major?: string;
    creditHours?: number;
    decliningWeeks?: number;
    dashboardTags?: string[];
}
export default function StudentCard({ id, name, course, score, trend, riskLevel, week, year, major, creditHours, decliningWeeks, dashboardTags, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
