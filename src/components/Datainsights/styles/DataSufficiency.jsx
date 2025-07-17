import React, { useState } from 'react';
import "./styles/DataSufficiency.css";

const DataSufficiency = ({ question, onAnswer }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (index) => {
    setSelectedOption(index);
    onAnswer(0, index); // Adjust if necessary
  };

  return (
    <div className="data-sufficiency">
      <h3>{question.question}</h3>
      <div className="statements">
        {question.statements.map((statement, index) => (
          <p key={index} className="statement">
            ({index + 1}) {statement}
          </p>
        ))}
      </div>

      <div className="options">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(index)}
            className={selectedOption === index ? "select" : ""}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DataSufficiency;
