export const goToNextSection = (navigate) => {
    const selectedOrder = JSON.parse(localStorage.getItem('selectedOrder'));
    let currentIndex = parseInt(localStorage.getItem('currentSectionIndex'));
  
    currentIndex++;
    if (currentIndex < selectedOrder.length) {
      localStorage.setItem('currentSectionIndex', currentIndex);
      const nextSection = selectedOrder[currentIndex];
      if (nextSection === 'Quantitative Reasoning') navigate('/quant');
      else if (nextSection === 'Verbal Reasoning') navigate('/verbal');
      else if (nextSection === 'Data Insights') navigate('/data-insights');
    } else {
      navigate('/final-result');
    }
  };
  