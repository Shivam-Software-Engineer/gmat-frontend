import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import "./style.css";

const renderPieChart = (data, index) => {
  const correctPatternId = `patternCorrect${data.name.replace(/\s/g, "")}`;
  const incorrectPatternId = "patternIncorrect";

  const pieData = [
    { name: "Correct", value: data.correct, fill: `url(#${correctPatternId})` },
    {
      name: "Incorrect",
      value: data.incorrect,
      fill: `url(#${incorrectPatternId})`,
    },
  ];

  return (
    <div key={index} className="chart-container">
      <h3 className="chart-title">{data.name}</h3>

      {/* - Accuracy: {data.accuracy}% */}
      <div className="chart-stats-wrapper">
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={190}>
            <PieChart>
              <defs>
                <pattern
                  id="patternCorrectVerbal"
                  patternUnits="userSpaceOnUse"
                  width="5"
                  height="5"
                >
                  <circle cx="3" cy="3" r="2" fill="#fed400ff" />
                </pattern>
                <pattern
                  id="patternCorrectQuantitative"
                  patternUnits="userSpaceOnUse"
                  width="5"
                  height="5"
                >
                  <rect width="6" height="6" fill="#54ccfcff" />
                  <line
                    x1="0"
                    y1="0"
                    x2="6"
                    y2="6"
                    stroke="#fff"
                    strokeWidth="1"
                  />
                </pattern>
                <pattern
                  id="patternCorrectDataInsights"
                  patternUnits="userSpaceOnUse"
                  width="5"
                  height="5"
                >
                  <circle cx="3" cy="2" r="3" fill="#3eed6fff" />
                </pattern>
                <pattern
                  id="patternIncorrect"
                  patternUnits="userSpaceOnUse"
                  width="5"
                  height="5"
                >
                  <rect width="6" height="6" fill="#fa1807" />
                  <line
                    x1="0"
                    y1="0"
                    x2="6"
                    y2="6"
                    stroke="#fff"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={70}
                dataKey="value"
              >
                {pieData.map((entry, i) => (
                  <Cell key={`cell-${i}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
              <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ marginTop: 50 }}
            />


            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="stats-details">
          <p>Total Questions: {data.total}</p>
          <p>Correct: {data.correct}</p>
          <p>Incorrect: {data.incorrect}</p>
        </div>
      </div>

      {/* Type-wise Score Breakdown Table */}
      {data.breakdown && data.breakdown.length > 0 && (
        <div className="breakdown-table">
          <table>
            <thead>
              <tr>
                <th>Question Type</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {data.breakdown.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.type}</td>
                  <td>{item.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default renderPieChart;
