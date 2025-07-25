import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import "./instructions.css";
import './instructions.css';
import Header from "../../components/header";
import { useSelector } from "react-redux";

const Instructions = () => {
  
  const navigate = useNavigate();

  
const user = useSelector((state) => {
  return state.Login.userDetail
});  // Redux se user data


useEffect(() => {
  if (user==null) {
    navigate('/login'); // redirect to login if not logged in
  }
}, [user]);

  return (
    <>
    <Header/>
    <div className="instructions-wrapper">
      <div className="instructions-container">
        <div className="header-section">
          <h1 className="instructions-title">GMAT Diagnostic Test</h1>
          {/* <h2 className="instructions-subtitle">Instructions</h2>
          <div className="divider"></div> */}
        </div>

        <div className="intro-section">
          
          <p className="instructions-text">
            This diagnostic test will evaluate your skills in <strong>Quantitative Reasoning</strong>, 
            <strong> Verbal Reasoning</strong>, and <strong>Data Insights</strong>. Please read all 
            instructions carefully before beginning.
          </p>
        </div>

        <div className="test-sections">
          <div className="section-card">
            <div className="section-header">
              <div className="section-number">1</div>
              <h2 className="section-title">Quantitative Reasoning</h2>
            </div>
            <ul className="section-list">
              <li><span className="list-icon">•</span> Algebra and Arithmetic questions.</li>
              <li><span className="list-icon">•</span> 6 questions total.</li>
              <li><span className="list-icon">•</span> 15 minutes time limit.</li>
              {/* <li><span className="list-icon">•</span> Calculator permitted</li> */}
            </ul>
          </div>

          <div className="section-card">
            <div className="section-header">
              <div className="section-number">2</div>
              <h2 className="section-title">Verbal Reasoning</h2>
            </div>
            <ul className="section-list">
              <li><span className="list-icon">•</span> Reading Comprehension and Critical Reasoning questions.</li>
              <li><span className="list-icon">•</span> 7 questions total.</li>
              <li><span className="list-icon">•</span> 14 minutes time limit.</li>
            </ul>
          </div>

          <div className="section-card">
            <div className="section-header">
              <div className="section-number">3</div>
              <h2 className="section-title">Data Insights</h2>
            </div>
            <ul className="section-list">
              <li><span className="list-icon">•</span> Data Sufficiency, Multi-Source Reasoning, Table Analysis, Graphics Interpretation, and Two-Part Analysis questions.</li>
              <li><span className="list-icon">•</span> 7 questions total.</li>
              <li><span className="list-icon">•</span> 16 minutes time limit.</li>
              <li><span className="list-icon">•</span> On-screen calculator provided.</li>
            </ul>
          </div>
        </div>

        <div className="important-notes">
          <h3 className="notes-title">Important Notes</h3>
          <ul className="notes-list">
            <li><span className="warning-icon">.</span> We recommend completing the test in one sitting for the best experience.</li>
            <li><span className="warning-icon">.</span> Make sure you're in a quiet place with a stable internet connection before starting.</li>
            <li><span className="warning-icon">.</span> The test doesn’t autosave, so if you exit or refresh, you'll need to start over.</li>
            <li><span className="warning-icon">.</span> For accurate results, do not use external help or materials.</li>
          </ul>
        </div>

        <div className="action-buttons">
          {/* <button className="secondary-button" onClick={() => navigate(-1)}>
            Back
          </button> */}
          <button className="primary-button" onClick={() => navigate("/selectcombination")}>
            Next
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Instructions;