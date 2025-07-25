import getQuestionStatus from './getQuestionStatus';
import { dataInsightsQuestions } from '../../data/dataInsightsQuestions';

const calculateDataInsightsStats = (dataResponses) => {
  let correct = 0;
  let total = dataInsightsQuestions.length;

  dataInsightsQuestions.forEach((question, index) => {
    const status = getQuestionStatus(question, index, dataResponses);

    // Set isCorrect status for later breakdown
    const id = String(question.id);
    if (!dataResponses[id]) dataResponses[id] = {};  // Ensure it exists

    dataResponses[id].isCorrect = status === 'correct';

    if (status === 'correct') correct += 1;
  });

  const incorrect = total - correct;
  return { correct, incorrect };
};

export default calculateDataInsightsStats;
