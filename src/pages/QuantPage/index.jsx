import { MathJaxContext, MathJax } from 'better-react-mathjax';
import React, { useState, useEffect } from 'react';
import './quant.css';
import questions from '../../data/quantQuestions';
import StartTimer from '../../components/StartTimer';


const QuantPage = ({ onComplete }) => {
  const [current, setCurrent] = useState(0);
  const [userAnswers, setUserAnswers] = useState(
    JSON.parse(localStorage.getItem('quantAnswers')) || Array(questions.length).fill(null)
  );
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [testStarted, setTestStarted] = useState(false);
  const question = questions[current];

  useEffect(() => {
    if (testStarted) {
      localStorage.setItem('quantAnswers', JSON.stringify(userAnswers));
    }
  }, [userAnswers, testStarted]);

  useEffect(() => {
    let timer;
    if (testStarted) {
      timer = timeLeft > 0 && setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);

      if (timeLeft === 0 && !isSubmitting) {
        handleSectionComplete();
      }
    }
    return () => clearInterval(timer);
  }, [timeLeft, isSubmitting, testStarted]);

  const formatTime = () => {
    const min = Math.floor(timeLeft / 60);
    const sec = timeLeft % 60;
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
  };

  const handleOptionSelect = (idx) => {
    const updated = [...userAnswers];
    updated[current] = idx;
    setUserAnswers(updated);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(prev => prev + 1);
    }
  };

  // const handlePrev = () => {
  //   if (current > 0) {
  //     setCurrent(prev => prev - 1);
  //   }
  // };

  const handleSectionComplete = () => {
    setIsSubmitting(true);
    onComplete();
  };

  const handleFinalSubmit = () => {
    setIsSubmitting(true);
    onComplete();
  };

  const startTest = () => {
    setShowInstructions(false);
    setTestStarted(true);
  };

  if (showInstructions) {
    return (
      <div className="quant-container">
        <div className="instructions-box">
          <h2>Quantitative Section Instructions<span><StartTimer onTimeUp={startTest} testStarted={testStarted} /></span></h2>
          <div className="instructions-content">
            <h3>Section Overview</h3>
            <p>This section contains {questions.length} questions to be completed in 15 minutes.</p>

            <h3>Question Types</h3>
            <ul>
              <li><strong>Arithmetic:</strong> Apply number properties, percentages, ratios, and rates to solve real-world math problems efficiently.</li>
              <li><strong>Algebra:</strong> Analyze and solve equations and inequalities, and translate verbal scenarios into algebraic expressions.</li>
            </ul>

            <h3>Navigation</h3>
            <p>Use the Next button to move to the next question.</p>
            {/* <p>You can change your answers at any time before submitting.</p> */}
            <h3>Timer</h3>
            <p>The 20-minute timer will start when you begin the test.</p>
          </div>
          <button onClick={startTest} className="start-test-btn">
            Begin Quantitative Section
          </button>
        </div>
      </div>
    );
  }

  return (
    <MathJaxContext
      config={{
        loader: { load: ["[tex]/ams"] },
        tex: {
          inlineMath: [["$", "$"], ["\\(", "\\)"]],
          displayMath: [["$$", "$$"], ["\\[", "\\]"]],
          packages: { "[+]": ["ams"] },
        },
      }}>
      <div className="quant-container">
        <div className="timer">
          <h3>Question {current + 1} of 7</h3>
          <span>Time Left: {formatTime()}</span>
        </div>

        <div className="question-content">
          <div className="question-box">
            
            <div className="question-text">
              {question.text.split("<br/>").map((line, index) => (
                <div key={index}>
                  <MathJax inline={false} dynamic={true}>
                    {line}
                  </MathJax>
                </div>
              ))}
            </div>
            
            {question.image && <img src={question.image} alt="question" className="question-image" />}

            <div className="options">
              {question.options.map((opt, idx) => (
                <label
                  key={idx}
                  className={`option ${userAnswers[current] === idx ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name={`q-${current}`}
                    checked={userAnswers[current] === idx}
                    onChange={() => handleOptionSelect(idx)}
                    disabled={isSubmitting}
                  />
                  <MathJax inline={false} dynamic={true}>
                    {opt}
                  </MathJax>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="navigation-footer">
          {current < questions.length - 1 ? (
            <button
              onClick={handleNext}
              disabled={userAnswers[current] === null || isSubmitting}
              className="nav-btn next-btn"
            >
              Next
            </button>
          ) : (
            <button
              disabled={userAnswers[current] === null || isSubmitting}
              className="nav-btn submit-btn"
              onClick={handleFinalSubmit}
            >
              {isSubmitting ? 'Submitting...' : 'Submit All'}
            </button>
          )}
        </div>
      </div>
    </MathJaxContext>
  );
};

export default QuantPage;