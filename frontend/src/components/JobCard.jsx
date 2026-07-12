function JobCard({ job }) {

  return (

    <div className="bg-slate-800 rounded-2xl shadow-xl p-6 hover:scale-[1.02] transition-all duration-300">

      <div className="flex justify-between items-center">

        <div>

          <h2 className="text-2xl font-bold">

            🏢 {job.company}

          </h2>

          <p className="text-gray-400">

            {job.title}

          </p>

        </div>

        <div className="bg-green-600 px-4 py-2 rounded-xl font-bold">

          ⭐ {job.score}%

        </div>

      </div>

      <hr className="my-5 border-slate-600" />

      <div className="grid grid-cols-3 gap-4">

        <div>

          <p className="text-gray-400">📍 Location</p>

          <h3>{job.location}</h3>

        </div>

        <div>

          <p className="text-gray-400">💰 Salary</p>

          <h3>₹{job.salary.toLocaleString()}</h3>

        </div>

        <div>

          <p className="text-gray-400">💼 Type</p>

          <h3>{job.job_type}</h3>

        </div>

      </div>

      <div className="mt-6">

        <h3 className="font-bold mb-3">

          ✅ Matched Skills

        </h3>

        <div className="flex flex-wrap gap-2">

          {job.matched_skills.map((skill, index) => (

            <span

              key={index}

              className="bg-blue-600 px-3 py-1 rounded-full text-sm"

            >

              {skill}

            </span>

          ))}

        </div>

      </div>

      <div className="mt-6">

        <h3 className="font-bold mb-3">

          🎯 Match Reasons

        </h3>

        <ul className="list-disc ml-6">

          {job.reasons.map((reason, index) => (

            <li key={index}>{reason}</li>

          ))}

        </ul>

      </div>

      <div className="mt-8">

        <a

          href={job.link}

          target="_blank"

          rel="noreferrer"

        >

          <button className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-xl">

            Apply Now

          </button>

        </a>

      </div>

    </div>

  );

}

export default JobCard;