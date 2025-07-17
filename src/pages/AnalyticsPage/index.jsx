// AnalyticsPage.js (updated responsive version)
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from "recharts";
import "./AnalyticsPage.css";
import Header from "../../components/header";
import verbalQuestions from "../../data/verbalQuestions";
import quantQuestions from "../../data/quantQuestions";
import { dataInsightsQuestions } from "../../data/dataInsightsQuestions";
import calculateAnalytics from "../../components/Analytics/calculateAnalytics";
import downloadAnalytics from "../../components/Analytics/downloadAnalytics";
import renderPieChart from "../../components/Analytics/renderPieChart";
import RenderOverallPieChart from "../../components/Analytics/renderOverallPieChart";
import getFeedbackMessage from "../../components/Analytics/getFeedbackMessage";

const AnalyticsPage = () => {
  const navigate = useNavigate();
  const [verbalResponses, setVerbalResponses] = useState([]);
  const [quantResponses, setQuantResponses] = useState([]);
  const [dataResponses, setDataResponses] = useState({});
  const [analyticsData, setAnalyticsData] = useState([]);

  useEffect(() => {
    const verbalRes =
      JSON.parse(localStorage.getItem("verbalAnswers")) ||
      Array(verbalQuestions.length).fill(null);
    const quantRes =
      JSON.parse(localStorage.getItem("quantAnswers")) ||
      Array(quantQuestions.length).fill(null);
    const dataRes = JSON.parse(localStorage.getItem("dataAnswers")) || {};
    setVerbalResponses(verbalRes);
    setQuantResponses(quantRes);
    setDataResponses(dataRes);
  }, []);

  useEffect(() => {
    if (
      verbalResponses.length &&
      quantResponses.length &&
      dataInsightsQuestions.length
    ) {
      const analytics = calculateAnalytics(
        verbalResponses,
        quantResponses,
        dataResponses
      );
      setAnalyticsData(analytics);
    }
  }, [verbalResponses, quantResponses, dataResponses]);

  return (
    <>
      <Header />
      <div className="analytics-container">
        <div className="analytics-page" id="analytics-report">
          <div className="summary-comparison">
            <div className="overall-summary">
              {analyticsData.length > 0 && (
                <>
                  <h3 className="performance-title">📊 Performance Insights</h3>
                  {analyticsData.map((section, i) => (
                    <div key={i} className="feedback-item">
                      <strong className="section-name">{section.name}:</strong>
                      <p className="feedback-text">
                        {getFeedbackMessage(
                          section.name,
                          section.correct,
                          section.total
                        )}
                      </p>
                    </div>
                  ))}
                  <div className="contact-prompt">
                    📞 Need help improving?{" "}
                    <a
                      href="https://maxiwiselearning.com/contact"
                      className="contact-link"
                    >
                      Contact us here
                    </a>
                  </div>
                </>
              )}
            </div>
            <div className="overall-score-chart">
              <RenderOverallPieChart analyticsData={analyticsData} />
            </div>
          </div>
          <div>
            <h2 className="analytics-title">Test Performance Analytics</h2>
            <div className="charts-grid ">
              {analyticsData.map((sectionData, index) =>
                renderPieChart(sectionData, index)
              )}
            </div>
          </div>
          <div className="analytics-footer">
            <h2>Contact Us for More !</h2>
            <div className="footer-contact-row">
              <p className="footer-phone">📞 +91 1234567890</p>
              <span className="footer-separator">|</span>
              <p className="footer-link">
                🌐{" "}
                <a
                  href="https://www.maxiwiselearning.online"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.maxiwiselearning.online
                </a>
              </p>
            </div>
            <div className="button-group">
              <button
                className="back-button"
                onClick={() => navigate("/final")}
              >
                Back to Result
              </button>
              <button
                className="download-button"
                onClick={() => downloadAnalytics()}
              >
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnalyticsPage;
