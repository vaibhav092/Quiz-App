import React from "react";

const QuizQuestion = ({ question, options, selectedOption, onSelectOption }) => {
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">{question}</h2>
            <div className="grid grid-cols-1 gap-4">
                {options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => onSelectOption(option)}
                        className={`p-3 rounded-md text-lg 
                            ${selectedOption === option ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuizQuestion;
