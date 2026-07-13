function ResumeAnalysis({ analysis }) {

    if (!analysis) {
        return null;
    }

    return (

        <div
            style={{
                background: "#1e293b",
                padding: "25px",
                borderRadius: "15px",
                marginTop: "20px",
                color: "white"
            }}
        >

            <h2>🤖 AI Resume Analysis</h2>

            <br />

            <h3>

                ATS Score

            </h3>

            <div
                style={{
                    width: "100%",
                    height: "22px",
                    background: "#374151",
                    borderRadius: "20px",
                    overflow: "hidden"
                }}
            >

                <div
                    style={{
                        width: `${analysis.score}%`,
                        height: "100%",
                        background: "#22c55e",
                        transition: "0.5s"
                    }}
                />

            </div>

            <h2
                style={{
                    color: "#22c55e",
                    marginTop: "15px"
                }}
            >

                {analysis.score}%

            </h2>

            <hr />

            <h3>

                ✅ Matched Skills

            </h3>

            <p>

                {analysis.matched_count}

                {" "}

                of

                {" "}

                {analysis.total_required}

                {" "}

                skills matched.

            </p>

            <br />

            {

                analysis.matched_skills.map((skill, index) => (

                    <span

                        key={index}

                        style={{
                            background: "#2563eb",
                            padding: "8px 15px",
                            borderRadius: "20px",
                            marginRight: "10px",
                            marginBottom: "10px",
                            display: "inline-block"
                        }}

                    >

                        {skill}

                    </span>

                ))

            }

        </div>

    );

}

export default ResumeAnalysis;