import React from "react";
import { motion } from "framer-motion";

const Scoreboard = ({ score, total }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center p-6 bg-white rounded-lg shadow-lg"
        >
            <h2 className="text-2xl font-bold">Quiz Completed!</h2>
            <p className="text-lg mt-4">
                You scored <span className="font-bold text-blue-600">{score}</span> out of{" "}
                <span className="font-bold">{total}</span>.
            </p>
            <div className="mt-6">
                {score >= total * 0.7 ? (
                    <p className="text-green-500 font-bold text-xl">🎉 Great Job!</p>
                ) : (
                    <p className="text-red-500 font-bold text-xl">😞 Try Again!</p>
                )}
            </div>
        </motion.div>
    );
};

export default Scoreboard;
