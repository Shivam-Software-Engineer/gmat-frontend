const getQuestionStatus = (question, index, dataResponses) => {
  if (question.type === "TwoPartAnalysis") {
    const response = dataResponses[index];
    if (!response) return 'unattempted';
    const col1Correct = response[0] === question.answer[0];
    const col2Correct = response[1] === question.answer[1];
    return col1Correct && col2Correct ? 'correct' :
      (response[0] !== undefined || response[1] !== undefined) ? 'incorrect' : 'unattempted';
  }

  if (question.type === "DataSufficiency") {
    const response = dataResponses[index];
    if (response === undefined) return 'unattempted';
    return Number(response[0]) === question.answer ? 'correct' : 'incorrect';
  }

  if (question.prompts) {
    const hasResponse = question.prompts.some((prompt, i) => {
      if (prompt.type === 'table') {
        return prompt.rows.some((_, rowIndex) =>
          dataResponses[index]?.[String(rowIndex)] !== undefined
        );
      }
      return dataResponses[index]?.[i] !== undefined;
    });

    const allCorrect = question.prompts.every((prompt, i) => {
      if (prompt.type === 'table') {
        return prompt.rows.every((row, rowIndex) =>
          Number(dataResponses[index]?.[String(rowIndex)]) === row.answer
        );
      }
      return dataResponses[index]?.[i] === prompt.answer;
    });

    return !hasResponse ? 'unattempted' : allCorrect ? 'correct' : 'incorrect';
  }

  return dataResponses[index] !== undefined
    ? (dataResponses[index] === question.answer ? 'correct' : 'incorrect')
    : 'unattempted';
};

export default getQuestionStatus;
