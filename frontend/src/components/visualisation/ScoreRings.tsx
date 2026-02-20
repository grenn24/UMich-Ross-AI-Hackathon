const ScoreRings = () => {
    return (
        <div className="viz-panel full-col">
            <h3 className="panel-title">University Wellness Distribution</h3>
            <div className="stat-strip">
                <div className="stat-box">
                    <div className="stat-num critical-txt">200</div>
                    <div className="stat-lbl">Critical this week</div>
                </div>
                <div className="stat-box">
                    <div className="stat-num warning-txt">1,100</div>
                    <div className="stat-lbl">High risk</div>
                </div>
                <div className="stat-box">
                    <div className="stat-num watch-txt">3,400</div>
                    <div className="stat-lbl">Watch list</div>
                </div>
                <div className="stat-box">
                    <div className="stat-num stable-txt">15,300</div>
                    <div className="stat-lbl">Stable</div>
                </div>
            </div>
        </div>
    );
};

export default ScoreRings;
