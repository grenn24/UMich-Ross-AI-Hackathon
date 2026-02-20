import type { StudentDetail } from "types/api";
import ProfileMetaBlock from "./ProfileMetaBlock";

interface Props {
    student: StudentDetail;
}

export default function ProfileHeader({ student }: Props) {
    const initials = student.name
        .split(" ")
        .map((name) => name[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
    const trendAmount = Math.abs(student.pulseTrend);
    const baseline = student.baselinePulse ?? Math.max(student.pulseScore + trendAmount, student.pulseScore);

    return (
        <div className="profile-top">
            <div className="profile-id">
                <div className="profile-av">{initials}</div>
                <div>
                    <h2 className="profile-name">{student.name}</h2>
                    <ProfileMetaBlock student={student} />
                </div>
            </div>

            <div className="big-score-box">
                <div className="big-score-lbl">Pulse Score</div>
                <div className="big-score-num">{student.pulseScore}</div>
                <div className="big-score-trend">↓ {trendAmount}% from baseline ({baseline})</div>
            </div>
        </div>
    );
}
