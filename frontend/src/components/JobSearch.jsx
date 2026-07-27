import { useState } from "react";

function JobSearch({ onSearch }) {

    const [filters, setFilters] = useState({

        keyword: "Technical Support",

        location: "Hyderabad",

        experience: "2",

        workMode: "Any"

    });

    function handleChange(event) {

        setFilters({

            ...filters,

            [event.target.name]: event.target.value

        });

    }

    async function handleSearch() {

        try {

            if (onSearch) {

                await onSearch(filters);

            }

        }

        catch (error) {

            console.error(error);

            alert("Search Failed");

        }

    }

    return (

        <div className="bg-slate-800 rounded-2xl p-6 shadow-xl mb-8">

            <h2 className="text-2xl font-bold text-white mb-6">

                🔍 Smart Job Search

            </h2>

            <div className="grid grid-cols-4 gap-5">

                {/* Job Role */}

                <div>

                    <label className="text-gray-300 block mb-2">

                        Job Role

                    </label>

                    <select

                        name="keyword"

                        value={filters.keyword}

                        onChange={handleChange}

                        className="w-full bg-slate-700 text-white rounded-lg p-3"

                    >

                        <option>Technical Support</option>
                        <option>Application Support</option>
                        <option>IT Support</option>
                        <option>Service Desk</option>
                        <option>Desktop Support</option>
                        <option>Cloud Support</option>
                        <option>System Administrator</option>

                    </select>

                </div>

                {/* Location */}

                <div>

                    <label className="text-gray-300 block mb-2">

                        Location

                    </label>

                    <select

                        name="location"

                        value={filters.location}

                        onChange={handleChange}

                        className="w-full bg-slate-700 text-white rounded-lg p-3"

                    >

                        <option>Hyderabad</option>
                        <option>Bangalore</option>
                        <option>Pune</option>
                        <option>Chennai</option>
                        <option>Noida</option>
                        <option>Gurgaon</option>
                        <option>Mumbai</option>

                    </select>

                </div>

                {/* Experience */}

                <div>

                    <label className="text-gray-300 block mb-2">

                        Experience

                    </label>

                    <select

                        name="experience"

                        value={filters.experience}

                        onChange={handleChange}

                        className="w-full bg-slate-700 text-white rounded-lg p-3"

                    >

                        <option value="0">0 Years</option>
                        <option value="1">1 Year</option>
                        <option value="2">2 Years</option>
                        <option value="3">3 Years</option>
                        <option value="4">4 Years</option>
                        <option value="5">5+ Years</option>

                    </select>

                </div>

                {/* Work Mode */}

                <div>

                    <label className="text-gray-300 block mb-2">

                        Work Mode

                    </label>

                    <select

                        name="workMode"

                        value={filters.workMode}

                        onChange={handleChange}

                        className="w-full bg-slate-700 text-white rounded-lg p-3"

                    >

                        <option>Any</option>
                        <option>Remote</option>
                        <option>Hybrid</option>
                        <option>On-site</option>

                    </select>

                </div>

            </div>

            <div className="mt-8 text-center">

                <button

                    onClick={handleSearch}

                    className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl font-bold transition"

                >

                    🔍 Search Jobs

                </button>

            </div>

        </div>

    );

}

export default JobSearch;