import React, { useState, useEffect } from 'react';
import { MathJaxContext, MathJax } from 'better-react-mathjax';
import { useNavigate } from 'react-router-dom';
import './ResultPage.css';
import verbalQuestions from '../../data/verbalQuestions';
import quantQuestions from '../../data/quantQuestions';
import QuantResults from './QuantResults';
import VerbalResults from './VerbalResults/VerbalResults';
import DataResults from './DataResults';
import Header from '../header';

const ResultPage = () => {
  const navigate = useNavigate();
  const [verbalResponses, setVerbalResponses] = useState([]);
  const [quantResponses, setQuantResponses] = useState([]);
  const [activeSection, setActiveSection] = useState('verbal');
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  useEffect(() => {
    // Load responses from localStorage
    const verbalRes = JSON.parse(localStorage.getItem('verbalAnswers')) || Array(verbalQuestions.length).fill(null);
    const quantRes = JSON.parse(localStorage.getItem('quantAnswers')) || Array(quantQuestions.length).fill(null);
    setVerbalResponses(verbalRes);
    setQuantResponses(quantRes);
  }, []);

const getQuestionStatus = (responseIndex, correctAnswerIndex) => {
  return responseIndex === correctAnswerIndex ? 'correct' : 'incorrect';
};


  const renderQuestionDetail = () => {
    if (selectedQuestion === null) return null;
  
    let question, userAnswerIndex, status, options, correctAnswer;
  
    if (activeSection === 'verbal') {
      question = verbalQuestions[selectedQuestion];
      userAnswerIndex = verbalResponses[selectedQuestion];
      status = getQuestionStatus(userAnswerIndex, question.answer);
      options = question.options;
      correctAnswer = question.answer;
    } else if (activeSection === 'quant') {
      question = quantQuestions[selectedQuestion];
      userAnswerIndex = quantResponses[selectedQuestion];
      status = getQuestionStatus(userAnswerIndex, question.correct);
      options = question.options;
      correctAnswer = question.correct;
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
      <div className="question-detail">
        <div className="question-header">
          <h3>Question {selectedQuestion + 1}</h3>
          <button
            className="back-button"
            onClick={() => setSelectedQuestion(null)}
          >
            Back to Results
          </button>
        </div>

        <div className="question-content">
          {question.passage && (
            <div className="passage-section">
              <h4>Passage:</h4>
              <p>{question.passage}</p>
            </div>
          )}

          <div className="question-section">
            <h4>Question:</h4>
            {question.text.split("<br/>").map((line, index) => (
              <div key={index}>
                <MathJax inline={false} dynamic={true}>
                  {line}
                </MathJax>
              </div>
            ))}
            {question.image && <img src={question.image} alt="question" className="question-image" />}
          </div>

          <div className="answers-section">
            <div className="user-answer">
              <h4>Your Answer:</h4>
              <MathJax inline={false} dynamic={true}>
              <p className={status}>
                {userAnswerIndex !== null ?
                  options[userAnswerIndex] :
                  'Not attempted'}
              </p>
              </MathJax>
            </div>
            <div className="correct-answer">
              <h4>Correct Answer:</h4>
              <MathJax inline={false} dynamic={true}>
              <p>{options[correctAnswer]}</p>
              </MathJax>
            </div>
          </div>

          <div className="explanation-section">
            <h4>Explanation:</h4>
            {question.explanation
              ? question.explanation.split("<br/>").map((line, index) => (
                  <div key={index}>
                    <MathJax inline={false} dynamic={true}>
                      <p className="VQexplaination">{line}</p>
                    </MathJax>
                  </div>
                ))
              : (
                <MathJax inline={false} dynamic={true}>
                  <p className="VQexplaination">No explanation available.</p>
                </MathJax>
              )}
          </div>

        </div>
      </div>
      </MathJaxContext>
    );
  };

  const renderDataResults = () => {
    return (
      <DataResults />
    );
  };


  const renderVerbalResults = () => {
    if (selectedQuestion !== null) {
      return renderQuestionDetail();
    }

    return (
      < VerbalResults
       verbalQuestions={verbalQuestions}
      verbalResponses={verbalResponses}
      setSelectedQuestion={setSelectedQuestion}
      getQuestionStatus={getQuestionStatus}/>
    );
  };

  const renderQuantResults = () => {
    if (selectedQuestion !== null) {
      return renderQuestionDetail();
    }
    return (
      <QuantResults
      quantQuestions={quantQuestions}
      quantResponses={quantResponses}
      setSelectedQuestion={setSelectedQuestion}
      getQuestionStatus={getQuestionStatus}/>
    );
  };

  const calculateSectionScore = (responses, questions, correctKey) => {
    return questions.reduce((score, question, index) => {
      if (responses[index] === question[correctKey]) {
        return score + 1;
      }
      return score;
    }, 0);
  };

  return (<>
  <Header/>
    <div className="result-page">
      <div className="section-tabs">
        <button
          className={activeSection === 'verbal' ? 'active' : ''}
          onClick={() => setActiveSection('verbal')}
        >
          Verbal
        </button>
        <button
          className={activeSection === 'quant' ? 'active' : ''}
          onClick={() => setActiveSection('quant')}
        >
          Quantitative
        </button>
        <button
          className={activeSection === 'data' ? 'active' : ''}
          onClick={() => setActiveSection('data')}
        >
          Data Insights
        </button>
      </div>

      <div className="results-container">
        {activeSection === 'verbal' && renderVerbalResults()}
        {activeSection === 'quant' && renderQuantResults()}
        {activeSection === 'data' && renderDataResults()}
      </div>
      {/* <div className="summary-stats">
        <div className="stat-card">
          <h4>Verbal</h4>
          <p>
            {calculateSectionScore(verbalResponses, verbalQuestions, 'answer')} / {verbalQuestions.length} correct
          </p>
        </div>
        <div className="stat-card">
          <h4>Quantitative</h4>
          <p>
            {calculateSectionScore(quantResponses, quantQuestions, 'correct')} / {quantQuestions.length} correct
          </p>
        </div>
      </div> */}
          <div className="last-button">
            <button
              className="exit-results"
              onClick={() => navigate('/')}
            >
              Exit Results
            </button>
            <button
              className="exit-results"
              onClick={() => navigate('/Analytics')}
            >
              Analytics
            </button>
          </div>
        </div>
        </>
  );
};

export default ResultPage;