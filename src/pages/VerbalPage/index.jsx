import React, { useState, useEffect, useContext } from 'react';
import './verbal.css';
import axios from 'axios';
import StartTimer from '../../components/StartTimer';
import { Result } from '../../Context/context';

const VerbalPage = ({ onComplete }) => {
  let {setVerbalresult}=useContext(Result)
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(14 * 60);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [testStarted, setTestStarted] = useState(false);
  const [showToast, setShowToast] = useState(false); // ✅ Toast toggle
const isCurrentAnswered = answers[currentQ] !== undefined && answers[currentQ] !== null;


  const [verbalques, setVerbalques] = useState([]);

  const Myapi = import.meta.env.VITE_BASE_API;

  const getVerbalquestions = () => {
    axios.get(Myapi + '/website/questions/verbal')
      .then((res) => res.data)
      .then((finalres) => {
        setVerbalques(finalres.data);
      });
  };

  useEffect(() => {
    getVerbalquestions();
  }, []);

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
    if (answers[currentQ] === undefined || answers[currentQ] === null) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
      return;
    }
    if (currentQ < verbalques.length - 1) {
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


  const handleSectionComplete = async () => {
  // ✅ Require current answer before submission
  if (answers[currentQ] === undefined || answers[currentQ] === null) {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
    return;
  }

  setIsSubmitting(true);

  try {
    // ✅ Get email from localStorage
    const gUser = JSON.parse(localStorage.getItem("gUser"));
    const email = gUser?.email;

    if (!email) {
      
      setIsSubmitting(false);
      return;
    }

    // ✅ Get latest answers from localStorage
    const savedAnswers = JSON.parse(localStorage.getItem("verbalAnswers")) || [];

    // ✅ Prepare payload to match backend format
    const payload = {
      email,
      responses: verbalques.map((q, i) => ({
        id: q.id,
        selected: savedAnswers[i] !== undefined ? savedAnswers[i] : null
      }))
    };

    // ✅ POST to backend
    const res = await axios.post(Myapi + "/website/answers/verbal", payload);
    setVerbalresult( res.data.data);

    onComplete(); // Move to results screen
  } catch (err) {
    console.error(" Submission Error:", err.message);
   alert("You already attempted this exam.");
  } finally {
    setIsSubmitting(false);
  }
};



  const startTest = () => {
    setShowInstructions(false);
    setTestStarted(true);
  };

  if (verbalques.length === 0 || !verbalques[currentQ]) {
    return null;
  }

  const q = verbalques[currentQ];
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
            <p>This section contains {verbalques.length} questions to be completed in 14 minutes.</p>
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

  const passageGroups = verbalques.reduce((groups, verbalques) => {
    if (verbalques.type === 'RC') {
      const key = verbalques.passage;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(verbalques);
    }
    return groups;
  }, {});

  const currentPassageGroup = isRC ? passageGroups[q.passage] : null;

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
      <div className="timer">
        <h4>Question {currentQ + 1} of {verbalques.length}</h4>
        Time Left: {formatTime()}
      </div>

      <div className={`question-content ${isRC ? 'rc-layout' : ''} ${isCR ? 'cr-layout' : ''} ${isSC ? 'sc-layout' : ''}`}>
        {isRC && (
          <>
            <div className="passage-container">
              <div className="passage-text">{q.passage}</div>
            </div>
            <div className="question-card rc-question">
              <p className="question-text">{q.text}</p>
              <div className="options">
                {q.options.map((opt, idx) => (
                  <label key={idx} className={`option ${answers[currentQ] === idx ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      checked={answers[currentQ] === idx}
                      onChange={() => handleOptionSelect(idx)}
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
            <h4>Question {currentQ + 1} of {verbalques.length} (Sentence Correction)</h4>
            <p className="question-text">{q.text}</p>
            <div className="options">
              {q.options.map((opt, idx) => (
                <label key={idx} className={`option ${answers[currentQ] === idx ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    checked={answers[currentQ] === idx}
                    onChange={() => handleOptionSelect(idx)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="navigation-footer">
        {currentQ < verbalques.length - 1 ? (
          <button
  onClick={handleNext}
  className={`nav-btn next-btn ${!isCurrentAnswered ? 'disabled' : ''}`}
>
  Next
</button>

        ) : (
          <button onClick={handleSectionComplete} className="nav-btn submit-btn">
            {isSubmitting ? 'Submitting...' : 'Submit All'}
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

export default VerbalPage;
