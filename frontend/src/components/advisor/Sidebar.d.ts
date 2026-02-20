interface Props {
    filter: string;
    onFilterChange: (value: string) => void;
    counts: {
        all: number;
        critical: number;
        high: number;
        watch: number;
        stable: number;
    };
}
export default function Sidebar({ filter, onFilterChange, counts }: Props): import("react/jsx-runtime").JSX.Element;
export {};
