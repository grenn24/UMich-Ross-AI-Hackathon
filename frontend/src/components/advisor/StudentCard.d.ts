import type { RiskLevel } from "types/api";
interface Props {
    id: string;
    name: string;
    course: string;
    score: number;
    trend: number;
    riskLevel: RiskLevel;
    week: number;
}
export default function StudentCard({ id, name, course, score, trend, riskLevel, week }: Props): import("react/jsx-runtime").JSX.Element;
export {};
