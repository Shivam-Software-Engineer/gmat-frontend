import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dataInsightsQuestions } from '../../../data/dataInsightsQuestions';
import './style.css';
import { MathJax, MathJaxContext } from 'better-react-mathjax';

const DataResults = () => {
  const navigate = useNavigate();
  const [dataResponses, setDataResponses] = useState({});
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  useEffect(() => {
    const dataRes = JSON.parse(localStorage.getItem('dataAnswers')) || {};
    setDataResponses(dataRes);
  }, []);

  const getQuestionStatus = (question, index) => {
    if (question.type === "TwoPartAnalysis") {
      const response = dataResponses[index];
      const col1Correct = response?.[0] === question.answer[0];
      const col2Correct = response?.[1] === question.answer[1];
      return (col1Correct && col2Correct) ? 'correct' : 'incorrect';
    }

    if (question.type === "DataSufficiency") {
      const response = dataResponses[index];
      return Number(response?.[0]) === question.answer ? 'correct' : 'incorrect';
    }

    if (question.prompts) {
      const allCorrect = question.prompts.every((prompt, i) => {
        if (prompt.type === 'table') {
          return prompt.rows.every((row, rowIndex) =>
            Number(dataResponses[index]?.[String(rowIndex)]) === row.answer
          );
        }
        return dataResponses[index]?.[i] === prompt.answer;
      });
      return allCorrect ? 'correct' : 'incorrect';
    }
    return dataResponses[index] === question.answer ? 'correct' : 'incorrect';
  };
  
  // Helper function to get answer text
const getDisplayAnswers = (question, index) => {
  const response = dataResponses[index];
  
  // Helper function to get answer text
  const getAnswerText = (answerValue, options) => {
    if (options && options[answerValue] !== undefined) {
      return options[answerValue];
    }
    return answerValue !== undefined ? answerValue : '_';
  };

  // TwoPartAnalysis - keep existing implementation
  if (question.type === "TwoPartAnalysis") {
    const col1Response = getAnswerText(response?.[0], question.options);
    const col2Response = getAnswerText(response?.[1], question.options);
    const col1Answer = getAnswerText(question.answer[0], question.options);
    const col2Answer = getAnswerText(question.answer[1], question.options);
    
    return {
      yourAnswer: `${col1Response}, ${col2Response}`,
      correctAnswer: `${col1Answer}, ${col2Answer}`
    };
  }

  // DataSufficiency - keep existing implementation
  if (question.type === "DataSufficiency") {
    return {
      yourAnswer: getAnswerText(response?.[0], question.options),
      correctAnswer: getAnswerText(question.answer, question.options)
    };
  }

  // GraphicsInterpretation - show prompt answers
  if (question.type === "GraphicsInterpretation") {
    if (question.prompts) {
      const userAnswers = question.prompts.map((prompt, i) => 
        getAnswerText(response?.[i], prompt.options)
      ).join(", ");
      
      const correctAnswers = question.prompts.map(prompt => 
        getAnswerText(prompt.answer, prompt.options)
      ).join(", ");
      
      return {
        yourAnswer: userAnswers || 'Not attempted',
        correctAnswer: correctAnswers
      };
    }
  }

  // TableAnalysis - show prompt answers
  if (question.type === "TableAnalysis") {
    if (question.prompts) {
      const userAnswers = question.prompts.map((prompt, i) => 
        getAnswerText(response?.[i], prompt.options)
      ).join(", ");
      
      const correctAnswers = question.prompts.map(prompt => 
        getAnswerText(prompt.answer, prompt.options)
      ).join(", ");
      
      return {
        yourAnswer: userAnswers || 'Not attempted',
        correctAnswer: correctAnswers
      };
    }
  }

    // MultiSourceReasoning - simplified display for table prompts
  if (question.type === "MultiSourceReasoning") {
    if (question.prompts) {
      if (question.prompts[0]?.type === 'table') {
        const prompt = question.prompts[0];
        
        // Format user answers as just "Yes/No" values
        const userAnswers = prompt.rows.map((row, rowIndex) => {
          const userAnswerIndex = dataResponses[index]?.[String(rowIndex)];
          return userAnswerIndex !== undefined 
            ? row.options[userAnswerIndex] 
            : '-';
        }).join(', ');
        
        // Format correct answers as just "Yes/No" values
        const correctAnswers = prompt.rows.map(row => {
          return row.options[row.answer];
        }).join(', ');
        
        return {
          yourAnswer: userAnswers || 'Not attempted',
          correctAnswer: correctAnswers
        };
      } else {
        // For non-table prompts in MSR
        const userAnswers = question.prompts.map((prompt, i) => {
          const userAnswerIndex = dataResponses[index]?.[i];
          return userAnswerIndex !== undefined 
            ? prompt.options[userAnswerIndex] 
            : '-';
        }).join(', ');
        
        const correctAnswers = question.prompts.map(prompt => {
          return prompt.options[prompt.answer];
        }).join(', ');
        
        return {
          yourAnswer: userAnswers || 'Not attempted',
          correctAnswer: correctAnswers
        };
      }
    }
  }

  // Default case for simple questions
  return {
    yourAnswer: getAnswerText(response, question.options),
    correctAnswer: getAnswerText(question.answer, question.options)
  };
};

  const calculateScore = () => {
    return dataInsightsQuestions.reduce((score, question, index) => {
      const status = getQuestionStatus(question, index);
      if (status === 'correct') return score + 1;
      if (status === 'partial') return score + 0.5;
      return score;
    }, 0);
  };

  const renderQuestionDetail = () => {
    if (selectedQuestion === null) return null;
    const question = dataInsightsQuestions[selectedQuestion];

    switch (question.type) {
      case 'TableAnalysis':
        return (
          <div className="question-detail">
            <div className="question-header">
              <h3>Question {selectedQuestion + 1} - Table Analysis</h3>
              <button onClick={() => setSelectedQuestion(null)}>Back to Results</button>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    {question.tableData.headers.map((header, i) => (
                      <th key={i}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {question.tableData.rows.map((row, i) => (
                    <tr key={i}>
                      {row.map((cell, j) => (
                        <td key={j}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {question.prompts.map((prompt, i) => {
              const userAnswer = dataResponses[selectedQuestion]?.[i];
              const isCorrect = userAnswer === prompt.answer;
              return (<>
                <div key={i} className="prompt-result">
                  <h4>Prompt {i + 1}: {prompt.statement}</h4>
                  <p className={isCorrect ? 'correct' : 'incorrect'}>
                    Your answer: {userAnswer !== undefined ? prompt.options[userAnswer] : 'Not attempted'}
                  </p>
                  <p>Correct answer: {prompt.options[prompt.answer]}</p>
                </div>
                <MathJaxContext>
                  <MathJax>
                    <div className="explanation" dangerouslySetInnerHTML={{ __html: prompt.explanation }} />
                  </MathJax>
                </MathJaxContext>
              </>
              );
            })}
          </div>
        );

      case 'GraphicsInterpretation':
        return (
          <div className="question-detail">
            <div className="question-header">
              <h3>Question {selectedQuestion + 1} - Graphics Interpretation</h3>
              <button onClick={() => setSelectedQuestion(null)}>Back to Results</button>
            </div>
            <div className="chart-container">
              {question.chartImages.map((imgSrc, idx) => (
                <img
                  key={idx}
                  src={imgSrc}
                  alt={`Chart ${idx + 1}`}
                  className="chart-image"
                />
              ))}
              <p>{question.chartDescription}</p>
            </div>
            {question.prompts.map((prompt, i) => {
              const userAnswer = dataResponses[selectedQuestion]?.[i];
              const isCorrect = userAnswer === prompt.answer;
              return (
                <div key={i} className="prompt-result">
                  <h4>Prompt {i + 1}: {prompt.statement}</h4>
                  <p className={isCorrect ? 'correct' : 'incorrect'}>
                    Your answer: {userAnswer !== undefined ? prompt.options[userAnswer] : 'Not attempted'}
                  </p>
                  <p>Correct answer: {prompt.options[prompt.answer]}</p>
                  <MathJaxContext>
                    <MathJax>
                      <div className="explanation" dangerouslySetInnerHTML={{ __html: prompt.explanation }} />
                    </MathJax>
                  </MathJaxContext>
                </div>
              );
            })}
          </div>
        );

      case 'DataSufficiency':
        const userResponse = dataResponses[selectedQuestion];
        const userAnswer = userResponse ? userResponse[0] : undefined;
        const isCorrect = Number(userAnswer) === question.answer;

        return (
          <div className="question-detail">
            <div className="question-header">
              <h3>Question {selectedQuestion + 1} - Data Sufficiency</h3>
              <button onClick={() => setSelectedQuestion(null)}>Back to Results</button>
            </div>

            <h4>{question.question}</h4>
            <div className="statements">
              {question.statements.map((stmt, i) => (
                <p key={i}>{`${i + 1}. ${stmt}`}</p>
              ))}
            </div>

            <div className="data-sufficiency-results">
              <p className={isCorrect ? 'correct' : 'incorrect'}>
                Your Answer: {userAnswer !== undefined ? question.options[userAnswer] : 'Not attempted'}
              </p>
              <p>Correct Answer: {question.options[question.answer]}</p>
              <MathJaxContext>
                <MathJax>
                  <div dangerouslySetInnerHTML={{ __html: question.explanation }} />
                </MathJax>
              </MathJaxContext>
            </div>
          </div>
        );

      case 'MultiSourceReasoning':
        return (
          <div className="question-detail">
            <div className="question-header">
              <h3>Question {selectedQuestion + 1} - Multi-Source Reasoning</h3>
              <button onClick={() => setSelectedQuestion(null)}>Back to Results</button>
            </div>

            <div className="tabs-container">
              {Object.entries(question.tabs).map(([tabName, content]) => (
                <div key={tabName} className="tab-content">
                  <h4>{tabName}</h4>
                  <MathJaxContext>
                    <MathJax>
                      <div
                        className="tab-body"
                        dangerouslySetInnerHTML={{ __html: content }}
                      />
                    </MathJax>
                  </MathJaxContext>
                </div>
              ))}
            </div>


            {question.prompts.map((prompt, i) => {
              const response = dataResponses[selectedQuestion];
              const userAnswer = response?.[i];
              const isCorrect = userAnswer === prompt.answer;

              if (prompt.type === 'table') {
                return (
                  <div key={i} className="prompt-result">
                    <h4>{prompt.statement}</h4>
                    <table className="prompt-table">
                      <thead>
                        <tr>
                          <th>Statement</th>
                          <th>Your Answer</th>
                          <th>Correct Answer</th>
                        </tr>
                      </thead>
                      <tbody>
                        {prompt.rows.map((row, rowIndex) => {
                          const rowResponse = response?.[String(rowIndex)];
                          const rowCorrect = rowResponse !== undefined && Number(rowResponse) === row.answer;
                          return (
                            <tr key={rowIndex}>
                              <td>{row.statement}</td>
                              <td className={rowCorrect ? 'correct' : 'incorrect'}>
                                {rowResponse !== undefined ? row.options[rowResponse] : 'Not attempted'}
                              </td>
                              <td>{row.options[row.answer]}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <MathJaxContext>
                      <MathJax>
                        <div className="explanation" dangerouslySetInnerHTML={{ __html: prompt.explanation || 'No explanation provided.' }} />
                      </MathJax>
                    </MathJaxContext>
                  </div>
                );
              }

              return (
                <div key={i} className="prompt-result">
                  <h4>Prompt {i + 1}: {prompt.statement}</h4>
                  <p className={isCorrect ? 'correct' : 'incorrect'}>
                    Your answer: {userAnswer !== undefined ? prompt.options[userAnswer] : 'Not attempted'}
                  </p>
                  <p>Correct answer: {prompt.options[prompt.answer]}</p>
                  <MathJaxContext>
                    <MathJax>
                      <div className="explanation" dangerouslySetInnerHTML={{ __html: prompt.explanation || 'No explanation provided.' }} />
                    </MathJax>
                  </MathJaxContext>

                </div>
              );
            })}
          </div>
        );

      case 'TwoPartAnalysis':

        const response = dataResponses[`${question.id}` - 1] || [];
        const col1Response = response[0];
        const col2Response = response[1];
        const col1Correct = col1Response === question.answer[0];
        const col2Correct = col2Response === question.answer[1];

        return (
          <div className="question-detail">
            <div className="question-header">
              <h3>Question {selectedQuestion + 1} - Two-Part Analysis</h3>
              <button onClick={() => setSelectedQuestion(null)}>Back to Results</button>
            </div>

            <h4>{question.question}</h4>
            <p>{question.statement}</p>
            <div className="two-part-results">
              <div className={`part-result ${col1Response !== undefined ? (col1Correct ? 'correct' : 'incorrect') : ''}`}>
                <h5>{question.tableHeadings.column1}:</h5>
                <p>Your answer: {col1Response !== undefined ? question.options[col1Response] : 'Not attempted'}</p>
                <p>Correct answer: {question.options[question.answer[0]]}</p>
              </div>
              <div className={`part-result ${col2Response !== undefined ? (col2Correct ? 'correct' : 'incorrect') : ''}`}>
                <h5>{question.tableHeadings.column2}:</h5>
                <p>Your answer: {col2Response !== undefined ? question.options[col2Response] : 'Not attempted'}</p>
                <p>Correct answer: {question.options[question.answer[1]]}</p>
              </div>
            </div>
            <MathJaxContext>
              <MathJax>
                <div className="explanation" dangerouslySetInnerHTML={{ __html: question.explanation }} />
              </MathJax>
            </MathJaxContext>
          </div>
        );

      default:
        return (
          <div className="question-detail">
            <div className="question-header">
              <h3>Question {selectedQuestion + 1} - {question.type}</h3>
              <button onClick={() => setSelectedQuestion(null)}>Back to Results</button>
            </div>
            <h4>{question.question}</h4>
            {question.options && (
              <div className="options-result">
                <p className={dataResponses[selectedQuestion] === question.answer ? 'correct' : 'incorrect'}>
                  Your answer: {dataResponses[selectedQuestion] !== undefined ?
                    question.options[dataResponses[selectedQuestion]] : 'Not attempted'}
                </p>
                <p>Correct answer: {question.options[question.answer]}</p>
              </div>
            )}
            <MathJaxContext>
              <MathJax>
                <div className="explanation" dangerouslySetInnerHTML={{ __html: question.explanation }} />
              </MathJax>
            </MathJaxContext>
          </div>
        );
    }
  };
  
if (selectedQuestion !== null) {
    return renderQuestionDetail();
  }

   return (
    <div className="result-page">
      <table className="results-table">
        <thead>
          <tr className='table-header'>
            <th className="header-cell">Question</th>
            <th className="header-cell">Your Answer</th>
            <th className="header-cell">Correct Answer</th>
            <th className="header-cell">Status</th>
          </tr>
        </thead>

        {/* ✅ Updated table body with display answers */}
        <tbody>
          {dataInsightsQuestions.map((question, index) => {
            const status = getQuestionStatus(question, index);
            const { yourAnswer, correctAnswer } = getDisplayAnswers(question, index);

            return (
              <tr
                key={index}
                className={`table-row ${status}`}
                onClick={() => setSelectedQuestion(index)}
              >
                <td className="table-cell clickable">Q {index + 1}</td>
                <td className="table-cell">{yourAnswer}</td>
                <td className="table-cell">{correctAnswer}</td>
                <td className="table-cell">
                  {status === 'correct' && '✓'}
                  {status === 'incorrect' && '✗'}
                  {status === 'unattempted' && '- Unattempted'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <button className="exit-button" onClick={() => navigate('/')}>
        Return to Dashboard
      </button>
    </div>
  );
};

export default DataResults;