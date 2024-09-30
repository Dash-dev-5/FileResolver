import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import pdf from '../../assets/document.pdf'
import './MyPDFViewer.css'

function MyPDFViewer() {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }){
    setNumPages(numPages);
  }

  return (
    <div className='pdf-div'>
      <p>
        Page {pageNumber} of {numPages}
      </p>
      <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess} >
        {Array.apply(null,Array(numPages))
        .map((x,i)=>i+1)
        .map((page) => {

          return (
            <Page 
            pageNumber={page} 
            renderTextLayer={false} 
            renderAnnotationLayeroop={false} 
            
            />
          )
        }
        )}
      </Document>
      
    </div>
  );
}
export default MyPDFViewer