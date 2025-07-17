import React from 'react';
import { MathJax, MathJaxContext } from 'better-react-mathjax';

export const renderQuestionDetail = (question, selectedQuestion, setSelectedQuestion, dataResponses) => {
  const response = dataResponses[selectedQuestion];
  const userAnswer = response?.[0];
  const isCorrect = Number(userAnswer) === question.answer;

  // you can copy your existing switch-case here, replacing `dataResponses` and `selectedQuestion` from props

  return (
    <div>
      <h3>Render logic for {question.type}</h3>
      {/* Copy your existing rendering JSX for each case */}
    </div>
  );
};
