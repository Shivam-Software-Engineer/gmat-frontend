import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import './RenderOverallPieChart.css';

const RenderOverallPieChart = ({ analyticsData }) => {
  if (!analyticsData || !analyticsData.length) {
    return (
      <div className="overall-pie-container">
        <p>No data available</p>
      </div>
    );
  }

  // Process data, ensuring we don't show negative values
  const pieData = analyticsData.map(section => ({
    name: section.name,
    value: Math.max(section.correct, 0.01),
    displayValue: section.correct,
    total: section.total
  }));

  const totalCorrect = pieData.reduce((sum, item) => sum + item.displayValue, 0);
  const totalQuestions = pieData.reduce((sum, item) => sum + item.total, 0);
  const percentageScore = Math.round((totalCorrect / totalQuestions) * 100);

  // Define color patterns for different sections
  const sectionPatterns = {
    Verbal: {
      id: 'patternVerbal',
      pattern: (
        <pattern id="patternVerbal" patternUnits="userSpaceOnUse" width="6" height="6">
          <circle cx="3" cy="3" r="2" fill="#fed400" />
        </pattern>
      )
    },
    Quantitative: {
      id: 'patternQuant',
      pattern: (
        <pattern id="patternQuant" patternUnits="userSpaceOnUse" width="6" height="6">
          <rect width="6" height="6" fill="#54ccfc" />
          <line x1="0" y1="0" x2="6" y2="6" stroke="#fff" strokeWidth="1" />
        </pattern>
      )
    },
    'Data Insights': {
      id: 'patternDataInsights',
      pattern: (
        <pattern id="patternDataInsights" patternUnits="userSpaceOnUse" width="6" height="6">
          <circle cx="3" cy="2" r="3" fill="#3eed6f" />
        </pattern>
      )
    }
  };

  return (
    <div className="overall-pie-container">
      <h2 className="overall-pie-title">Assessment Summary</h2>
      
      <div className="overall-pie-content">
        {/* Pie Chart */}
        <div className="overall-pie-chart">
          <ResponsiveContainer width="100%" height="100%">
  <PieChart>
    <defs>
      <pattern id="patternCorrect" patternUnits="userSpaceOnUse" width="6" height="6">
        <circle cx="3" cy="3" r="2" fill="#4CAF50" />
      </pattern>
      <pattern id="patternIncorrect" patternUnits="userSpaceOnUse" width="6" height="6">
        <rect width="6" height="6" fill="#f44336" />
        <line x1="0" y1="0" x2="6" y2="6" stroke="#fff" strokeWidth="1" />
      </pattern>
    </defs>

    <Pie
      data={[
        { name: 'Correct', value: totalCorrect },
        { name: 'Incorrect', value: totalQuestions - totalCorrect },
      ]}
      cx="50%"
      cy="50%"
      innerRadius={60}
      outerRadius={80}
      dataKey="value"
      startAngle={90}
      endAngle={450}
    >
      <Cell fill="url(#patternCorrect)" />
      <Cell fill="url(#patternIncorrect)" />
    </Pie>

    {/* Center text */}
    <text 
      x="50%" 
      y="45%" 
      textAnchor="middle" 
      dominantBaseline="middle" 
      style={{
        fontSize: '20px',
        fontWeight: '600',
        fill: '#333'
      }}
    >
      {totalCorrect}/{totalQuestions}
    </text>
    <text 
      x="50%" 
      y="55%" 
      textAnchor="middle" 
      dominantBaseline="middle" 
      style={{
        fontSize: '14px',
        fill: '#666'
      }}
    >
      ({percentageScore}%)
    </text>
  </PieChart>
</ResponsiveContainer>

        </div>

        {/* Breakdown Stats */}
        <div className="overall-pie-stats">
          <h3 className="overall-pie-stats-title">Section Breakdown</h3>
          <ul className="overall-pie-stats-list">
            {pieData.map((item, i) => (
              <li key={i} className="overall-pie-stats-item">
                <span className="overall-pie-stats-name">{item.name}:</span>
                <span>{item.displayValue}/{item.total}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

RenderOverallPieChart.propTypes = {
  analyticsData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      correct: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired
    })
  ).isRequired
};

export default RenderOverallPieChart;