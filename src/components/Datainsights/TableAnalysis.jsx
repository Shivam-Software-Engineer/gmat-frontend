import React, { useState } from 'react';
import "./styles/tableAna.css";

const TableAnalysis = ({ question, onAnswer, text, text1,text3}) => {
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleOptionClick = (promptIndex, optionIndex) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [promptIndex]: optionIndex
    }));
    onAnswer(promptIndex, optionIndex);
  };

  return (
    <div className="table-analysis-container">
      <div className="data-table-container">
        <h3>{question.question}</h3>
        {/* Show text and text1 if available */}
        {text && <p className="table-description">{text}</p>}
        {text1 && <p className="table-description">{text1}</p>}
        <table className="data-table">
          <thead>
            <tr>
              {question.tableData.headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {question.tableData.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prompts-table-container">
        <table className="prompts-table">
          {text3 && <p className="table-description">{text3}</p>}
          <thead>
            <tr>
              <th>Statement</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {question.prompts.map((prompt, index) => (
              <tr key={index} className="prompt-row">
                <td className="prompt-statement">
                  {prompt.statement}
                </td>
                <td className="prompt-options">
                  {prompt.options.map((option, optIndex) => (
                    <button
                      key={optIndex}
                      className={`prompt-option ${selectedOptions[index] === optIndex ? 'selected' : ''}`}
                      onClick={() => handleOptionClick(index, optIndex)}
                    >
                      {option}
                    </button>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableAnalysis;
