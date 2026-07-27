import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import DashboardStats from "../components/DashboardStats";
import ProfileCard from "../components/ProfileCard";
import JobCard from "../components/JobCard";
import ResumeDashboard from "../components/ResumeDashboard";
import ResumeSkillDashboard from "../components/ResumeSkillDashboard";
import JobSearch from "../components/JobSearch";
import AnalyticsCards from "../components/AnalyticsCards";

import {
    getProfile,
    getLiveJobs,
    searchJobs
} from "../services/api";

function Dashboard() {

    const [profile, setProfile] = useState(null);

    const [jobs, setJobs] = useState([]);

    useEffect(() => {

        loadDashboard();

    }, []);

    async function loadDashboard() {

        try {

            const profileData = await getProfile();

            const liveJobs = await getLiveJobs();

            setProfile(profileData);

            setJobs(liveJobs);

        }

        catch (error) {

            console.error(error);

        }

    }

    async function handleSearch(filters) {

        try {

            const results = await searchJobs(filters);

            setJobs(results);

        }

        catch (error) {

            console.error(error);

        }

    }

    if (!profile) {

        return (

            <div className="bg-slate-900 min-h-screen flex justify-center items-center text-white text-3xl">

                Loading...

            </div>

        );

    }

    return (

        <div className="bg-slate-900 min-h-screen text-white">

            <div className="max-w-7xl mx-auto px-8 py-8">

                {/* Navbar */}

                <Navbar />

                {/* Welcome */}

                <div className="mb-8">

                    <h1 className="text-4xl font-bold">

                        Welcome Back 👋

                    </h1>

                    <p className="text-gray-400 mt-2">

                        Here's your AI Powered Career Dashboard.

                    </p>

                </div>

                {/* Dashboard Stats */}

                <AnalyticsCards />
                <div className="mt-8">
                        <DashboardStats

                        experience={profile.experience}

                        jobs={jobs.length}

                />
                </div>

                {/* Resume Intelligence */}

                <div className="mt-8">

                    <ResumeSkillDashboard />

                </div>

                {/* Smart Search */}

                <div className="mt-8">

                    <JobSearch

                        onSearch={handleSearch}

                    />

                </div>

                {/* Main Grid */}

                <div className="grid grid-cols-12 gap-8 mt-8">

                    {/* Left */}

                    <div className="col-span-4">

                        <ProfileCard

                            profile={profile}

                        />

                    </div>

                    {/* Right */}

                    <div className="col-span-8">

                        <h2 className="text-3xl font-bold mb-6">

                            🇮🇳 Job Search Results

                        </h2>

                        {

                            jobs.length === 0 ?

                                (

                                    <div className="bg-slate-800 rounded-xl p-10 text-center">

                                        <h2 className="text-2xl">

                                            No Jobs Found 😔

                                        </h2>

                                        <p className="text-gray-400 mt-2">

                                            Try changing your filters.

                                        </p>

                                    </div>

                                )

                                :

                                (

                                    <div className="space-y-6">

                                        {

                                            jobs.map((job, index) => (

                                                <JobCard

                                                    key={index}

                                                    job={job}

                                                />

                                            ))

                                        }

                                    </div>

                                )

                        }

                    </div>

                </div>

                {/* Resume Analyzer */}

                <div className="mt-12">

                    <ResumeDashboard />

                </div>

            </div>

        </div>

    );

}

export default Dashboard;