import { useState } from "react";

import ResumeUpload from "./ResumeUpload";
import ResumeAnalysis from "./ResumeAnalysis";
import ATSScore from "./ATSScore";

function ResumeDashboard() {

    const [profile, setProfile] = useState(null);
    const [analysis, setAnalysis] = useState(null);
    const [ats, setATS] = useState(null);

    function handleUploadSuccess(data) {

        console.log("UPLOAD RESPONSE:", data);

        setProfile(data.profile);
        setATS(data.ats);
        setAnalysis(data.analysis);

    }

    return (

        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "30px"
            }}
        >

            {/* Upload Resume */}

            <ResumeUpload
                onUploadSuccess={handleUploadSuccess}
            />

            {/* AI Generated Profile */}

            {

                profile && (

                    <div
                        style={{
                            background: "#1e293b",
                            borderRadius: "20px",
                            padding: "30px",
                            color: "white",
                            boxShadow: "0 15px 35px rgba(0,0,0,.35)"
                        }}
                    >

                        {/* Header */}

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: "30px"
                            }}
                        >

                            <div
                                style={{
                                    width: "90px",
                                    height: "90px",
                                    borderRadius: "50%",
                                    background: "#2563eb",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    fontSize: "38px",
                                    fontWeight: "bold",
                                    marginRight: "20px"
                                }}
                            >
                                {profile.name.charAt(0)}
                            </div>

                            <div>

                                <h2
                                    style={{
                                        margin: 0,
                                        fontSize: "30px"
                                    }}
                                >
                                    {profile.name}
                                </h2>

                                <p
                                    style={{
                                        color: "#94a3b8",
                                        marginTop: "8px",
                                        fontSize: "17px"
                                    }}
                                >
                                    Technical Support Engineer
                                </p>

                            </div>

                        </div>

                        {/* Info Cards */}

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(2,1fr)",
                                gap: "20px",
                                marginBottom: "30px"
                            }}
                        >

                            <div
                                style={{
                                    background: "#0f172a",
                                    padding: "20px",
                                    borderRadius: "15px"
                                }}
                            >
                                <h4>📍 Location</h4>

                                <p>{profile.preferred_location}</p>

                            </div>

                            <div
                                style={{
                                    background: "#0f172a",
                                    padding: "20px",
                                    borderRadius: "15px"
                                }}
                            >
                                <h4>💼 Experience</h4>

                                <p>{profile.experience} Years</p>

                            </div>

                            <div
                                style={{
                                    background: "#0f172a",
                                    padding: "20px",
                                    borderRadius: "15px"
                                }}
                            >
                                <h4>💰 Expected Salary</h4>

                                <p>

                                    ₹{profile.expected_salary.toLocaleString()}

                                </p>

                            </div>

                            <div
                                style={{
                                    background: "#0f172a",
                                    padding: "20px",
                                    borderRadius: "15px"
                                }}
                            >
                                <h4>⏳ Notice Period</h4>

                                <p>{profile.notice_period}</p>

                            </div>

                        </div>

                        {/* Skills */}

                        <h3
                            style={{
                                marginBottom: "15px"
                            }}
                        >
                            🚀 Skills
                        </h3>

                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "12px"
                            }}
                        >

                            {

                                profile.skills.map((skill, index) => (

                                    <span

                                        key={index}

                                        style={{

                                            background: "#2563eb",

                                            padding: "10px 18px",

                                            borderRadius: "25px",

                                            fontWeight: "600",

                                            fontSize: "15px"

                                        }}

                                    >

                                        {skill}

                                    </span>

                                ))

                            }

                        </div>

                    </div>

                )

            }

            {/* ATS Score */}

            <ATSScore ats={ats} />

            {/* AI Resume Analysis */}

            <ResumeAnalysis analysis={analysis} />

        </div>

    );

}

export default ResumeDashboard;