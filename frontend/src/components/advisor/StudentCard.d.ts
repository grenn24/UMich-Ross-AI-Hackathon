interface Props {
    name: string;
    score: number;
    status: "critical" | "warning" | "stable";
}
export default function StudentCard({ name, score, status }: Props): import("react/jsx-runtime").JSX.Element;
export {};
