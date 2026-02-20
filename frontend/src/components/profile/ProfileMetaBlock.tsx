import type { StudentDetail } from "types/api";
import RiskBadge from "./RiskBadge";

interface Props {
    student: StudentDetail;
}

export default function ProfileMetaBlock({ student }: Props) {
    const decliningWeeks = student.decliningWeeks ?? (student.pulseTrend < 0 ? 1 : 0);

    return (
        <>
            <p className="profile-meta">
                {student.year ?? "Student"} · {student.major ?? "Major not set"} · {student.creditHours ?? 0} credit hours
                <br />
                Advisor: {student.advisorName ?? "Advisor"} · {student.department ?? "Department"}
                <br />
                Courses: {(student.courses ?? [student.course]).join(", ")}
            </p>
            <div className="risk-row">
                <RiskBadge riskLevel={student.riskLevel} />
                <span className="risk-sub">{decliningWeeks} consecutive weeks declining</span>
            </div>
        </>
    );
}
