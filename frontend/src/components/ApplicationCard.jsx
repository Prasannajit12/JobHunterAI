import { useState } from "react";
import { updateApplicationStatus } from "../services/api";

function ApplicationCard({ application, index, onStatusUpdated }) {

    const [status, setStatus] = useState(application.status);

    async function handleStatusChange(e) {

        const newStatus = e.target.value;

        setStatus(newStatus);

        try {

            await updateApplicationStatus(index, newStatus);

            if (onStatusUpdated) {
                onStatusUpdated();
            }

        }

        catch (error) {

            console.error(error);

            alert("❌ Failed to update status");

            setStatus(application.status);

        }

    }

    const getStatusColor = (status) => {

        switch (status) {

            case "Applied":
                return "bg-yellow-500";

            case "HR Interview":
                return "bg-blue-500";

            case "Technical Interview":
                return "bg-purple-600";

            case "Manager Interview":
                return "bg-indigo-600";

            case "Offer":
                return "bg-green-600";

            case "Joined":
                return "bg-emerald-600";

            case "Rejected":
                return "bg-red-600";

            default:
                return "bg-gray-600";
        }

    };

    return (

        <div className="bg-slate-800 rounded-2xl shadow-lg p-6 hover:shadow-blue-500/20 transition-all duration-300">

            <div className="flex justify-between items-start">

                <div>

                    <h2 className="text-2xl font-bold text-white">

                        🏢 {application.company}

                    </h2>

                    <p className="text-gray-400 mt-2">

                        {application.title}

                    </p>

                </div>

                <span className={`${getStatusColor(status)} px-4 py-2 rounded-full text-white font-semibold`}>

                    {status}

                </span>

            </div>

            <hr className="my-5 border-slate-700" />

            <div className="grid grid-cols-2 gap-6">

                <div>

                    <p className="text-gray-400">

                        📅 Applied Date

                    </p>

                    <h3 className="font-semibold text-white">

                        {application.applied_date}

                    </h3>

                </div>

                <div>

                    <p className="text-gray-400 mb-2">

                        🔄 Update Status

                    </p>

                    <select

                        value={status}

                        onChange={handleStatusChange}

                        className="bg-slate-700 text-white rounded-lg px-3 py-2 w-full"

                    >

                        <option>Applied</option>
                        <option>HR Interview</option>
                        <option>Technical Interview</option>
                        <option>Manager Interview</option>
                        <option>Offer</option>
                        <option>Joined</option>
                        <option>Rejected</option>

                    </select>

                </div>

            </div>

        </div>

    );

}

export default ApplicationCard;