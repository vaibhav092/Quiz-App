import React, { useEffect, useState } from "react";

const Timer = ({ timeLimit, onTimeUp }) => {
    const [timeLeft, setTimeLeft] = useState(timeLimit);

    useEffect(() => {
        if (timeLeft <= 0) {
            onTimeUp();
            return;
        }
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
    }, [timeLeft, onTimeUp]);

    return (
        <div className="text-red-500 font-bold text-lg">
            Time Left: {timeLeft} sec
        </div>
    );
};

export default Timer;
