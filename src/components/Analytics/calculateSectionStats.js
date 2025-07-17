const calculateSectionStats = (responses, questions, correctKey) => {
  const correct = questions.reduce((count, question, index) => {
    return responses[index] === question[correctKey] ? count + 1 : count;
  }, 0);

  const total = questions.length;
  const incorrect = total - correct;

  return { correct, incorrect };
};

export default calculateSectionStats;
