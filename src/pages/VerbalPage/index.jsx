import React, { useState, useEffect } from 'react';
import './verbal.css';
import questions from '../../data/verbalQuestions';
import StartTimer from '../../components/StartTimer';

const VerbalPage = ({ onComplete }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState(
    JSON.parse(localStorage.getItem('verbalAnswers')) || Array(questions.length).fill(null)
  );
  const [timeLeft, setTimeLeft] = useState(14 * 60); // 20 minutes
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [testStarted, setTestStarted] = useState(false);

// Store answers in localStorage whenever they change
useEffect(() => {
  if (testStarted) {
    localStorage.setItem('verbalAnswers', JSON.stringify(answers));
  }
}, [answers, testStarted]);

useEffect(() => {
  let timer;
  if (testStarted && !showResults) {
    timer = timeLeft > 0 && setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    if (timeLeft === 0 && !isSubmitting) {
      handleSectionComplete();
    }
  }
  return () => clearInterval(timer);
}, [timeLeft, isSubmitting, showResults, testStarted]);

const formatTime = () => {
  const min = Math.floor(timeLeft / 60);
  const sec = timeLeft % 60;
  return `${min}:${sec < 10 ? '0' + sec : sec}`;
};

  const handleOptionSelect = (index) => {
    const updated = [...answers];
    updated[currentQ] = index;
    setAnswers(updated);
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      handleSectionComplete();
    }
  };

  const handlePrev = () => {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
    }
  };

  const handleSectionComplete = () => {
    setIsSubmitting(true);
    // Perform any final submission logic here
    onComplete(); // Notify parent component (SectionNavigator) that this section is complete
  };

  const handleContinueToNextSection = () => {
    onComplete();
  };

  const handleRestart = () => {
    setShowResults(false);
    setIsSubmitting(false);
    setCurrentQ(0);
  };

  const startTest = () => {
    setShowInstructions(false);
    setTestStarted(true);
  };

  const q = questions[currentQ];
  const isRC = q.type === 'RC';
  const isCR = q.type === 'CR';
  const isSC = q.type === 'SC';

  if (showInstructions) {
    return (
      <div className="verbal-container">
        <div className="instructions-box">
          <h2>Verbal Section Instructions<span><StartTimer onTimeUp={startTest} testStarted={testStarted} /></span></h2>
          <div className="instructions-content">
            <h3>Section Overview</h3>
            <p>This section contains {questions.length} questions to be completed in 14 minutes.</p>
            
            <h3>Question Types</h3>
            <ul>
              <li><strong>Reading Comprehension:</strong> Read passages and answer questions about them</li>
              <li><strong>Critical Reasoning:</strong> Analyze arguments and answer questions</li>
              <li><strong>Sentence Correction:</strong> Identify the best version of a sentence</li>
            </ul>

            <h3>Navigation</h3>
            <p> Use the Next button to move to the next question.</p>
            <h3>Timer</h3>
            <p>The 14-minute timer will start when you begin the test.</p>
          </div>
          <button onClick={startTest} className="start-test-btn">
            Begin Verbal Section
          </button>
        </div>
      </div>
    );
  }

  // Group RC questions by passage
  const passageGroups = questions.reduce((groups, question) => {
    if (question.type === 'RC') {
      const key = question.passage;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(question);
    }
    return groups;
  }, {});

  const currentPassageGroup = isRC ? passageGroups[q.passage] : null;
  const currentPassageIndex = isRC ? currentPassageGroup.findIndex(item => item.id === q.id) : -1;

  if (isSubmitting) {
    return (
      <div className="submitting-overlay">
        <div className="submitting-message">
          <p>Submitting your answers...</p>
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="verbal-container">
        <div className="timer"><span><h4>Question {currentQ + 1} of {questions.length}</h4> </span>Time Left: {formatTime()}</div>
      <div className={`question-content ${isRC ? 'rc-layout' : ''} ${isCR ? 'cr-layout' : ''} ${isSC ? 'sc-layout' : ''}`}>
        {isRC && (
          <>
            <div className="passage-container">
              {/* <h3>Passage</h3> */}
              <div className="passage-text">{q.passage}</div>
            </div>
            <div className="question-card rc-question">
              
              {/* (Reading Comprehension) lenghth}ke baad ayega*/}
              <p className="question-text">{q.text}</p>
              <div className="options">
                {q.options.map((opt, idx) => (
                  <label key={idx} className={`option ${answers[currentQ] === idx ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      checked={answers[currentQ] === idx}
                      onChange={() => handleOptionSelect(idx)}
                      disabled={isSubmitting}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          </>
        )}

        {isSC && (
          <div className="question-card sc-question">
            <h4>Question {currentQ + 1} of {questions.length} (Sentence Correction)</h4>
            <p className="question-text">{q.text}</p>
            <div className="options">
              {q.options.map((opt, idx) => (
                <label key={idx} className={`option ${answers[currentQ] === idx ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    checked={answers[currentQ] === idx}
                    onChange={() => handleOptionSelect(idx)}
                    disabled={isSubmitting}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="navigation-footer">
        {currentQ < questions.length - 1 ? (
          <button 
            onClick={handleNext} 
            disabled={answers[currentQ] === null || isSubmitting} 
            className="nav-btn next-btn"
          >
            Next
          </button>
        ) : (
          <button 
            disabled={answers[currentQ] === null || isSubmitting} 
            className="nav-btn submit-btn"
            onClick={handleSectionComplete}
          >
            {isSubmitting ? 'Submitting...' : 'Submit All'}
          </button>
        )}
      </div>
    </div>
  );
};

export default VerbalPage;