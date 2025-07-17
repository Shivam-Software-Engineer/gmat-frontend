import { useEffect, useState } from 'react';
import './styles/MultiSourceReasoning.css';

const MultiSourceReasoning = ({ question, onAnswer }) => {
  const [activeTab, setActiveTab] = useState('');
  const [selectedAnswers, setSelectedAnswers] = useState({});

  useEffect(() => {
    if (question && question.tabs) {
      setActiveTab(Object.keys(question.tabs)[0]);
      setSelectedAnswers({}); // <- Clear previous selections here
    }
  }, [question]);

  const handleOptionClick = (promptIndex, optionIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [`${promptIndex}`]: optionIndex
    }));
    onAnswer(promptIndex, optionIndex);
  };

  const handleTableClick = (promptIndex, rowIndex, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [`${promptIndex}_${rowIndex}`]: answerIndex
    }));
    onAnswer(rowIndex, answerIndex);
  };

  if (!question) {
    return <div>Question not available</div>;
  }

  return (
    <div className="msr-container">
      <h3 className="msr-question">{question.question}</h3>
      <div className="msr-content">
        {/* Left side - Reports and content */}
        <div className="msr-left-panel">
          {question.tabs && (
            <>
              <div className="msr-tabs">
                {Object.keys(question.tabs).map((tabName) => (
                  <button
                    key={tabName}
                    className={`msr-tab ${activeTab === tabName ? "active" : ""}`}
                    onClick={() => setActiveTab(tabName)}
                  >
                    {tabName}
                  </button>
                ))}
              </div>

              <div className="msr-tab-content">
                <div className="msr-tab-content-inner">
                  <div
                    className="msr-tab-content-body"
                    dangerouslySetInnerHTML={{ __html: question.tabs[activeTab] }}
                  ></div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right side - Prompts and options */}
        <div className="msr-right-panel">
          {question.prompts && question.prompts.length > 0 ? (
            <div className="msr-prompts">
              {question.prompts.map((prompt, promptIndex) => (
                <div key={promptIndex} className="msr-prompt">
                  <p className="msr-prompt-statement">{prompt.statement}</p>

                  {prompt.type === "table" ? (
                    <div className="msr-table-container">
                      <table className="msr-table">
                        <thead>
                          <tr>
                            <th>Statement</th>
                            {prompt.rows[0].options.map((opt, optIndex) => (
                              <th key={optIndex}>{opt}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {prompt.rows.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                              <td>{row.statement}</td>
                              {row.options.map((option, answerIndex) => (
                                <td key={answerIndex}>
                                  <button
                                    className={`msr-table-button ${
                                      selectedAnswers[`${promptIndex}_${rowIndex}`] === answerIndex
                                        ? "selected"
                                        : ""
                                    }`}
                                    onClick={() => handleTableClick(promptIndex, rowIndex, answerIndex)}
                                  >
                                    {option}
                                  </button>
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="msr-options-table">
                      {prompt.options.map((option, optIndex) => (
                        <div
                          key={optIndex}
                          className={`msr-option-cell ${
                            selectedAnswers[`${promptIndex}`] === optIndex ? "selected" : ""
                          }`}
                          onClick={() => handleOptionClick(promptIndex, optIndex)}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="msr-no-prompts">No prompts available for this question.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiSourceReasoning;
