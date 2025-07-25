import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VerbalPage from '../../pages/VerbalPage';
import QuantPage from '../../pages/QuantPage';
import DataPage from '../../pages/DataPage';
import './style.css';
import { useSelector } from 'react-redux';


const SectionNavigator = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [sectionOrder, setSectionOrder] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sectionCompleted, setSectionCompleted] = useState(false);



  
const user = useSelector((state) => {
  return state.Login.userDetail
});  // Redux se user data


useEffect(() => {
  if (user==null) {
    navigate('/login'); // redirect to login if not logged in
  }
}, [user]);

  useEffect(() => {
    const storedOrder = JSON.parse(localStorage.getItem('selectedOrder'));
    
    if (!storedOrder || storedOrder.id !== orderId) {
      navigate('/selectcombination');
      return;
    }
    
    setSectionOrder(storedOrder.order);
  }, [navigate, orderId]);

  const handleSectionComplete = () => {
    if (currentIndex < sectionOrder.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSectionCompleted(false); // Reset for next section
    } else {
      navigate('/final');
    }
  };

  const renderSection = () => {
    const currentSection = sectionOrder[currentIndex];
    switch (currentSection) {
      case 'Quantitative Reasoning':
        return <QuantPage onComplete={handleSectionComplete} />;
      case 'Verbal Reasoning':
        return <VerbalPage onComplete={handleSectionComplete} />;
      case 'Data Insights':
        return <DataPage onComplete={handleSectionComplete} />;
      default:
        return <div>Invalid Section</div>;
    }
  };

  return (
    <div className="test-container">
      {sectionOrder.length > 0 && (
        <>
          <div className="section-progress">
            Section {currentIndex + 1} of {sectionOrder.length}: {sectionOrder[currentIndex]}
          </div>
          {renderSection()}
        </>
      )}
    </div>
  );
};

export default SectionNavigator;