import { useEffect, useState } from "react";
import { Document, Page } from "react-pdf";
import { useLocation } from "react-router-dom";
import './MyPDFViewer.css';
import zoomIcone from '/zoom.png'
import dezoomIcone from '/dezoomer.png'

function MyPDFViewer({}) {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [scalPage, setScalPage] = useState(1);
  const [showAllComments, setShowAllComments] = useState(false); // État pour gérer l'affichage des commentaires
  const location = useLocation();
  const { item } = location.state || {};  // Access the state

  const comments = [
    {id : 3, owner : 'nzita@gmail.com',comment : "Verifie bien le document c'est tres sensible", date : "12/10/2024 18:10:30"  },
    {id : 2, owner : 'makuala@gmail.com',comment : "Verifie bien le document c'est tres sensible", date : "12/10/2024 12:10:30"  },
    {id : 1, owner : 'makuala@gmail.com',comment : "Verifie bien le document c'est tres sensible", date : "12/10/2024 10:10:30"  },
  ];

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const addZoom = ()=>{
    if(scalPage < 1.6){
      setScalPage(s=>s+0.1)
    }
  }
  const sousZoom = ()=>{
    if(scalPage > 0.3){
      setScalPage(s=>s-0.1)
    }
  }

  return (
    <div className="contenaire-pdf-comment">
      <div className="contenaire-comment">
      <div className="contenaire-button">
        {
          showAllComments ? (
            comments.map((item) => (
              <div className="contenaire-viewComment" key={item.id}>
                <div className="contenaire-author">
                  {item.owner} - {item.date}
                </div>
                <div className="contenaire-text">
                  {item.comment}
                </div>
              </div>
            ))
          ) : (
            <div className="contenaire-viewComment">
              <div className="contenaire-author">
                {comments[0].owner} - {comments[0].date}
              </div>
              <div className="contenaire-text">
                {comments[0].comment}
              </div>
            </div>
          )
        }
        
      </div>
        <div>

            <button onClick={() => setShowAllComments(e=> !e)} className="show-all-button">
            { !showAllComments ? 'Tout voir' : 'Moins voir'}
            </button>
            <p>
              Page {pageNumber} sur {numPages}
            </p>
          
        </div>
      </div>
        <p></p>
      <div className="pdf-div">
        <Document file={item.pdf} onLoadSuccess={onDocumentLoadSuccess} >
          {Array.apply(null, Array(numPages))
            .map((x, i) => i + 1)
            .map((page) => {
              return (
                <Page
                  key={page}
                  pageNumber={page}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  scale={scalPage}
                  
                />
              );
            })}
        </Document>
      </div>
      <div className="button-zoomInOute" >
        <div className="button-zoomOut" onClick={addZoom}>
          <img src={zoomIcone} alt="" className="imgZomm" />
        </div>
        <div className="button-zoomIn" onClick={sousZoom}>
          <img src={dezoomIcone} alt="" className="imgZomm"/>
        </div>
      </div>
    </div>
  );
}

export default MyPDFViewer;
