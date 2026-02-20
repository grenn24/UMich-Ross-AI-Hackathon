export default function OraclePanel() {
    return (
        <div className="oracle-panel">
            <div className="oracle-hdr">
                <div>
                    <span className="oracle-badge">Oracle Digital Assistant</span>
                    <div className="oracle-name">Generated Outreach Email</div>
                    <div className="oracle-desc">Built from strongest academic signal + current stress markers</div>
                </div>
            </div>

            <div className="email-box">
                <div className="email-to">To: maya.chen@umich.edu · Subject: Checking in</div>
                Hi Maya, I was looking back at your behavioral economics discussion post. Your point on loss aversion
                was one of the strongest ideas in the class. I know this week is heavy, so feel free to drop by office
                hours Thursday from 2-4pm.
            </div>

            <div className="btn-row">
                <button className="btn-sm btn-primary">Edit & Send</button>
                <button className="btn-sm">Regenerate</button>
            </div>
        </div>
    );
}
