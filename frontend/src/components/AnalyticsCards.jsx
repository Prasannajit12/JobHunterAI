import { useEffect, useState } from "react";
import { getAnalytics } from "../services/api";

function AnalyticsCards() {

    const [analytics, setAnalytics] = useState(null);

    useEffect(() => {

        loadAnalytics();

    }, []);

    async function loadAnalytics() {

        try {

            const data = await getAnalytics();

            setAnalytics(data);

        }

        catch (error) {

            console.error(error);

        }

    }

    if (!analytics) {

        return (

            <div className="text-white">

                Loading Analytics...

            </div>

        );

    }

    const cards = [

        {
            title: "Applications",
            value: analytics.total,
            color: "from-blue-500 to-cyan-500",
            icon: "📄"
        },

        {
            title: "Interviews",
            value: analytics.interviews,
            color: "from-yellow-500 to-orange-500",
            icon: "🎤"
        },

        {
            title: "Offers",
            value: analytics.offers,
            color: "from-green-500 to-emerald-500",
            icon: "🎉"
        },

        {
            title: "Rejected",
            value: analytics.rejected,
            color: "from-red-500 to-pink-500",
            icon: "❌"
        },

        {
            title: "Joined",
            value: analytics.joined,
            color: "from-purple-500 to-indigo-500",
            icon: "🚀"
        }

    ];

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">

            {

                cards.map((card, index) => (

                    <div

                        key={index}

                        className="bg-slate-800 rounded-2xl shadow-xl p-6 hover:-translate-y-2 transition-all duration-300"

                    >

                        <div className="flex justify-between items-center">

                            <div className="text-4xl">

                                {card.icon}

                            </div>

                            <div

                                className={`w-4 h-4 rounded-full bg-gradient-to-r ${card.color}`}

                            />

                        </div>

                        <h2 className="text-4xl font-bold text-white mt-6">

                            {card.value}

                        </h2>

                        <p className="text-slate-400 mt-2">

                            {card.title}

                        </p>

                    </div>

                ))

            }

        </div>

    );

}

export default AnalyticsCards;