function DashboardStats({ experience, jobs }) {

    const cards = [
        {
            icon: "💼",
            title: "Experience",
            value: `${experience} Years`,
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: "📄",
            title: "Jobs Found",
            value: jobs,
            color: "from-green-500 to-emerald-500"
        },
        {
            icon: "🤖",
            title: "AI Ready",
            value: "85%",
            color: "from-purple-500 to-pink-500"
        },
        {
            icon: "🚀",
            title: "Resume Status",
            value: "Uploaded",
            color: "from-orange-500 to-yellow-500"
        }
    ];

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            {

                cards.map((card, index) => (

                    <div

                        key={index}

                        className="group relative overflow-hidden rounded-3xl
                                   bg-slate-800/90 border border-slate-700
                                   shadow-2xl hover:shadow-blue-500/20
                                   hover:-translate-y-2
                                   transition-all duration-300 p-6"

                    >

                        {/* Gradient Circle */}

                        <div

                            className={`absolute -top-10 -right-10 w-32 h-32 rounded-full
                            bg-gradient-to-br ${card.color} opacity-20 group-hover:scale-125 transition duration-500`}

                        />

                        <div className="relative z-10">

                            <div className="flex justify-between items-center">

                                <div className="text-5xl">

                                    {card.icon}

                                </div>

                                <div

                                    className={`px-3 py-1 rounded-full text-xs font-semibold
                                    bg-gradient-to-r ${card.color}`}

                                >

                                    LIVE

                                </div>

                            </div>

                            <h2 className="text-4xl font-bold text-white mt-8">

                                {card.value}

                            </h2>

                            <p className="text-slate-400 mt-2">

                                {card.title}

                            </p>

                            <div className="mt-6">

                                <div className="h-2 bg-slate-700 rounded-full">

                                    <div

                                        className={`h-2 rounded-full bg-gradient-to-r ${card.color}`}

                                        style={{ width: "85%" }}

                                    />

                                </div>

                            </div>

                        </div>

                    </div>

                ))

            }

        </div>

    );

}

export default DashboardStats;