const VerbalResults = ({ verbalQuestions, verbalResponses, getQuestionStatus, setSelectedQuestion }) => {
  return (
    <table className="results-table">
      <thead>
        <tr className="table-header">
          <th className="header-cell">Question</th>
          {/* <th className="header-cell">Type</th> */}
          <th className="header-cell">Your Answer</th>
          <th className="header-cell">Correct Answer</th>
          <th className="header-cell">Status</th>
        </tr>
      </thead>
      <tbody>
        {verbalQuestions.map((question, index) => {
          const userAnswerIndex = verbalResponses[index];
          const status = getQuestionStatus(userAnswerIndex, question.answer);
          const answerText = userAnswerIndex !== null ? question.options[userAnswerIndex] : 'Not attempted';

          return (
            <tr key={index} className={`table-row ${status}`}>
              <td className="table-cell clickable" onClick={() => setSelectedQuestion(index)}>
                Q{index + 1}
              </td>
              {/* <td className="table-cell">{question.type}</td> */}
              <td className="table-cell">{answerText}</td>
              <td className="table-cell">{question.options[question.answer]}</td>
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
  );
};

export default VerbalResults;
