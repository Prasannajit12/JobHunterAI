import CircularProgress from "./CircularProgress";

function ATSScore({ ats }) {

    if (!ats) return null;

    const score = ats.score;

    let color = "#ef4444";
    let level = "Needs Improvement";

    if (score >= 70) {
        color = "#22c55e";
        level = "Excellent";
    }
    else if (score >= 40) {
        color = "#facc15";
        level = "Good";
    }

    return (

        <div
            style={{
                background: "#1e293b",
                padding: "30px",
                borderRadius: "18px",
                color: "white",
                marginTop: "30px",
                textAlign: "center",
                boxShadow: "0 15px 35px rgba(0,0,0,0.35)"
            }}
        >

            <h2
                style={{
                    marginBottom: "30px"
                }}
            >
                📊 ATS Resume Score
            </h2>

            <CircularProgress score={score} />

            <h2
                style={{
                    marginTop: "25px",
                    color
                }}
            >
                {level}
            </h2>

            <p
                style={{
                    color: "#94a3b8",
                    marginTop: "10px"
                }}
            >
                Matched Skills
            </p>

            <h3
                style={{
                    marginTop: "10px"
                }}
            >
                {ats.matched_count} / {ats.total_required}
            </h3>

        </div>

    );

}

export default ATSScore;