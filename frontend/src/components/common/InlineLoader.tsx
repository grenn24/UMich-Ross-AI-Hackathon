interface Props {
    label?: string;
    className?: string;
}

export default function InlineLoader({ label = "Loading...", className = "" }: Props) {
    return (
        <div className={`inline-loader ${className}`.trim()} role="status" aria-live="polite">
            <span className="inline-loader-dot" />
            <span className="inline-loader-dot" />
            <span className="inline-loader-dot" />
            <span className="inline-loader-label">{label}</span>
        </div>
    );
}
