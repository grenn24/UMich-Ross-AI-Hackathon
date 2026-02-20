interface Props {
    badge: string;
    title: string;
    description: string;
    input: string;
    outputs: Array<{
        key: string;
        value: string;
        tone?: "critical" | "warning" | "stable" | "accent";
    }>;
}
export default function OracleServiceCard({ badge, title, description, input, outputs }: Props): import("react/jsx-runtime").JSX.Element;
export {};
