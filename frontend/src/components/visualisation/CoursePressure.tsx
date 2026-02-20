import { useEffect, useMemo, useState } from "react";
import { getCourses } from "utilities/pulseApi";
import type { CourseSummary } from "types/api";

const CoursePressure = () => {
    const [courses, setCourses] = useState<CourseSummary[]>([]);

    useEffect(() => {
        let mounted = true;
        const load = async () => {
            try {
                const response = await getCourses();
                if (mounted) setCourses(response);
            } catch {
                if (mounted) setCourses([]);
            }
        };
        load();
        return () => {
            mounted = false;
        };
    }, []);

    const topCourses = useMemo(
        () =>
            [...courses]
                .sort((a, b) => b.peakPressure - a.peakPressure)
                .slice(0, 3),
        [courses]
    );

    const recommendation = useMemo(
        () => topCourses.find((course) => course.deadlineClusterDetected) ?? topCourses[0],
        [topCourses]
    );

    return (
        <div className="viz-panel">
            <h3 className="panel-title">Course Pressure Intelligence</h3>
            {topCourses.map((course) => {
                const cls = course.peakPressure >= 80 ? "fill-red" : course.peakPressure >= 60 ? "fill-orange" : "fill-green";
                const txtCls = course.peakPressure >= 80 ? "critical-txt" : course.peakPressure >= 60 ? "warning-txt" : "stable-txt";
                return (
                    <div className="course-item" key={course.courseId}>
                        <div className="course-nm">{course.name}</div>
                        <div className="course-bar">
                            <div className={`course-fill ${cls}`} style={{ width: `${course.peakPressure}%` }} />
                        </div>
                        <div className={`course-val ${txtCls}`}>{course.peakPressure}</div>
                    </div>
                );
            })}

            {recommendation && (
                <div className="rec-box">
                    <strong>PulseAI Recommendation:</strong> Review week {recommendation.peakWeek} load in {recommendation.name}
                    {" "}to reduce pressure clustering.
                    <div className="rec-impact">Estimated impact: reduce peak pressure from {recommendation.peakPressure}</div>
                </div>
            )}
        </div>
    );
};

export default CoursePressure;
