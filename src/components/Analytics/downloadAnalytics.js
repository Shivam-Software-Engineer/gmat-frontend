import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const downloadAnalytics = async () => {
  const input = document.getElementById('analytics-report');
  if (!input) return;

  const elementsToHide = document.querySelectorAll('.hide-for-print');

  // Hide elements before capture
  elementsToHide.forEach((el) => {
    el.style.visibility = 'hidden';
  });

  const originalStyles = {
    width: input.style.width,
    maxWidth: input.style.maxWidth,
    transform: input.style.transform,
    zoom: input.style.zoom,
    transition: input.style.transition,
    display: input.style.display,
    flexDirection: input.style.flexDirection,
    minHeight: input.style.minHeight,
  };

  // Apply styles to simulate full-page layout
  input.style.width = '1280px';
  input.style.maxWidth = '1280px';
  input.style.transform = 'scale(1)';
  input.style.zoom = '1';
  input.style.transition = 'none';
  input.style.display = 'flex';
  input.style.flexDirection = 'column';
  input.style.minHeight = '100vh';

  await document.fonts.ready;
  window.scrollTo(0, 0);

  try {
    const canvas = await html2canvas(input, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      scrollY: 0,
      windowWidth: 1280,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
    const finalWidth = imgWidth * ratio;
    const finalHeight = imgHeight * ratio;

    const x = (pageWidth - finalWidth) / 2;
    const y = 0;

    pdf.addImage(imgData, 'PNG', x, y, finalWidth, finalHeight);
    pdf.save('performance_analytics.pdf');
  } catch (error) {
    console.error("PDF generation failed:", error);
  } finally {
    // Restore hidden elements
    elementsToHide.forEach((el) => {
      el.style.visibility = 'visible';
    });

    // Restore original styles
    input.style.width = originalStyles.width;
    input.style.maxWidth = originalStyles.maxWidth;
    input.style.transform = originalStyles.transform;
    input.style.zoom = originalStyles.zoom;
    input.style.transition = originalStyles.transition;
    input.style.display = originalStyles.display;
    input.style.flexDirection = originalStyles.flexDirection;
    input.style.minHeight = originalStyles.minHeight;
  }
};

export default downloadAnalytics;
