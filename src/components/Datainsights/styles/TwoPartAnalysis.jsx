import React, { useState } from 'react';
import "./styles/twopart.css";

const TwoPartAnalysis = ({ question, onAnswer }) => {
  const [selectedOptions, setSelectedOptions] = useState([null, null]);

  const handleSelect = (columnIndex, optionIndex) => {
    const newSelected = [...selectedOptions];
    newSelected[columnIndex] = optionIndex;
    setSelectedOptions(newSelected);
    onAnswer(columnIndex, optionIndex);

  };

  return (
    <div className="two-part-container">
      <h3 className="two-part-question">{question.question}</h3>
      <h3 className="two-part-question">{question.statement}</h3>
      <div className="two-part-table">
        <div className="two-part-table-header">
          <div className="table-cell header-cell">{question.tableHeadings.column1}</div>
          <div className="table-cell header-cell">{question.tableHeadings.column2}</div>
        </div>

        {question.options.map((option, index) => (
          <div className="two-part-table-row" key={index}>
            <div className="table-cell">
              <button
                className={`option-button ${selectedOptions[0] === index ? 'selected' : ''}`}
                onClick={() => handleSelect(0, index)}
              >
                {option}
              </button>
            </div>
            <div className="table-cell">
              <button
                className={`option-button ${selectedOptions[1] === index ? 'selected' : ''}`}
                onClick={() => handleSelect(1, index)}
              >
                {option}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TwoPartAnalysis;