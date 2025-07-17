import React, { useState, useEffect, useCallback } from 'react';
import dataInsightsQuestions from '../../data/dataInsightsQuestions';
import TableAnalysis from '../../components/Datainsights/TableAnalysis';
import GraphicsInterpretation from '../../components/Datainsights/GraphicsInterpretation';
import MultiSourceReasoning from '../../components/Datainsights/MultiSourceReasoning';
import TwoPartAnalysis from '../../components/Datainsights/TwoPartAnalysis';
import DataSufficiency from '../../components/Datainsights/DataSufficiency';
import Calculator from '../../components/calculator';
import StartTimer from '../../components/StartTimer';
import "./style.css";

// Timer Component
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
  const totalQuestions = dataInsightsQuestions.length;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(16 * 60);
  const [showInstructions, setShowInstructions] = useState(true);
  const [testStarted, setTestStarted] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentQuestion = dataInsightsQuestions[currentQuestionIndex];

  // Save responses to localStorage whenever they change (only after test starts)
  useEffect(() => {
    if (testStarted && typeof window !== 'undefined') {
      localStorage.setItem('dataAnswers', JSON.stringify(answers));
    }
  }, [answers, testStarted]);

  // Timer effect - only runs when test has started
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

  const handleSectionComplete = useCallback(() => {
    setIsSubmitting(true);
    if (onComplete) onComplete(); // only if onComplete passed as prop
  }, [onComplete]);

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

  // const handleAnswer = (promptIndex, answerIndex) => {
  //   console.log(promptIndex,answerIndex);
  //   setAnswers(prev => ({
  //     ...prev,
  //     [currentQuestionIndex]: {
  //       ...prev[currentQuestionIndex],
  //       [promptIndex]: answerIndex
  //     }
  //   }));
  // };

  const handleAnswer = (rowIndex ,answerIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: {
        ...(prev[currentQuestionIndex] || {}), // handle first-time initialization
        [rowIndex]: Number(answerIndex),
      },
    }));
  };
  

  const handleNext = () => {
    setShowExplanation(false);
    setCurrentQuestionIndex(prev => (prev + 1) % totalQuestions);
  };

  const renderQuestionComponent = () => {
    switch (currentQuestion.type) {
      case 'TableAnalysis':
        return <TableAnalysis question={currentQuestion} onAnswer={handleAnswer} text={currentQuestion.text}
    text1={currentQuestion.text1} />;
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

  // Instruction screen
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
            {/* <p>You can change your answers at any time before submitting.</p> */}
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

  // Main test page
  return (
    <div className="data-insights-container">
      <div className='timer-container'>
        <div className="timer-bar">
          <h3>Question {currentQuestionIndex + 1} of {totalQuestions}</h3>
          <div className="timer-info">
            <button
              className="calculator-btn"
              onClick={handleCalculatorClick}
            >
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
          <button className="next-button" onClick={handleNext}>
            Next
          </button>
        ) : (
          <button className="submit-button" onClick={handleSectionComplete}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default DataPage;
