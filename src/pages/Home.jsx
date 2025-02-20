import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-200">
            <h1 className="text-3xl font-bold mb-6">Welcome to the Quiz Platform</h1>
            <p className="text-lg text-gray-600 mb-8">Test your knowledge with our quizzes!</p>
            <div className="flex space-x-4">
                <Link to="/quiz" className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-blue-600">
                    Start Quiz
                </Link>
                <Link to="/history" className="px-6 py-3 bg-green-400 text-white rounded-lg shadow-md hover:bg-gray-600">
                    View History
                </Link>
            </div>
        </div>
    );
};

export default Home;
