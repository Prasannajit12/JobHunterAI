import { saveApplication } from "../services/api";

function JobCard({ job }) {

    const skills = job.skills || [];
    const matchedSkills = job.matched_skills || [];
    const missingSkills = job.missing_skills || [];

    const workType =
        job.work_mode ||
        (job.remote ? "Remote" : "On-site");

    let scoreColor = "text-red-400";

    if (job.score >= 80) {
        scoreColor = "text-green-400";
    }
    else if (job.score >= 60) {
        scoreColor = "text-yellow-400";
    }

    async function handleApply() {

        try {

            await saveApplication(job);

            alert("✅ Application Saved Successfully");

            if (job.url) {
                window.open(job.url, "_blank");
            }

        }

        catch (error) {

            console.error(error);

            alert("❌ Failed to save application");

        }

    }

    return (

        <div className="bg-slate-800 rounded-2xl shadow-xl p-6 hover:scale-[1.02] transition-all duration-300">

            {/* Header */}

            <div className="flex justify-between items-start">

                <div>

                    <h2 className="text-2xl font-bold">

                        🏢 {job.company}

                    </h2>

                    <p className="text-gray-400 mt-2">

                        {job.title}

                    </p>

                </div>

                <div
                    className={`px-4 py-2 rounded-xl font-bold ${
                        workType === "Remote"
                            ? "bg-green-600"
                            : workType === "Hybrid"
                            ? "bg-yellow-500 text-black"
                            : "bg-blue-600"
                    }`}
                >

                    {workType}

                </div>

            </div>

            <hr className="my-5 border-slate-600" />

            {/* AI Score */}

            <div className="mb-6">

                <p className="text-gray-400">

                    🤖 AI Match Score

                </p>

                <h2 className={`text-4xl font-bold ${scoreColor}`}>

                    {job.score}%

                </h2>

            </div>

            {/* Job Details */}

            <div className="grid grid-cols-2 gap-6">

                <div>

                    <p className="text-gray-400">

                        📍 Location

                    </p>

                    <h3>

                        {job.location}

                    </h3>

                </div>

                <div>

                    <p className="text-gray-400">

                        💰 Salary

                    </p>

                    <h3 className="text-green-400">

                        {job.salary}

                    </h3>

                </div>

                <div>

                    <p className="text-gray-400">

                        💼 Experience

                    </p>

                    <h3>

                        {job.experience} Years

                    </h3>

                </div>

                <div>

                    <p className="text-gray-400">

                        🌍 Work Mode

                    </p>

                    <h3>

                        {workType}

                    </h3>

                </div>

            </div>

            {/* Required Skills */}

            <div className="mt-6">

                <h3 className="font-bold mb-3">

                    🛠 Required Skills

                </h3>

                <div className="flex flex-wrap gap-2">

                    {

                        skills.map((skill, index) => (

                            <span

                                key={index}

                                className="bg-blue-600 px-3 py-1 rounded-full text-sm"

                            >

                                {skill}

                            </span>

                        ))

                    }

                </div>

            </div>

            {/* Matched Skills */}

            <div className="mt-6">

                <h3 className="font-bold text-green-400 mb-3">

                    ✅ Matched Skills

                </h3>

                <div className="flex flex-wrap gap-2">

                    {

                        matchedSkills.length > 0 ?

                            matchedSkills.map((skill, index) => (

                                <span

                                    key={index}

                                    className="bg-green-600 px-3 py-1 rounded-full text-sm"

                                >

                                    {skill}

                                </span>

                            ))

                            :

                            <span className="text-gray-400">

                                No matched skills

                            </span>

                    }

                </div>

            </div>

            {/* Missing Skills */}

            <div className="mt-6">

                <h3 className="font-bold text-red-400 mb-3">

                    ❌ Missing Skills

                </h3>

                <div className="flex flex-wrap gap-2">

                    {

                        missingSkills.length > 0 ?

                            missingSkills.map((skill, index) => (

                                <span

                                    key={index}

                                    className="bg-red-600 px-3 py-1 rounded-full text-sm"

                                >

                                    {skill}

                                </span>

                            ))

                            :

                            <span className="text-gray-400">

                                No missing skills

                            </span>

                    }

                </div>

            </div>

            {/* AI Recommendation */}

            <div className="mt-6 bg-slate-700 rounded-xl p-4">

                <h3 className="font-bold mb-2">

                    💡 AI Recommendation

                </h3>

                {

                    missingSkills.length === 0 ?

                        <p className="text-green-400">

                            Excellent! Your resume matches this job very well.

                        </p>

                        :

                        <p>

                            Learn <strong>{missingSkills.join(", ")}</strong> to improve your match score.

                        </p>

                }

            </div>

            {/* Apply Button */}

            <div className="mt-8">

                <button

                    onClick={handleApply}

                    className="bg-green-600 hover:bg-green-700 transition-all px-6 py-3 rounded-xl font-semibold"

                >

                    🚀 Apply Now

                </button>

            </div>

        </div>

    );

}

export default JobCard;
