import { useState } from "react";
import { Document, Page } from "react-pdf";
import { useLocation } from "react-router-dom";


function MyPDFViewer({file}) {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const location = useLocation();
  const { pdf } = location.state || {};  // Access the state

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="pdf-div">
           <p>
        Page {pageNumber} of {numPages}
      </p>
      <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.apply(null, Array(numPages))
          .map((x, i) => i + 1)
          .map((page) => {
            return (
              <Page
                pageNumber={page}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            );
          })}
      </Document>
   
    </div>
  );
}
export default MyPDFViewer;