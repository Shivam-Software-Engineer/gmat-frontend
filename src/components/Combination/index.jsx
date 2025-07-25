import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './combination.css';
import Header from '../header';
import { useSelector } from 'react-redux';

const sectionOrders = [
  { 
    id: 'quant-verbal-data',
    order: ['Quantitative Reasoning', 'Verbal Reasoning', 'Data Insights'] 
  },
  { 
    id: 'quant-data-verbal',
    order: ['Quantitative Reasoning', 'Data Insights', 'Verbal Reasoning'] 
  },
  { 
    id: 'verbal-data-quant',
    order: ['Verbal Reasoning', 'Data Insights', 'Quantitative Reasoning'] 
  },
  { 
    id: 'verbal-quant-data',
    order: ['Verbal Reasoning', 'Quantitative Reasoning', 'Data Insights'] 
  },
  { 
    id: 'data-verbal-quant',
    order: ['Data Insights', 'Verbal Reasoning', 'Quantitative Reasoning'] 
  },
  { 
    id: 'data-quant-verbal',
    order: ['Data Insights', 'Quantitative Reasoning', 'Verbal Reasoning'] 
  },
];

const Combination = () => {

  const [selectedOrder, setSelectedOrder] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const navigate = useNavigate();



  
const user = useSelector((state) => {
  return state.Login.userDetail
});  // Redux se user data


useEffect(() => {
  if (user==null) {
    navigate('/login'); // redirect to login if not logged in
  }
}, [user]);

  useEffect(() => {
    const timer = timeLeft > 0 && setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    if (timeLeft === 0) {
      handleStart(); // auto-start with selectedOrder (defaults to 0)
    }

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleStart = () => {
    const selected = {
      id: sectionOrders[selectedOrder].id,
      order: sectionOrders[selectedOrder].order
    };
    localStorage.setItem('selectedOrder', JSON.stringify(selected));
    navigate(`/test/${selected.id}`);
  };

  const handleOrderSelect = (idx) => {
    setSelectedOrder(idx);
    setTimeLeft(60); // reset timer
  };

  return (
    <>
    <Header/>
    <div className="instruction-container">
      <div className="header-section">
        <h1>GMAT Section Order Selection</h1>
        <div className="timer">
          <span className="timer-label">Time Remaining:</span>
          <span className="time">{timeLeft}s</span>
        </div>
      </div>

      <div className="content-wrapper">
        <div className="warning-section">
          <div className="red-warning">
            <h3>Important Notice</h3>
            <p>
              You have one (1) minute to make your selection. If you don't choose,
              the first option will be selected automatically.
            </p>
          </div>
          {/* <div className="note">
            <svg className="info-icon" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10
                10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>
            <p>
              <strong>Note:</strong> This diagnostic exam isn't timed, but in the real GMAT
              you must complete each section before moving to the next.
            </p>
          </div> */}
        </div>

        <div className="selection-section">
          <h2>Choose Your Preferred Section Order</h2>
          <p className="selection-subtitle">Select one of the following sequences:</p>

          <div className="section-options">
            {sectionOrders.map((orderObj, idx) => (
              <div
                key={orderObj.id}
                id={orderObj.id}
                className={`section-option ${selectedOrder === idx ? 'selected' : ''}`}
                onClick={() => handleOrderSelect(idx)}
              >
                <div className="option-radio">
                  <input
                    type="radio"
                    name="sectionOrder"
                    value={idx}
                    checked={selectedOrder === idx}
                    onChange={() => {}}
                  />
                </div>
                <div className="option-content">
                  {orderObj.order.map((section, sidx) => (
                    <div key={`${orderObj.id}-${sidx}`} className="section-step">
                      <span className="step-number">{sidx + 1}.</span>
                      <span className="section-name">{section}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="footer-bar">
        <button className="start-btn" onClick={handleStart}>
          Begin GMAT Diagnostic
          <svg className="arrow-icon" viewBox="0 0 24 24">
            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
          </svg>
        </button>
      </div>
    </div>
    </>
  );
};

export default Combination;