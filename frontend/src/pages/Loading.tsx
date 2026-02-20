
const Loading = () => {
    return (
        <section className="loader-shell" role="status" aria-live="polite">
            <div className="loader-card">
                <div className="loader-orbit" aria-hidden="true">
                    <span className="orbit orbit-a" />
                    <span className="orbit orbit-b" />
                    <span className="orbit orbit-c" />
                    <span className="orbit-core" />
                </div>
                <p className="loader-title">Loading PulseAI</p>
                <p className="loader-sub">Syncing student wellness signals...</p>
                <div className="loader-track" aria-hidden="true">
                    <span className="loader-fill" />
                </div>
            </div>
        </section>
    );
};

export default Loading;
