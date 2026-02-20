const CoursePressure = () => {
    return (
        <div className="viz-panel">
            <h3 className="panel-title">Course Pressure Intelligence</h3>
            <div className="course-item">
                <div className="course-nm">ECON 401 - Advanced Macro</div>
                <div className="course-bar">
                    <div className="course-fill fill-red" style={{ width: "87%" }} />
                </div>
                <div className="course-val critical-txt">87</div>
            </div>
            <div className="course-item">
                <div className="course-nm">ECON 450 - Behavioral Econ</div>
                <div className="course-bar">
                    <div className="course-fill fill-orange" style={{ width: "71%" }} />
                </div>
                <div className="course-val warning-txt">71</div>
            </div>
            <div className="course-item">
                <div className="course-nm">POLISCI 201 - Political Economy</div>
                <div className="course-bar">
                    <div className="course-fill fill-green" style={{ width: "34%" }} />
                </div>
                <div className="course-val stable-txt">34</div>
            </div>

            <div className="rec-box">
                <strong>PulseAI Recommendation:</strong> Move ECON 401 Assignment 3 by five days to reduce overlapping
                deadline pressure for 12 at-risk students.
                <div className="rec-impact">Estimated impact: High Risk to Watch for 12 students</div>
            </div>
        </div>
    );
};

export default CoursePressure;
