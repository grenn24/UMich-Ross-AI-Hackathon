export default function ProfileHeader() {
    return (
        <div className="profile-top">
            <div className="profile-id">
                <div className="profile-av">MC</div>
                <div>
                    <h2 className="profile-name">Maya Chen</h2>
                    <p className="profile-meta">Ross BBA · Behavioral Economics · Advisor: Dr. Sarah Chen</p>
                </div>
            </div>

            <div className="big-score-box">
                <div className="big-score-lbl">Pulse Score</div>
                <div className="big-score-num">19</div>
                <div className="big-score-trend">Down 21 this week</div>
            </div>
        </div>
    );
}
