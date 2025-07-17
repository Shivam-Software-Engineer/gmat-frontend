export const calculateScore = (questions, getQuestionStatus, dataResponses) => {
  return questions.reduce((score, question, index) => {
    const status = getQuestionStatus(question, index, dataResponses);
    if (status === 'correct') return score + 1;
    if (status === 'partial') return score + 0.5;
    return score;
  }, 0);
};
