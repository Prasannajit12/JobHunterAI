import { useState } from "react";
import { uploadResume } from "../services/api";

function ResumeUpload({ onUploadSuccess }) {

    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    async function handleUpload() {

        if (!selectedFile) {
            alert("Please select a PDF resume.");
            return;
        }

        try {

            setUploading(true);

            const result = await uploadResume(selectedFile);

            alert("✅ Resume uploaded successfully!");

            if (onUploadSuccess) {
                onUploadSuccess(result);
            }

        } catch (error) {

            console.error(error);
            alert("Upload failed.");

        } finally {

            setUploading(false);

        }

    }

    return (

        <div
            style={{
                background: "#1e293b",
                padding: "20px",
                borderRadius: "12px",
                marginBottom: "20px"
            }}
        >

            <h2 style={{ color: "white" }}>
                📄 Upload Resume
            </h2>

            <input
                type="file"
                accept=".pdf"
                onChange={(e) => setSelectedFile(e.target.files[0])}
            />

            <br />
            <br />

            <button
                onClick={handleUpload}
                disabled={uploading}
                style={{
                    background: "#16a34a",
                    color: "white",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer"
                }}
            >
                {uploading ? "Uploading..." : "Upload Resume"}
            </button>

        </div>

    );

}

export default ResumeUpload;