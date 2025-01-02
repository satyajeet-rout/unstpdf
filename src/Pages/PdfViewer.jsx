import { useState, useEffect } from 'react';

const PDFViewer = () => {
  const [pdfUrl, setPdfUrl] = useState('');

  useEffect(() => {
    const getPdfUrl = () => {
      // Get the PDF ID from the URL parameters
      const urlParams = new URLSearchParams(window.location.search);
      const pdfId = urlParams.get('id');
      
      if (pdfId) {
        // Set the PDF URL using the view endpoint
        setPdfUrl(`http://localhost:8000/api/pdfs/view/${pdfId}`);
      }
    };

    getPdfUrl();
  }, []);

  if (!pdfUrl) {
    return <div className="flex items-center justify-center h-screen">Loading PDF...</div>;
  }

  return (
    <div className="w-full h-screen">
      <iframe
        src={pdfUrl}
        className="w-full h-full"
        title="PDF Viewer"
      />
    </div>
  );
};

export default PDFViewer;