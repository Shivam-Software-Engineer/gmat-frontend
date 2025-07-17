const getFeedbackMessage = (name, correct, total) => {
  const percentage = (correct / total) * 100;

  if (name === 'Verbal') {
    if (correct <= 2) return 'Ah, better luck next time! Verbal needs work, but with some smart practice, you\'ll get there.';
    if (correct <= 6) return 'Good effort! With a little more practice, you’re well on your way to a top score.';
    if (correct === total) return 'Whoa, that’s a perfect score. Verbal wizardry at its finest!';
  }

  if (name === 'Quantitative') {
    if (correct <= 2) return 'Maths looking scary? A little revision and number-crunching will turn things around.';
    if (correct <= 6) return 'Solid attempt! With a bit more speed and accuracy, you\'ll be unstoppable.';
    if (correct === total) return 'Genius alert! That was a quant masterclass. Well done!';
  }

  if (name === 'Data Insights') {
    if (correct <= 2) return 'Hmm, data got the better of you this time, but don’t worry—patterns get easier with practice.';
    if (correct <= 6) return 'Nice going! You’ve got a good eye for detail—sharpen it just a bit more.';
    if (correct === total) return 'Perfect score! Your brain clearly runs on charts and logic—brilliant!';
  }

  return 'Good progress — keep at it!';
};

export default getFeedbackMessage;
