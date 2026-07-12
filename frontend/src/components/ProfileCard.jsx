function ProfileCard({ profile }) {
  return (
    <div className="bg-slate-800 rounded-2xl shadow-xl p-6">

      <div className="text-center">

        <img
          src="https://ui-avatars.com/api/?name=Prasannajit&background=2563eb&color=fff&size=200"
          alt="profile"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />

        <h2 className="text-2xl font-bold">
          {profile.name}
        </h2>

        <p className="text-gray-400">
          Technical Support Engineer
        </p>

      </div>

      <hr className="my-6 border-slate-600" />

      <div className="space-y-4">

        <div>
          <span className="text-gray-400">💼 Experience</span>
          <h3>{profile.experience} Years</h3>
        </div>

        <div>
          <span className="text-gray-400">📍 Location</span>
          <h3>{profile.preferred_location}</h3>
        </div>

        <div>
          <span className="text-gray-400">💰 Expected Salary</span>
          <h3>₹{profile.expected_salary.toLocaleString()}</h3>
        </div>

        <div>
          <span className="text-gray-400">⏳ Notice Period</span>
          <h3>{profile.notice_period}</h3>
        </div>

      </div>

      <hr className="my-6 border-slate-600" />

      <h3 className="font-bold mb-3">
        🛠 Skills
      </h3>

      <div className="flex flex-wrap gap-2">

        {profile.skills.map((skill, index) => (
          <span
            key={index}
            className="bg-blue-600 px-3 py-1 rounded-full text-sm"
          >
            {skill}
          </span>
        ))}

      </div>

    </div>
  );
}

export default ProfileCard;