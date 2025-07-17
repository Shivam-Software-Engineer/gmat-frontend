export const getQuestionStatus = (question, index, dataResponses) => {
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
