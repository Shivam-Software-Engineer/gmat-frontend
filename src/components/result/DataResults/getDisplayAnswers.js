export const getDisplayAnswers = (question, index, dataResponses) => {
  const response = dataResponses[index];

  const getAnswerText = (value, options) => {
    if (options && options[value] !== undefined) return options[value];
    return value !== undefined ? value : '_';
  };

  if (question.type === "TwoPartAnalysis") {
    return {
      yourAnswer: `${getAnswerText(response?.[0], question.options)}, ${getAnswerText(response?.[1], question.options)}`,
      correctAnswer: `${getAnswerText(question.answer[0], question.options)}, ${getAnswerText(question.answer[1], question.options)}`
    };
  }

  if (question.type === "DataSufficiency") {
    return {
      yourAnswer: getAnswerText(response?.[0], question.options),
      correctAnswer: getAnswerText(question.answer, question.options)
    };
  }

  if (question.type === "GraphicsInterpretation" || question.type === "TableAnalysis") {
    const userAnswers = question.prompts.map((prompt, i) =>
      getAnswerText(response?.[i], prompt.options)
    ).join(", ");

    const correctAnswers = question.prompts.map(prompt =>
      getAnswerText(prompt.answer, prompt.options)
    ).join(", ");

    return {
      yourAnswer: userAnswers || 'Not attempted',
      correctAnswer: correctAnswers
    };
  }

  if (question.type === "MultiSourceReasoning") {
    if (question.prompts[0]?.type === 'table') {
      const prompt = question.prompts[0];
      const userAnswers = prompt.rows.map((row, rowIndex) => {
        const userAnswerIndex = dataResponses[index]?.[String(rowIndex)];
        return userAnswerIndex !== undefined ? row.options[userAnswerIndex] : '-';
      }).join(', ');

      const correctAnswers = prompt.rows.map(row =>
        row.options[row.answer]
      ).join(', ');

      return {
        yourAnswer: userAnswers || 'Not attempted',
        correctAnswer: correctAnswers
      };
    } else {
      const userAnswers = question.prompts.map((prompt, i) => {
        const userAnswerIndex = dataResponses[index]?.[i];
        return userAnswerIndex !== undefined ? prompt.options[userAnswerIndex] : '-';
      }).join(', ');

      const correctAnswers = question.prompts.map(prompt =>
        prompt.options[prompt.answer]
      ).join(', ');

      return {
        yourAnswer: userAnswers || 'Not attempted',
        correctAnswer: correctAnswers
      };
    }
  }

  return {
    yourAnswer: getAnswerText(response, question.options),
    correctAnswer: getAnswerText(question.answer, question.options)
  };
};
