import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import DashboardStats from "../components/DashboardStats";
import ProfileCard from "../components/ProfileCard";
import JobCard from "../components/JobCard";

import {
    getProfile,
    getRecommendations,
    uploadResume
} 

from "../services/api";

import ResumeAnalysis from "../components/ResumeAnalysis";

function Dashboard() {

  const [profile, setProfile] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {

    async function loadData() {

      try {

        const profileData = await getProfile();
        const recommendationData = await getRecommendations();

        setProfile(profileData);
        setJobs(recommendationData);

      } catch (error) {

        console.error(error);

      }

    }

    loadData();

  }, []);

  if (!profile) {

    return (
      <div className="bg-slate-900 min-h-screen flex justify-center items-center text-white text-3xl">
        Loading...
      </div>
    );

  }

  const filteredJobs = jobs.filter((job) =>

    job.title.toLowerCase().includes(search.toLowerCase()) ||

    job.company.toLowerCase().includes(search.toLowerCase()) ||

    job.skills.join(" ").toLowerCase().includes(search.toLowerCase())

  );

  return (

    <div className="bg-slate-900 min-h-screen text-white">

      <div className="max-w-7xl mx-auto px-8 py-8">

        <Navbar />

        <div className="mb-8">

          <h1 className="text-4xl font-bold">

            Welcome Back 👋

          </h1>

          <p className="text-gray-400 mt-2">

            Here's your AI-powered Job Dashboard.

          </p>

        </div>

        <DashboardStats

          experience={profile.experience}

          jobs={jobs.length}

        />

        <div className="grid grid-cols-12 gap-8 mt-8">

          <div className="col-span-4">

            <ProfileCard profile={profile} />

          </div>

          <div className="col-span-8">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-3xl font-bold">

                🤖 AI Recommended Jobs

              </h2>

              <input

                type="text"

                placeholder="🔍 Search..."

                value={search}

                onChange={(e) => setSearch(e.target.value)}

                className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 w-80"

              />

            </div>

            <div className="space-y-6">

              {filteredJobs.map((job, index) => (

                <JobCard

                  key={index}

                  job={job}

                />

              ))}

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;