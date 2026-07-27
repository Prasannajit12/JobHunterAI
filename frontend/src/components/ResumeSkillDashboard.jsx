import { useEffect, useState } from "react";
import { getUser } from "../services/api";

function ResumeSkillDashboard() {

    const [user, setUser] = useState(null);

    useEffect(() => {

        async function loadUser() {

            try {

                const data = await getUser();

                setUser(data);

            }

            catch (error) {

                console.error(error);

            }

        }

        loadUser();

    }, []);

    if (!user) {

        return (

            <div className="bg-slate-800 rounded-2xl p-6 text-white">

                Loading Resume...

            </div>

        );

    }

    return (

        <div className="bg-slate-800 rounded-2xl shadow-xl p-6 mb-8">

            <div className="flex justify-between items-center">

                <div>

                    <h2 className="text-2xl font-bold text-white">

                        📄 Resume Intelligence

                    </h2>

                    <p className="text-gray-400 mt-2">

                        AI extracted the following information.

                    </p>

                </div>

                <div className="text-center">

                    <h2 className="text-5xl font-bold text-green-400">

                        {user.readiness}%

                    </h2>

                    <p className="text-gray-400">

                        AI Readiness

                    </p>

                </div>

            </div>

            <hr className="my-6 border-slate-700" />

            <div className="grid grid-cols-2 gap-8">

                <div>

                    <h3 className="text-lg font-bold mb-4">

                        👤 Candidate

                    </h3>

                    <p>

                        <strong>Name:</strong>{" "}
                        {user.profile.name}

                    </p>

                    <p className="mt-2">

                        <strong>Experience:</strong>{" "}
                        {user.profile.experience} Years

                    </p>

                    <p className="mt-2">

                        <strong>Preferred Location:</strong>{" "}
                        {user.profile.preferred_location}

                    </p>

                    <p className="mt-2">

                        <strong>Expected Salary:</strong>{" "}
                        ₹{user.profile.expected_salary?.toLocaleString()}

                    </p>

                </div>

                <div>

                    <h3 className="text-lg font-bold mb-4">

                        🛠 Detected Skills

                    </h3>

                    <div className="flex flex-wrap gap-2">

                        {

                            user.skills.map((skill, index) => (

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

            </div>

        </div>

    );

}

export default ResumeSkillDashboard;