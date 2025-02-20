import React, { useEffect, useState } from "react";
import { getQuizHistory } from "../utils/indexedDB";

const HistoryPage = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            const quizHistory = await getQuizHistory();
            setHistory(quizHistory);
        };
        fetchHistory();
    }, []);

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-6">Quiz History</h1>
            {history.length === 0 ? (
                <p>No quiz attempts found!</p>
            ) : (
                <ul>
                    {history.map((entry, index) => (
                        <li
                            key={index}
                            className="border-b py-4 flex justify-between items-center"
                        >
                            <span>{entry.date}</span>
                            <span className="font-bold">{entry.score} / 10</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default HistoryPage;
