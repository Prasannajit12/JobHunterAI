function ResumeAnalysis({ analysis }) {

    if (!analysis) {
        return null;
    }

    return (

        <div
            style={{
                background: "#0f172a",
                padding: "25px",
                borderRadius: "18px",
                marginTop: "30px",
                color: "white",
                border: "1px solid #334155",
                boxShadow: "0 10px 30px rgba(0,0,0,0.35)"
            }}
        >

            <h2
                style={{
                    marginBottom: "25px",
                    fontSize: "28px",
                    color: "#38bdf8"
                }}
            >
                🤖 AI Resume Analysis
            </h2>

            {/* Strengths */}

            <div style={{ marginBottom: "25px" }}>

                <h3 style={{ color: "#22c55e" }}>
                    💪 Strengths
                </h3>

                {

                    analysis.strengths.map((item, index) => (

                        <p key={index}>
                            ✅ {item}
                        </p>

                    ))

                }

            </div>

            {/* Weaknesses */}

            <div style={{ marginBottom: "25px" }}>

                <h3 style={{ color: "#ef4444" }}>
                    ⚠ Missing Skills
                </h3>

                {

                    analysis.weaknesses.map((item, index) => (

                        <p key={index}>
                            ❌ {item}
                        </p>

                    ))

                }

            </div>

            {/* Suggestions */}

            <div>

                <h3 style={{ color: "#facc15" }}>
                    💡 AI Suggestions
                </h3>

                {

                    analysis.suggestions.map((item, index) => (

                        <p key={index}>
                            ⭐ {item}
                        </p>

                    ))

                }

            </div>

        </div>

    );

}

export default ResumeAnalysis;