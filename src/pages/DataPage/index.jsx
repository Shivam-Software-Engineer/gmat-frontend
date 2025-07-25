import React, { useState, useEffect, useCallback, useContext } from 'react';
import TableAnalysis from '../../components/Datainsights/TableAnalysis';
import GraphicsInterpretation from '../../components/Datainsights/GraphicsInterpretation';
import MultiSourceReasoning from '../../components/Datainsights/MultiSourceReasoning';
import TwoPartAnalysis from '../../components/Datainsights/TwoPartAnalysis';
import DataSufficiency from '../../components/Datainsights/DataSufficiency';
import Calculator from '../../components/calculator';
import StartTimer from '../../components/StartTimer';
import axios from 'axios';
import './style.css';
import { Result } from '../../Context/context';

const Timer = ({ timeLeft, onCalculatorClick }) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="timer-container">
      <div className="timer">
        Time Left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>
      <button className="calculator-btn" onClick={onCalculatorClick}>
        Calculator
      </button>
    </div>
  );
};

const DataPage = ({ onComplete }) => {
  const { setDataresult } = useContext(Result);
  const [datainsighttques, setDatainsighttques] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(16 * 60);
  const [showInstructions, setShowInstructions] = useState(true);
  const [testStarted, setTestStarted] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const Myapi = import.meta.env.VITE_BASE_API;
  const currentQuestion = datainsighttques[currentQuestionIndex];
  const totalQuestions = datainsighttques.length;

  const getDatainsightquestions = () => {
    axios.get(Myapi + '/website/questions/datainsight')
      .then((res) => res.data)
      .then((finalres) => {
        setDatainsighttques(finalres.data);
      });
  };

  useEffect(() => {
    getDatainsightquestions();
  }, []);

  useEffect(() => {
    if (testStarted && typeof window !== 'undefined') {
      localStorage.setItem('dataAnswers', JSON.stringify(answers));
    }
  }, [answers, testStarted]);

  useEffect(() => {
    let timer;
    if (testStarted) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 0) {
            clearInterval(timer);
            handleSectionComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [testStarted]);

  const handleSectionComplete = async () => {
    setIsSubmitting(true);

    const gUser = JSON.parse(localStorage.getItem("gUser"));
    const email = gUser?.email;

    if (!email) {
      console.error("Email not found.");
      return;
    }

    const storedAnswers = JSON.parse(localStorage.getItem("dataAnswers")) || {};

    const formattedResponses = datainsighttques.map((question, index) => {
      const userAnswers = storedAnswers[index] || {};

      if (question.prompts && Array.isArray(question.prompts)) {
        const updatedPrompts = question.prompts.map((prompt, promptIndex) => {
          const selected = userAnswers[promptIndex] ?? null;
          const correct = prompt.correct ?? null;

          const status = selected === null ? null : Number(selected) === Number(correct) ? true : false;

          return {
            ...prompt,
            selected,
            status,
          };
        });

        return {
          ...question,
          prompts: updatedPrompts,
        };
      }

      // For TwoPartAnalysis style questions
      const selected = userAnswers;
      const correct = question.correct || {};
      const updatedStatus = {};

      for (const key in correct) {
        const selectedValue = selected?.[key] ?? null;
        updatedStatus[key] =
          selectedValue === null
            ? null
            : Number(selectedValue) === Number(correct[key])
            ? true
            : false;
      }

      return {
        ...question,
        selected,
        status: updatedStatus,
      };
    });

    try {
      const res = await axios.post(
        `${Myapi}/website/answers/datainsight`,
        {
          email,
          responses: formattedResponses,
        }
      );

      setDataresult(res.data.data);

      if (onComplete) onComplete();
    } catch (err) {
      console.error("Submission Error:", err.message);
      alert("You already attempted this exam.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCalculatorClick = useCallback(() => {
    setShowCalculator(prev => !prev);
  }, []);

  const handleOverlayClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      setShowCalculator(false);
    }
  }, []);

  const startTest = () => {
    setShowInstructions(false);
    setTestStarted(true);
  };

  const isCurrentAnswered = answers[currentQuestionIndex] && Object.keys(answers[currentQuestionIndex]).length > 0;

  const handleAnswer = (rowIndex, answerIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: {
        ...(prev[currentQuestionIndex] || {}),
        [rowIndex]: Number(answerIndex),
      },
    }));
  };

  const handleNext = () => {
    const currentAnswer = answers[currentQuestionIndex];
    if (!currentAnswer || Object.keys(currentAnswer).length === 0) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
      return;
    }
    setShowExplanation(false);
    setCurrentQuestionIndex(prev => (prev + 1) % totalQuestions);
  };

  const renderQuestionComponent = () => {
    if (!currentQuestion) return null;
    switch (currentQuestion.type) {
      case 'TableAnalysis':
        return <TableAnalysis question={currentQuestion} onAnswer={handleAnswer} text={currentQuestion.text} text1={currentQuestion.text1} />;
      case 'GraphicsInterpretation':
        return <GraphicsInterpretation question={currentQuestion} onAnswer={handleAnswer} />;
      case 'MultiSourceReasoning':
        return <MultiSourceReasoning question={currentQuestion} onAnswer={handleAnswer} />;
      case 'TwoPartAnalysis':
        return <TwoPartAnalysis question={currentQuestion} onAnswer={handleAnswer} />;
      case 'DataSufficiency':
        return <DataSufficiency question={currentQuestion} onAnswer={handleAnswer} />;
      default:
        return <div>Question type not supported</div>;
    }
  };

  if (showInstructions) {
    return (
      <div className="data-insights-page">
        <div className="instructions-container">
          <h2>Data Insights Section Instructions
            <span><StartTimer onTimeUp={startTest} testStarted={testStarted} /></span>
          </h2>
          <div className="instructions-content">
            <h3>Section Overview</h3>
            <p>This section contains {totalQuestions} questions to be completed in 16 minutes.</p>
            <h3>Question Types</h3>
            <ul>
              <li><strong>Table Analysis:</strong> Analyze data tables and answer questions</li>
              <li><strong>Graphics Interpretation:</strong> Interpret charts and graphs</li>
              <li><strong>Multi-Source Reasoning:</strong> Analyze information from multiple sources</li>
              <li><strong>Two-Part Analysis:</strong> Answer two related questions about data</li>
              <li><strong>Data Sufficiency:</strong> Determine if given data is sufficient to answer questions</li>
            </ul>
            <h3>Navigation</h3>
            <p>Use the Next button to move to the next question.</p>
            <p>The calculator is provided here, you can use it.</p>
            <h3>Timer</h3>
            <p>The 16-minute timer will start when you begin the test.</p>
          </div>
          <button onClick={startTest} className="start-test-btn">
            Begin Data Insights Section
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="data-insights-container">
      <div className='timer-container'>
        <div className="timer-bar">
          <h3>Question {currentQuestionIndex + 1} of {totalQuestions}</h3>
          <div className="timer-info">
            <button className="calculator-btn" onClick={handleCalculatorClick}>
              Calculator
            </button>
            <span className="time-left">
              Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
            </span>
          </div>
        </div>

        {showCalculator && (
          <div className="calculator-overlay" onClick={handleOverlayClick}>
            <Calculator onClose={() => setShowCalculator(false)} />
          </div>
        )}
      </div>

      <div className="question-container">
        {renderQuestionComponent()}
      </div>

      <div className="navigation-footer">
        {currentQuestionIndex < totalQuestions - 1 ? (
          <div className="next-button-wrapper" onClick={handleNext}>
            <button
              className={`next-button ${!isCurrentAnswered ? 'disabled' : ''}`}
            >
              Next
            </button>
          </div>
        ) : (
          <button className="submit-button" onClick={handleSectionComplete}>
            Submit
          </button>
        )}
      </div>

      {showToast && (
        <div className="toast-message">
          Please select an option before proceeding.
        </div>
      )}
    </div>
  );
};

export default DataPage;
