import React, { useEffect, useState } from "react";

function Spinner() {
    const [currentProgress, setCurrentProgress] = useState(0);

    useEffect(() => {
        const loader = setInterval(() => {
            setCurrentProgress((prevProgress) => {
                let newProgress = prevProgress + Math.random() * 5; // Increment by small random value
                if (newProgress >= 100) {
                    newProgress = 100;
                    clearInterval(loader); // Stop interval when progress reaches 100%
                }
                return newProgress;
            });
        }, 300); // Interval set to 500ms for smoother animation

        return () => clearInterval(loader); // Cleanup interval on component unmount
    }, []);

    return (
        <div
            className="h-1 bg-red-500 transition-all duration-100 absolute z-4 top-0"
            style={{ width: `${currentProgress}%` }} // Add '%' for width
        ></div>
    );
}

export default Spinner;
