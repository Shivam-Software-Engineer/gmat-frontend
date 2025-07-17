import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const downloadAnalytics = () => {
  const input = document.getElementById('analytics-report');

  html2canvas(input, {
    scale: 2,
    logging: true,
    useCORS: true,
    allowTaint: true
  }).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm' });
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save('performance_analytics.pdf');
  });
};

export default downloadAnalytics;
