import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import QuizQuestion from "../components/QuizQuestion";
import Timer from "../components/Timer";
import Scoreboard from "../components/Scoreboard";
import { saveQuizAttempt } from "../utils/indexedDB";

const QuizPage = () => {
    const quizData = [

        { 
            type: "mcq",
            question: "Which planet is closest to the Sun?", 
            options: ["Venus", "Mercury", "Earth", "Mars"], 
            answer: "Mercury" 
        },
        { 
            type: "mcq",
            question: "Which data structure organizes items in a First-In, First-Out (FIFO) manner?", 
            options: ["Stack", "Queue", "Tree", "Graph"], 
            answer: "Queue" 
        },
        { 
            type: "mcq",
            question: "Which of the following is primarily used for structuring web pages?", 
            options: ["Python", "Java", "HTML", "C++"], 
            answer: "HTML" 
        },
        { 
            type: "mcq",
            question: "Which chemical symbol stands for Gold?", 
            options: ["Au", "Gd", "Ag", "Pt"], 
            answer: "Au" 
        },
        { 
            type: "mcq",
            question: "Which of these processes is not typically involved in refining petroleum?", 
            options: ["Fractional distillation", "Cracking", "Polymerization", "Filtration"], 
            answer: "Filtration" 
        },
    
        { type: "integer", question: "What is the value of 12 + 28?", answer: 40 },
        { type: "integer", question: "How many states are there in the United States?", answer: 50 },
        { type: "integer", question: "In which year was the Declaration of Independence signed?", answer: 1776 },
        { type: "integer", question: "What is the value of pi rounded to the nearest integer?", answer: 3 },
        { type: "integer", question: "If a car travels at 60 mph for 2 hours, how many miles does it travel?", answer: 120 },
    ];
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [numericAnswer, setNumericAnswer] = useState("");
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [score, setScore] = useState(0);
    const [startTime, setStartTime] = useState(Date.now());
    const [timeTaken, setTimeTaken] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        setStartTime(Date.now());
    }, []);

    const handleAnswer = (answer) => {
        const correctAnswer = quizData[currentQuestion].answer;
        if (answer === correctAnswer) {
            setScore(score + 1);
        }
        if (currentQuestion + 1 < quizData.length) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedOption(null);
            setNumericAnswer("");
        } else {
            setQuizCompleted(true);
            setTimeTaken(Math.floor((Date.now() - startTime) / 1000)); 

            // Save attempt history in IndexedDB
            saveQuizAttempt({
                date: new Date().toLocaleString(),
                score: score + (answer === correctAnswer ? 1 : 0),
                total: quizData.length,
                timeTaken: Math.floor((Date.now() - startTime) / 1000),
                questions: quizData,
            });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg"
        >
            {quizCompleted ? (
                <>
                    <Scoreboard score={score} total={quizData.length} />
                    <p className="text-center text-gray-600 mt-2">⏳ Time Taken: {timeTaken} seconds</p>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg"
                        onClick={() => navigate("/")}
                    >
                        Back to Home
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg"
                        onClick={() => navigate("/history")}
                    >
                        View History
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="mt-4 w-full bg-yellow-500 text-white py-2 rounded-lg"
                        onClick={() => window.location.reload()}
                    >
                        Restart Quiz
                    </motion.button>
                </>
            ) : (
                <>
                    <Timer timeLimit={30} onTimeUp={() => handleAnswer(null)} />
                    {quizData[currentQuestion].type === "mcq" ? (
                        <QuizQuestion
                            question={quizData[currentQuestion].question}
                            options={quizData[currentQuestion].options}
                            selectedOption={selectedOption}
                            onSelectOption={handleAnswer}
                        />
                    ) : (
                        <div>
                            <h2 className="text-xl font-bold mb-4">{quizData[currentQuestion].question}</h2>
                            <input
                                type="number"
                                value={numericAnswer}
                                onChange={(e) => setNumericAnswer(e.target.value)}
                                className="w-full p-2 border rounded-md"
                            />
                            <button
                                onClick={() => handleAnswer(numericAnswer)}
                                className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg"
                            >
                                Submit Answer
                            </button>
                        </div>
                    )}
                </>
            )}
        </motion.div>
    );
};

export default QuizPage;



