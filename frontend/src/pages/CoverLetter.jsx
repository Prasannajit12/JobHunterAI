import { useState } from "react";
import { jsPDF } from "jspdf";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

// Ensure this path matches your actual project structure
import { generateCoverLetter, getProfile } from "../services/api";

const CoverLetter = () => {
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const showSuccess = (message) => {
    setError("");
    setSuccess(message);
    setTimeout(() => {
      setSuccess("");
    }, 2500);
  };

  const handleGenerate = async () => {
    if (!company || !jobTitle || !jobDescription) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");
      setCoverLetter("");

      const profile = await getProfile();

      const payload = {
        company,
        job_title: jobTitle,
        job_description: jobDescription,
        applicant_name: profile.name,
        experience: profile.experience,
        skills: profile.skills,
      };

      const result = await generateCoverLetter(payload);

      setCoverLetter(result.cover_letter);
      showSuccess("Cover Letter Generated Successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to generate cover letter.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!coverLetter) return;

    try {
      await navigator.clipboard.writeText(coverLetter);
      showSuccess("Copied to Clipboard!");
    } catch (err) {
      console.error(err);
      setError("Failed to copy to clipboard.");
    }
  };

  const downloadPDF = () => {
    if (!coverLetter) return;

    try {
      const doc = new jsPDF();
      doc.setFont("times", "normal");
      doc.setFontSize(12);

      const lines = doc.splitTextToSize(coverLetter, 180);
      let y = 20;

      lines.forEach((line) => {
        if (y > 280) {
          doc.addPage();
          y = 20;
        }
        doc.text(line, 15, y);
        y += 7;
      });

      doc.save("Cover_Letter.pdf");
      showSuccess("PDF Downloaded!");
    } catch (err) {
      console.error(err);
      setError("Failed to generate PDF.");
    }
  };

  const downloadDOCX = async () => {
    if (!coverLetter) return;

    const paragraphs = coverLetter.split("\n").map(
      (line) =>
        new Paragraph({
          children: [
            new TextRun({
              text: line,
              size: 24,
            }),
          ],
        })
    );

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: paragraphs,
        },
      ],
    });

    try {
      const blob = await Packer.toBlob(doc);
      saveAs(blob, "Cover_Letter.docx");
      showSuccess("DOCX Downloaded!");
    } catch (err) {
      console.error(err);
      setError("Failed to generate DOCX.");
    }
  };

  const emailCoverLetter = () => {
    if (!coverLetter) return;

    const subject = encodeURIComponent(`Application for ${jobTitle}`);
    const body = encodeURIComponent(coverLetter);

    window.location.href = `mailto:?subject=${subject}&body=${body}`;

    showSuccess("Opening your email client...");
  };

  const printCoverLetter = () => {
    if (!coverLetter) return;

    const printWindow = window.open("", "_blank");

    if (!printWindow) {
      setError("Unable to open print window. Please check your popup blocker.");
      return;
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>Cover Letter</title>
          <style>
            body {
              font-family: 'Times New Roman', Times, serif;
              padding: 40px;
              line-height: 1.8;
              font-size: 16px;
            }
          </style>
        </head>
        <body>
          <pre style="white-space: pre-wrap; font-family: 'Times New Roman', serif;">
${coverLetter}
          </pre>
        </body>
      </html>
    `);

    printWindow.document.close();

    printWindow.onload = () => {
      printWindow.print();
      printWindow.close();
      showSuccess("Print Window Opened!");
    };
  };

  // Extract shared Tailwind classes for consistent UI and animations
  const actionButtonBaseClass = 
    "flex items-center gap-2 rounded-lg px-4 py-2 font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-8">
      <div className="max-w-6xl mx-auto bg-slate-900/90 rounded-3xl shadow-2xl border border-slate-700 p-8">
        <h1 className="text-4xl font-bold text-center mb-2">
          🤖 AI Cover Letter Generator
        </h1>

        <p className="text-center text-gray-400 mb-8">
          Generate a professional ATS-friendly cover letter in seconds.
        </p>

        {success && (
          <div className="mb-6 rounded-xl bg-green-600 text-white px-5 py-3 transition-all">
            {success}
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-xl bg-red-600 text-white px-5 py-3 transition-all">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block mb-2 font-semibold">Company Name</label>
            <input
              type="text"
              placeholder="Microsoft"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Job Title</label>
            <input
              type="text"
              placeholder="Technical Support Engineer"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Job Description</label>
            <textarea
              rows={10}
              placeholder="Paste the complete Job Description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className={`w-full flex justify-center items-center gap-2 rounded-xl py-4 text-lg font-bold transition-all duration-200 ${
              loading
                ? "bg-blue-800 cursor-not-allowed opacity-80"
                : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.98]"
            }`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Generating Cover Letter...
              </>
            ) : (
              "🚀 Generate Cover Letter"
            )}
          </button>

          {coverLetter && (
            <>
              <div className="mt-10 flex flex-wrap justify-between items-center gap-4">
                <h2 className="text-2xl font-bold">Generated Cover Letter</h2>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={copyToClipboard}
                    disabled={!coverLetter}
                    className={`${actionButtonBaseClass} bg-green-600 hover:bg-green-700`}
                  >
                    📋 Copy
                  </button>

                  <button
                    onClick={downloadPDF}
                    disabled={!coverLetter}
                    className={`${actionButtonBaseClass} bg-red-600 hover:bg-red-700`}
                  >
                    📄 PDF
                  </button>

                  <button
                    onClick={downloadDOCX}
                    disabled={!coverLetter}
                    className={`${actionButtonBaseClass} bg-indigo-600 hover:bg-indigo-700`}
                  >
                    📝 DOCX
                  </button>

                  <button
                    onClick={printCoverLetter}
                    disabled={!coverLetter}
                    className={`${actionButtonBaseClass} bg-yellow-500 hover:bg-yellow-600 text-black`}
                  >
                    🖨 Print
                  </button>

                  <button
                    onClick={emailCoverLetter}
                    disabled={!coverLetter}
                    className={`${actionButtonBaseClass} bg-cyan-600 hover:bg-cyan-700`}
                  >
                    📧 Email
                  </button>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-slate-300 bg-white p-8 shadow-lg">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-900">
                    📄 Cover Letter Preview
                  </h3>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                    ATS Friendly
                  </span>
                </div>

                <div className="whitespace-pre-wrap rounded-xl bg-gray-50 p-6 font-serif text-[16px] leading-8 text-gray-800 border">
                  {coverLetter}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoverLetter;