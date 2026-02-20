interface Props {
    number: number;
    label: string;
    type?: "critical" | "warning" | "stable";
}
export default function StatCard({ number, label, type }: Props): import("react/jsx-runtime").JSX.Element;
export {};
