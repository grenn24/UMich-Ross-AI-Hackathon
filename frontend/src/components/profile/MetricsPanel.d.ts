import type { SignalBreakdownItem } from "types/api";
interface Props {
    title: string;
    score: number;
    rows: SignalBreakdownItem[];
}
export default function MetricPanel({ title, score, rows }: Props): import("react/jsx-runtime").JSX.Element;
export {};
