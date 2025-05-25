import React from 'react';

const QuestionCard = ({ question, selectedAnswers, onSelect }) => {
  const isMulti = question.type === 'multiSelect';
  const currentSelections = selectedAnswers || [];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{question.question}</h2>
      <div className="grid gap-3">
        {question.options.map(option => {
          const selected = isMulti ? currentSelections.includes(option.value) : selectedAnswers === option.value;

          return (
            <button
              key={option.value}
              onClick={() => onSelect(question.id, option.value, isMulti)}
              className={`px-4 py-2 rounded border ${selected ? 'bg-blue-600 text-white' : 'bg-white text-black'}`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;
