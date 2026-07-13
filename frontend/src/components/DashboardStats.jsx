function DashboardStats({ experience, jobs }) {
  return (
    <div className="grid grid-cols-3 gap-6 my-8">

      <div className="bg-slate-800 rounded-xl p-6 shadow-lg text-center">
        <h2 className="text-3xl font-bold">{experience}</h2>
        <p className="text-gray-400">Years Experience</p>
      </div>

      <div className="bg-slate-800 rounded-xl p-6 shadow-lg text-center">
        <h2 className="text-3xl font-bold">{jobs}</h2>
        <p className="text-gray-400">Jobs Found</p>
      </div>

      <div className="bg-slate-800 rounded-xl p-6 shadow-lg text-center">
        <h2 className="text-3xl font-bold text-green-400">95%</h2>
        <p className="text-gray-400">AI Match</p>
      </div>

    </div>
  );
}

export default DashboardStats;      