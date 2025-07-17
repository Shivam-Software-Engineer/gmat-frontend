import React, { useState, useEffect } from 'react';

const StartTimer = ({ onTimeUp, testStarted }) => {
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute

  useEffect(() => {
    if (testStarted) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    if (timeLeft === 0) {
      clearInterval(timer);
      onTimeUp();
    }

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp, testStarted]);

  return (
    <div style={{
      padding: '12px',
      textAlign: 'left',
      margin: '5px 0',
      fontSize: 'clamp(1rem, 3vw, 1.2rem)', // responsive font size
      fontWeight: '600',
      color: timeLeft <= 10 ? '#d4290f' : '#d4290f',
    }}>
      <p style={{ margin: 0 }}>Time to begin: {timeLeft} sec</p>
    </div>
  );
};

export default StartTimer;