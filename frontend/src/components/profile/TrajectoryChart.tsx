export default function TrajectoryChart() {
    return (
        <div className="chart-panel">
            <h3 className="panel-title">14-Week Pressure vs Resilience</h3>
            <svg className="chart" viewBox="0 0 820 150" height="150" role="img" aria-label="Trajectory chart">
                <line x1="0" y1="30" x2="820" y2="30" stroke="#e7eaf0" />
                <line x1="0" y1="75" x2="820" y2="75" stroke="#e7eaf0" />
                <line x1="0" y1="120" x2="820" y2="120" stroke="#e7eaf0" />
                <polyline
                    fill="none"
                    stroke="#d93025"
                    strokeWidth="2"
                    points="20,110 95,104 170,98 245,90 320,78 395,62 470,48 545,39 620,31 695,26 800,22"
                />
                <polyline
                    fill="none"
                    stroke="#1a7f4b"
                    strokeWidth="2"
                    points="20,42 95,46 170,51 245,57 320,67 395,80 470,92 545,101 620,110 695,117 800,122"
                />
            </svg>
        </div>
    );
}
