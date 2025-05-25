import React from 'react';

const ResultCard = ({ result, onReset }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Your Top Causes</h2>
      <ul className="space-y-4">
        {result.slice(0, 5).map((cause, index) => (
          <li key={index} className="p-4 border rounded-lg shadow-sm hover:bg-gray-50">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-gray-800">{cause.name}</span>
              <span className="text-sm text-blue-600 font-semibold">{cause.match}% Match</span>
            </div>
            <p className="text-gray-600 mt-1">{cause.description}</p>
          </li>
        ))}
      </ul>
      <div className="flex justify-center mt-8">
        <button
          onClick={onReset}
          className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Restart Quiz
        </button>
      </div>
    </div>
  );
};

export default ResultCard;
