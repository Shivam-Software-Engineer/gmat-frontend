import calculateSectionStats from './calculateSectionStats';
import calculateDataInsightsStats from './calculateDataInsightsStats';
import verbalQuestions from '../../data/verbalQuestions';
import quantQuestions from '../../data/quantQuestions';
import { dataInsightsQuestions } from '../../data/dataInsightsQuestions';

const calculateAnalytics = (verbalResponses, quantResponses, dataResponses) => {
  const verbalStats = calculateSectionStats(verbalResponses, verbalQuestions, 'answer');
  const quantStats = calculateSectionStats(quantResponses, quantQuestions, 'correct');
  const dataStats = calculateDataInsightsStats(dataResponses);

  // breakdown for Verbal
  const verbalBreakdown = [];
  const verbalTypes = [...new Set(verbalQuestions.map(q => q.type))];
  verbalTypes.forEach(type => {
    const typeQuestions = verbalQuestions.filter(q => q.type === type);
    const total = typeQuestions.length;
    let correct = 0;

    typeQuestions.forEach(q => {
      const index = verbalQuestions.indexOf(q);
      if (verbalResponses[index] !== null && verbalResponses[index] === q.answer) {
        correct += 1;
      }
    });

    verbalBreakdown.push({
      type,
      score: `${correct}/${total}`
    });
  });

  // breakdown for Quantitative
  const quantBreakdown = [];
  const quantTypes = [...new Set(quantQuestions.map(q => q.type))];
  quantTypes.forEach(type => {
    const typeQuestions = quantQuestions.filter(q => q.type === type);
    const total = typeQuestions.length;
    let correct = 0;

    typeQuestions.forEach(q => {
      const index = quantQuestions.indexOf(q);
      if (quantResponses[index] !== null && quantResponses[index] === q.correct) {
        correct += 1;
      }
    });

    quantBreakdown.push({
      type,
      score: `${correct}/${total}`
    });
  });

  // breakdown for Data Insights
const dataBreakdown = [];
const dataTypes = [...new Set(dataInsightsQuestions.map(q => q.type))];

dataTypes.forEach(type => {
  const typeQuestions = dataInsightsQuestions.filter(q => q.type === type);
  const total = typeQuestions.length;
  let correct = 0;

  typeQuestions.forEach(q => {
    // const id = String(q.id);
    if (dataResponses[q.id]?.isCorrect) {
      correct += 1;
    }
  });

  dataBreakdown.push({
    type,
    score: `${correct}/${total}`
  });
});

  return [
    {
      name: 'Verbal',
      total: verbalQuestions.length,
      correct: verbalStats.correct,
      incorrect: verbalStats.incorrect,
      accuracy: Math.round((verbalStats.correct / verbalQuestions.length) * 100),
      breakdown: verbalBreakdown
    },
    {
      name: 'Quantitative',
      total: quantQuestions.length,
      correct: quantStats.correct,
      incorrect: quantStats.incorrect,
      accuracy: Math.round((quantStats.correct / quantQuestions.length) * 100),
      breakdown: quantBreakdown
    },
    {
      name: 'Data Insights',
      total: dataInsightsQuestions.length,
      correct: dataStats.correct,
      incorrect: dataStats.incorrect,
      accuracy: Math.round((dataStats.correct / dataInsightsQuestions.length) * 100),
      breakdown: dataBreakdown
    }
  ];
};

export default calculateAnalytics;
