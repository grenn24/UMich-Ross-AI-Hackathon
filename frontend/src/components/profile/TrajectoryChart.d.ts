import type { WeeklyDataPoint } from "types/api";
interface Props {
    weeklyData: WeeklyDataPoint[];
    studentId: string;
}
export default function TrajectoryChart({ weeklyData, studentId }: Props): import("react/jsx-runtime").JSX.Element;
export {};
