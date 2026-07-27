import { useRef, useState } from "react";
import { uploadResume } from "../services/api";

function ResumeUpload({ onUploadSuccess }) {

    const inputRef = useRef(null);

    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [dragging, setDragging] = useState(false);

    const openPicker = () => {
        inputRef.current.click();
    };

    function handleFile(file) {

        if (!file) return;

        if (file.type !== "application/pdf") {
            alert("Please upload a PDF Resume.");
            return;
        }

        setSelectedFile(file);
    }

    function handleDrop(e) {

        e.preventDefault();

        setDragging(false);

        const file = e.dataTransfer.files[0];

        handleFile(file);

    }

    async function handleUpload() {

        if (!selectedFile) {
            alert("Please choose a resume first.");
            return;
        }

        try {

            setUploading(true);

            const result = await uploadResume(selectedFile);

            if (onUploadSuccess) {
                onUploadSuccess(result);
            }

            alert("Resume analyzed successfully 🎉");

        }

        catch (err) {

            console.log(err);

            alert("Upload Failed");

        }

        finally {

            setUploading(false);

        }

    }

    return (

        <div
            style={{
                background: "#1e293b",
                borderRadius: "20px",
                padding: "30px",
                color: "white",
                boxShadow: "0 20px 40px rgba(0,0,0,.35)"
            }}
        >

            <h2
                style={{
                    marginBottom: "25px",
                    fontSize: "30px"
                }}
            >
                📄 Resume Analyzer
            </h2>

            <div

                onClick={openPicker}

                onDragOver={(e) => {

                    e.preventDefault();

                    setDragging(true);

                }}

                onDragLeave={() => setDragging(false)}

                onDrop={handleDrop}

                style={{

                    border: dragging
                        ? "3px dashed #22c55e"
                        : "3px dashed #3b82f6",

                    borderRadius: "18px",

                    padding: "60px",

                    textAlign: "center",

                    cursor: "pointer",

                    transition: ".3s",

                    background: dragging
                        ? "#0f172a"
                        : "#1e293b"

                }}

            >

                <input

                    ref={inputRef}

                    type="file"

                    accept=".pdf"

                    hidden

                    onChange={(e) =>

                        handleFile(e.target.files[0])

                    }

                />

                <div
                    style={{
                        fontSize: "60px"
                    }}
                >
                    📄
                </div>

                <h2>

                    Drag & Drop Resume

                </h2>

                <p
                    style={{
                        color: "#94a3b8"
                    }}
                >
                    or click here to browse
                </p>

            </div>

            {

                selectedFile &&

                <div

                    style={{

                        marginTop: "25px",

                        background: "#0f172a",

                        padding: "20px",

                        borderRadius: "15px",

                        display: "flex",

                        justifyContent: "space-between",

                        alignItems: "center"

                    }}

                >

                    <div>

                        <h3
                            style={{
                                margin: 0
                            }}
                        >
                            ✅ {selectedFile.name}
                        </h3>

                        <small
                            style={{
                                color: "#94a3b8"
                            }}
                        >
                            {(selectedFile.size / 1024).toFixed(1)} KB
                        </small>

                    </div>

                </div>

            }

            <button

                onClick={handleUpload}

                disabled={uploading}

                style={{

                    marginTop: "30px",

                    width: "100%",

                    background: uploading
                        ? "#475569"
                        : "#2563eb",

                    color: "white",

                    padding: "18px",

                    border: "none",

                    borderRadius: "15px",

                    fontSize: "18px",

                    cursor: "pointer",

                    transition: ".3s"

                }}

            >

                {

                    uploading

                        ? "Analyzing Resume..."

                        : "🚀 Analyze Resume"

                }

            </button>

        </div>

    );

}

export default ResumeUpload;