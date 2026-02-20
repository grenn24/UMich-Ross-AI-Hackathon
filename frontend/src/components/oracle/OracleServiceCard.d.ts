interface Row {
    key: string;
    value: string;
    tone?: "critical" | "warning" | "stable" | "accent" | "neutral";
}
interface Props {
    badge: string;
    title: string;
    description: string;
    inputLabel?: string;
    input?: string;
    outputsLabel?: string;
    outputs?: Row[];
    showProcessing?: boolean;
    processingLabel?: string;
    formulaText?: string;
    splitTopLabel?: string;
    splitTopRows?: Row[];
    splitBottomLabel?: string;
    splitBottomRows?: Row[];
    actions?: string[];
}
export default function OracleServiceCard({ badge, title, description, inputLabel, input, outputsLabel, outputs, showProcessing, processingLabel, formulaText, splitTopLabel, splitTopRows, splitBottomLabel, splitBottomRows, actions, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
