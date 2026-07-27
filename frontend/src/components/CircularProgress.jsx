function CircularProgress({ score }) {

    const radius = 70;
    const stroke = 10;

    const normalizedRadius = radius - stroke * 2;

    const circumference = normalizedRadius * 2 * Math.PI;

    const strokeDashoffset =
        circumference - (score / 100) * circumference;

    let color = "#ef4444";

    if (score >= 70) {
        color = "#22c55e";
    }
    else if (score >= 40) {
        color = "#facc15";
    }

    return (

        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative"
            }}
        >

            <svg
                height={radius * 2}
                width={radius * 2}
            >

                <circle
                    stroke="#334155"
                    fill="transparent"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />

                <circle
                    stroke={color}
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={strokeDashoffset}
                    style={{
                        transition: "stroke-dashoffset 1s ease"
                    }}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    transform={`rotate(-90 ${radius} ${radius})`}
                />

            </svg>

            <div
                style={{
                    position: "absolute",
                    textAlign: "center"
                }}
            >

                <h1
                    style={{
                        margin: 0,
                        color,
                        fontSize: "34px"
                    }}
                >
                    {score}%
                </h1>

            </div>

        </div>

    );

}

export default CircularProgress;