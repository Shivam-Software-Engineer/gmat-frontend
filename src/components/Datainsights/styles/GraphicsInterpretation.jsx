import React, { useState } from 'react';
import './graphics.css';

const GraphicsInterpretation = ({ question, onAnswer }) => {
  const [selectedOptions, setSelectedOptions] = useState(
    Array(question.prompts.length).fill(null)
  );

  const handleOptionSelect = (promptIndex, value) => {
    const newSelected = [...selectedOptions];
    newSelected[promptIndex] = value;
    setSelectedOptions(newSelected);
    onAnswer(promptIndex, value);
  };

  return (
    <div className="graphics-container">
      <div className="chart-container">
        <div className="left-container">
          <h5 className="question-heading">{question.question}</h5>
          <div className="chart-images">
            {question.chartImages.map((imgSrc, idx) => (
              <img
                key={idx}
                src={imgSrc}
                alt={`Chart ${idx + 1}`}
                className="chart-image"
              />
            ))}
          </div>
        </div>
        <div className="right-container">
          <p className="chart-description">{question.chartDescription}</p>
          <div className="prompts-container">
            {question.prompts.map((prompt, index) => {
              const [beforeBlank, afterBlank] = prompt.statement.split("_____");
              return (
                <div key={index} className="prompt">
                  <p className="prompt-statement">
                    {beforeBlank}
                    <select
                      value={selectedOptions[index] || ""}
                      onChange={(e) => handleOptionSelect(index, e.target.value)}
                      className="dropdown-select"
                    >
                      <option value="" disabled>
                        Select----
                      </option>
                      {prompt.options.map((option, optIndex) => (
                        <option key={optIndex} value={optIndex}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {afterBlank}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphicsInterpretation;