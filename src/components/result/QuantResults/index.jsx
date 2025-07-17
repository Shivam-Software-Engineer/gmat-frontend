import React from 'react';
import { MathJaxContext, MathJax } from 'better-react-mathjax';

const QuantResults = ({ quantQuestions, quantResponses, getQuestionStatus, setSelectedQuestion }) => {
  return (
    <MathJaxContext
      config={{
        loader: { load: ["[tex]/ams"] },
        tex: {
          inlineMath: [["$", "$"], ["\\(", "\\)"]],
          displayMath: [["$$", "$$"], ["\\[", "\\]"]],
          packages: { "[+]": ["ams"] },
        },
      }}
    >
      <table className="results-table">
        <thead>
          <tr className="table-header">
            <th className="header-cell">Question</th>
            <th className="header-cell">Your Answer</th>
            <th className="header-cell">Correct Answer</th>
            <th className="header-cell">Status</th>
          </tr>
        </thead>
        <tbody>
          {quantQuestions.map((question, index) => {
            const userAnswerIndex = quantResponses[index];
            const status = getQuestionStatus(userAnswerIndex, question.correct);
            const answerText = userAnswerIndex !== null ? question.options[userAnswerIndex] : 'Not attempted';

            return (
              <tr key={index} className={`table-row ${status}`}>
                <td className="table-cell clickable" onClick={() => setSelectedQuestion(index)}>
                  Q{index + 1}
                </td>
                <td className="table-cell">
                  <MathJax dynamic>{answerText}</MathJax>
                </td>
                <td className="table-cell">
                  <MathJax dynamic>{question.options[question.correct]}</MathJax>
                </td>
                <td className="table-cell">
                  <span className="status-indicator">
                    {status === 'correct' ? '✓' : status === 'incorrect' ? '✗' : '-'}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </MathJaxContext>
  );
};

export default QuantResults;
