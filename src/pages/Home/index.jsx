import { useNavigate } from "react-router-dom";
import './home.css'; // Optional styling
import { Link } from "react-router-dom";
import Header from "../../components/header"

export default function Home() {

  return (
    <>
    <Header/>
    <div className="home-container">
      <header className="hero-section">
        <h1>GMAT Diagnostic Test</h1>
        <p>Assess your readiness for the GMAT in under 45 min</p>
        <Link to="/login">
          <button className="cta-button">
           Access Your Test Now
          </button>
        </Link>
      </header>

      <section className="features-section">
        <div className="feature-card">
          <h3>⚡ Simulates Real GMAT</h3>
          <p>
            Adaptive questions mirroring the GMAT Focus Edition's format 
            (Quant, Verbal, Data Insights).
          </p>
        </div>
        <div className="feature-card">
          <h3>📊 Instant Analytics</h3>
          <p>
            Get a step-by-step breakdown of each question — analyse the reasoning behind the correct 
            answers with clear explanations.
          </p>
        </div>
        <div className="feature-card">
          <h3>🎯1:1 Guidance & Study Plan</h3>
          <p>
            Connect with our experts for an analysis of your diagnostic results and personalized test prep support.
          </p>
        </div>
      </section>

      <section className="about-gmat">
        <h2 style={{color:'#fcba03'}}>"About our GMAT diagnostic test"</h2>
        <div className="gmat-stats">
          <div className="stat-item">
            <span>3</span>
            <p>Sections</p>
          </div>
          <div className="stat-item">
            <span>45m</span>
            <p>Duration</p>
          </div>
          {/* <div className="stat-item">
            <span>0 to 20</span>
            <p>Score Range</p>
          </div> */}
        </div>
        <p className="gmat-desc">
          The GMAT (Graduate Management Admission Test) is the most widely 
          used exam for MBA admissions. Our diagnostic test covers all 
          question types you'll encounter on the real exam.
        </p>
      </section>

      {/* <footer>
        <p>© 2025 GMAT Diagnostic Tool</p>
      </footer> */}
    </div>
    </>
  );
}