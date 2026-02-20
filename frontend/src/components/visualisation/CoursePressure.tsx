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
            <h3 className="panel-title">Course Pressure — ECON Department · Week 8</h3>
            {topCourses.map((course) => {
                const cls = course.peakPressure >= 80 ? "fill-red" : course.peakPressure >= 60 ? "fill-orange" : "fill-green";
                const txtCls = course.peakPressure >= 80 ? "critical-txt" : course.peakPressure >= 60 ? "warning-txt" : "stable-txt";
                const badgeCls = course.peakPressure >= 80 ? "rb-critical" : course.peakPressure >= 60 ? "rb-warning" : course.peakPressure >= 45 ? "rb-watch" : "rb-stable";
                const badgeText = course.peakPressure >= 80 ? "Cluster" : course.peakPressure >= 60 ? "High" : course.peakPressure >= 45 ? "Watch" : "OK";
                return (
                    <div className="course-item" key={course.courseId}>
                        <div className="course-nm">{course.name}</div>
                        <div className="course-bar">
                            <div className={`course-fill ${cls}`} style={{ width: `${course.peakPressure}%` }} />
                        </div>
                        <div className={`course-val ${txtCls}`}>{course.peakPressure}</div>
                        <span className={`rbadge ${badgeCls} course-badge`}>{badgeText}</span>
                    </div>
                );
            })}

            {recommendation && (
                <div className="rec-box">
                    <strong>Oracle Recommendation:</strong> ECON 401 has 3 deadlines converging Nov 14. Move Assignment 3 by 5 days → pressure drops 34 points. Affects 12 at-risk students.
                    <div className="rec-impact">→ Estimated impact: 12 students move from High Risk to Watch</div>
                    <div className="btn-row">
                        <button className="btn-sm btn-primary">Notify Prof. Johnson</button>
                        <button className="btn-sm">View history</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CoursePressure;
