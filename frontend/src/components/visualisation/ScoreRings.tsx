const ScoreRings = () => {
    const counts = {
        critical: 200,
        high: 1100,
        watch: 3400,
        stable: 15300,
    };

    return (
        <div className="viz-panel full-col">
            <h3 className="panel-title">University Wellness Distribution</h3>
            <div className="stat-strip">
                <div className="stat-box">
                    <div className="stat-num critical-txt">{counts.critical}</div>
                    <div className="stat-lbl">Critical this week</div>
                </div>
                <div className="stat-box">
                    <div className="stat-num warning-txt">{counts.high}</div>
                    <div className="stat-lbl">High risk</div>
                </div>
                <div className="stat-box">
                    <div className="stat-num watch-txt">{counts.watch}</div>
                    <div className="stat-lbl">Watch list</div>
                </div>
                <div className="stat-box">
                    <div className="stat-num stable-txt">{counts.stable}</div>
                    <div className="stat-lbl">Stable</div>
                </div>
            </div>
        </div>
    );
};

export default ScoreRings;
