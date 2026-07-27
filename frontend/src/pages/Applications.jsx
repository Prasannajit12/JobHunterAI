import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import ApplicationCard from "../components/ApplicationCard";

import { getApplications } from "../services/api";

function Applications() {

    const [applications, setApplications] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {

        loadApplications();

    }, []);

    async function loadApplications() {

        try {

            const data = await getApplications();

            setApplications(data);

        }

        catch (error) {

            console.error("Failed to load applications:", error);

        }

    }

    const filteredApplications = applications.filter((application) => {

        const company = (application.company || "").toLowerCase();
        const title = (application.title || "").toLowerCase();
        const query = search.toLowerCase();

        return (
            company.includes(query) ||
            title.includes(query)
        );

    });

    return (

        <div className="bg-slate-900 min-h-screen text-white">

            <div className="max-w-7xl mx-auto px-8 py-8">

                <Navbar />

                {/* Header */}

                <div className="flex justify-between items-center mt-8 mb-8">

                    <div>

                        <h1 className="text-4xl font-bold">

                            📋 My Applications

                        </h1>

                        <p className="text-gray-400 mt-2">

                            Track all your job applications in one place.

                        </p>

                    </div>

                    <input

                        type="text"

                        placeholder="🔍 Search..."

                        value={search}

                        onChange={(e) => setSearch(e.target.value)}

                        className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 w-72"

                    />

                </div>

                {/* Total Count */}

                <div className="mb-6">

                    <h3 className="text-lg text-slate-400">

                        Total Applications:{" "}

                        <span className="text-white font-bold">

                            {filteredApplications.length}

                        </span>

                    </h3>

                </div>

                {/* Applications */}

                {

                    filteredApplications.length === 0 ?

                        (

                            <div className="bg-slate-800 rounded-2xl p-10 text-center">

                                <h2 className="text-2xl font-bold">

                                    😔 No Applications Found

                                </h2>

                                <p className="text-gray-400 mt-3">

                                    Apply for a job to see it here.

                                </p>

                            </div>

                        )

                        :

                        (

                            <div className="space-y-6">

                                {

                                    filteredApplications.map((application, index) => (

                                        <ApplicationCard

                                            key={index}

                                            index={index}

                                            application={application}

                                            onStatusUpdated={loadApplications}

                                        />

                                    ))

                                }

                            </div>

                        )

                }

            </div>

        </div>

    );

}

export default Applications;