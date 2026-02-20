const Heatmap = () => {
    const cells = Array.from({ length: 14 * 8 }, (_, idx) => {
        const wave = (idx % 14) + 1;
        if (wave === 8) return "hm-red";
        if (wave > 5 && wave < 9) return "hm-orange";
        if (wave > 9) return "hm-green";
        return "hm-yellow";
    });

    return (
        <div className="viz-panel">
            <h3 className="panel-title">Student Wellness Heatmap</h3>
            <div className="hm-labels">
                {Array.from({ length: 14 }, (_, i) => (
                    <span key={i} className="hm-lbl">
                        W{i + 1}
                    </span>
                ))}
            </div>
            <div className="hm-grid">
                {cells.map((tone, i) => (
                    <span key={i} className={`hm-cell ${tone}`} />
                ))}
            </div>
        </div>
    );
};

export default Heatmap;
