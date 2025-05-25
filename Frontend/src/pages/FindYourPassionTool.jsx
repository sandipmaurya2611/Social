import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { questions } from '../components/data/questions';
import { getRecommendations } from '../components/utils/recommendationEngine';
import QuestionCard from '../components/Quiz/QuestionCard';
import ResultCard from '../components/Quiz/ResultCard';
import Loader from '../components/Quiz/Loader';
import ProgressBar from '../components/Quiz/ProgressBar';
import ExtraRecommendations from '../components/Quiz/ExtraRecommendations';
import { ArrowLeft } from 'lucide-react';

const FindYourPassionTool = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (questionId, value, isMulti = false) => {
    if (isMulti) {
      const currentSelections = answers[questionId] || [];
      const question = questions.find(q => q.id === questionId);
      const maxSelections = question.maxSelections || 100;

      let newSelections;
      if (currentSelections.includes(value)) {
        newSelections = currentSelections.filter(item => item !== value);
      } else if (currentSelections.length < maxSelections) {
        newSelections = [...currentSelections, value];
      } else {
        newSelections = currentSelections;
      }

      setAnswers({ ...answers, [questionId]: newSelections });
    } else {
      setAnswers({ ...answers, [questionId]: value });
    }
  };

  const handleNext = () => {
    const currentQuestion = questions[currentStep];
    const currentAnswer = answers[currentQuestion.id];

    if (!currentAnswer || (Array.isArray(currentAnswer) && currentAnswer.length === 0)) {
      alert("Please select at least one option before continuing.");
      return;
    }

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      submitAnswers();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const submitAnswers = async () => {
    setIsLoading(true);
    const recommendations = await getRecommendations(answers);
    setResults(recommendations);
    setIsLoading(false);
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setResults(null);
  };

  if (isLoading) return <Loader />;

  if (results) {
    return (
      <>
        {/* Home Button on Result Page */}
        <div className="p-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md shadow-md border border-gray-200 hover:bg-white/80 hover:shadow-lg transition-all text-blue-700 font-medium"
          >
            <ArrowLeft size={18} className="text-blue-700" />
            <span>Go to Home</span>
          </button>
        </div>
        <ResultCard result={results} onReset={resetQuiz} />
        <ExtraRecommendations results={results} />
      </>
    );
  }

  const currentQuestion = questions[currentStep];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto mt-10">

      {/* Home Button on Quiz Page */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md shadow-md border border-gray-200 hover:bg-white/80 hover:shadow-lg transition-all text-blue-700 font-medium"
        >
          <ArrowLeft size={18} className="text-blue-700" />
          <span>Go to Home</span>
        </button>
      </div>

      <ProgressBar currentStep={currentStep} totalSteps={questions.length} />

      <div className="mb-4 flex justify-between text-sm text-gray-500">
        <span>Question {currentStep + 1} of {questions.length}</span>
      </div>

      <QuestionCard
        question={currentQuestion}
        selectedAnswers={answers[currentQuestion.id]}
        onSelect={handleSelect}
      />

      <div className="mt-6 flex justify-between">
        {currentStep > 0 && (
          <button
            onClick={handlePrevious}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
          >
            Back
          </button>
        )}
        <button
          onClick={handleNext}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          {currentStep === questions.length - 1 ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default FindYourPassionTool;
