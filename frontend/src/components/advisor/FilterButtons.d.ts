interface Props {
    active: string;
    onChange: (v: string) => void;
    counts: {
        all: number;
        critical: number;
        high: number;
        watch: number;
        stable: number;
    };
}
export default function FilterButtons({ active, onChange, counts }: Props): import("react/jsx-runtime").JSX.Element;
export {};
