import { useState } from "react";

import ResumeUpload from "./ResumeUpload";
import ResumeAnalysis from "./ResumeAnalysis";

function ResumeDashboard() {

    const [profile, setProfile] = useState(null);
    const [analysis, setAnalysis] = useState(null);

    function handleUploadSuccess(data) {

        // Backend returns profile and ats
        setProfile(data.profile);
        setAnalysis(data.ats);

    }

    return (

        <div>

            <ResumeUpload
                onUploadSuccess={handleUploadSuccess}
            />

            {

                profile && (

                    <div
                        style={{
                            background: "#1e293b",
                            padding: "20px",
                            borderRadius: "10px",
                            marginBottom: "20px",
                            color: "white",
                            boxShadow: "0px 4px 10px rgba(0,0,0,0.3)"
                        }}
                    >

                        <h2
                            style={{
                                marginBottom: "20px"
                            }}
                        >
                            👤 AI Generated Profile
                        </h2>

                        <p>
                            <strong>Name:</strong> {profile.name}
                        </p>

                        <p>
                            <strong>Experience:</strong> {profile.experience} Years
                        </p>

                        <p>
                            <strong>Preferred Location:</strong> {profile.preferred_location}
                        </p>

                        <p>
                            <strong>Expected Salary:</strong> ₹{profile.expected_salary}
                        </p>

                        <p>
                            <strong>Notice Period:</strong> {profile.notice_period}
                        </p>

                        <h3
                            style={{
                                marginTop: "20px"
                            }}
                        >
                            Skills
                        </h3>

                        <div
                            style={{
                                marginTop: "10px"
                            }}
                        >

                            {

                                profile.skills.map((skill, index) => (

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

                    </div>

                )

            }

            {

                analysis && (

                    <ResumeAnalysis
                        analysis={analysis}
                    />

                )

            }

        </div>

    );

}

export default ResumeDashboard;