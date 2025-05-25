import { useState } from "react";

const questions = [
  {
    q: "What is the biggest contributor to ocean pollution?",
    options: ["Oil Spills", "Plastic", "Sewage"],
    answer: "Plastic"
  },
  {
    q: "Which goal is NOT part of SDGs?",
    options: ["No Poverty", "Space Colonization", "Climate Action"],
    answer: "Space Colonization"
  },
  // Add 3 more questions...
];

export default function MiniGame({ userId }) {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (option) => {
    if (option === questions[step].answer) setScore(score + 1);
    setStep(step + 1);
  };

  const finishGame = async () => {
    if (score >= 3) {
      await fetch(`/api/action/completeMiniGame`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
    }
  };

  if (step >= questions.length) {
    finishGame();
    return <div>Game Over. Your Score: {score}/5</div>;
  }

  return (
    <div className="p-4 bg-green-100 rounded">
      <h3>{questions[step].q}</h3>
      {questions[step].options.map((opt, i) => (
        <button key={i} onClick={() => handleAnswer(opt)} className="block mt-2 p-2 bg-white rounded shadow">
          {opt}
        </button>
      ))}
    </div>
  );
}
