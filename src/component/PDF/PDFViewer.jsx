import { useEffect, useState, useRef } from "react";
import { Document, Page } from "react-pdf";
import { useLocation } from "react-router-dom";
import './MyPDFViewer.css';
import zoomIcone from '/zoom.png';
import dezoomIcone from '/dezoomer.png';
import { PDFDocument } from 'pdf-lib';  // Importer pdf-lib pour modifier le PDF
import { saveAs } from 'file-saver';  // Importer file-saver pour sauvegarder le PDF
import { gsap } from 'gsap';


function MyPDFViewer({}) {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [scalPage, setScalPage] = useState(1);
  const [showAllComments, setShowAllComments] = useState(false); 
  const [showOverlay, setShowOverlay] = useState(false); // État pour le cachet
  const [cachetPosition, setCachetPosition] = useState({ x: 0, y: 0 }); // Position du cachet
  const location = useLocation();
  const { item } = location.state || {};  // Access the state
  const windowPDFRef = useRef(null);
  const commentRef = useRef(null); 

  const comments = [
    { id: 3, owner: 'nzita@gmail.com', comment: "Vérifie bien le document, c'est très sensible", date: "12/10/2024 18:10:30" },
    { id: 2, owner: 'makuala@gmail.com', comment: "Vérifie bien le document, c'est très sensible", date: "12/10/2024 12:10:30" },
    { id: 1, owner: 'makuala@gmail.com', comment: "Vérifie bien le document, c'est très sensible", date: "12/10/2024 10:10:30" },
  ];

 
  useEffect(() => {
    gsap.fromTo(windowPDFRef.current, 
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "power1.out", delay: 0.3 }
    );
  }, []);

  useEffect(() => {
    if (showAllComments) {
      gsap.to(commentRef.current, { height: "auto", opacity: 1, duration: 0.5, ease: "power1.out" });
      const fullHeight = commentRef.current.scrollHeight + "px";
      gsap.fromTo(commentRef.current, { height: 0 }, { height: fullHeight, opacity: 1, duration: 0.5, ease: "power1.out" });
    } else {
      gsap.fromTo(commentRef.current, 
        { height: commentRef.current.scrollHeight + "px", opacity: 1 }, 
        { height: 0, opacity: 0, duration: 0.5, ease: "power1.out" }
      );
    }
  }, [showAllComments]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const addZoom = () => {
    if (scalPage < 1.6) {
      setScalPage(s => s + 0.1);
    }
  };

  const sousZoom = () => {
    if (scalPage > 0.3) {
      setScalPage(s => s - 0.1);
    }
  };

  const savePDFWithCachet = async () => {
    try {
        // Charger le PDF original
        const existingPdfBytes = await fetch(item.pdf).then(res => res.arrayBuffer());

        // Charger l'image du cachet
        const cachetImageBytes = await fetch('/cachet.png').then(res => res.arrayBuffer());

        // Charger le document PDF
        const pdfDoc = await PDFDocument.load(existingPdfBytes);

        // Embedding the cachet image
        const cachetImage = await pdfDoc.embedPng(cachetImageBytes);
        const pages = pdfDoc.getPages();

        // Taille du cachet
        const cachetWidth = 100;
        const cachetHeight = 100;

        // Positionner le cachet selon les coordonnées actuelles et l'échelle
        const cachetX = cachetPosition.x / scalPage; // Ajuster pour l'échelle
        const cachetY = cachetPosition.y / scalPage; // Ajuster pour l'échelle

        // Ajouter le cachet sur la première et dernière page
        const firstPage = pages[0];
        const lastPage = pages[pages.length - 1];

        firstPage.drawImage(cachetImage, {
            x: cachetX,
            y: firstPage.getHeight() - cachetY - cachetHeight, // Ajuster pour que le Y soit en bas
            width: cachetWidth,
            height: cachetHeight,
        });

        lastPage.drawImage(cachetImage, {
            x: cachetX,
            y: lastPage.getHeight() - cachetY - cachetHeight, // Ajuster pour que le Y soit en bas
            width: cachetWidth,
            height: cachetHeight,
        });

        // Sauvegarder le nouveau PDF avec le cachet
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        saveAs(blob, 'document_avec_cachet.pdf');
    } catch (error) {
        console.error("Erreur lors de la sauvegarde du PDF :", error.message);
    }
};

  const handleMouseDown = (e) => {
    // Obtenir la position de la page PDF
    const pdfContainerRect = windowPDFRef.current.getBoundingClientRect();
    
    // Calculer l'offset par rapport à la position du cachet
    const offsetX = e.clientX - (cachetPosition.x + pdfContainerRect.left);
    const offsetY = e.clientY - (cachetPosition.y + pdfContainerRect.top);
  
    const handleMouseMove = (e) => {
      setCachetPosition({
        x: e.clientX - pdfContainerRect.left - offsetX,
        y: e.clientY - pdfContainerRect.top - offsetY,
      });
    };
  
    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };
  
  return (
    <div className="contenaire-pdf-comment">
      <div className="contenaire-comment">
        <div className="contenaire-button">
          <div ref={commentRef} style={{ overflow: "hidden" }}>
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
                <></>
              )
            }
          </div>
        </div>
    
        <button onClick={() => setShowAllComments(e => !e)} className="show-all-button">
          { !showAllComments ? 'Ouvrir les commentaire' : 'Fermer' }
        </button>

      </div>
      
      <div className="pdf-div" ref={windowPDFRef}>
          <p>
            Page {pageNumber} sur {numPages}
          </p>
        <Document file={item.pdf} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.apply(null, Array(numPages))
            .map((x, i) => i + 1)
            .map((page) => {
              return (
                <div key={page} className="pdf-page-container">
                  <Page
                    pageNumber={page}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    scale={scalPage}
                  />
                  {/* Ajout du cachet en bas à droite pour la première et dernière page */}
                  {(page === 1 || page === numPages) && showOverlay && (
                    <img
                      src="/cachet.png"
                      alt="Cachet"
                      className="cachet"
                      style={{
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        cursor: "move",
                        transform: `translate(${cachetPosition.x}px, ${cachetPosition.y}px)`,
                      }}
                      onMouseDown={handleMouseDown}
                    />
                  )}
                </div>
              );
            })}
        </Document>
      </div>

      <div className="button-zoomInOute">
        <div className="button-zoomOut" onClick={addZoom}>
          <img src={zoomIcone} alt="" className="imgZomm" />
        </div>
        <div className="button-zoomIn" onClick={sousZoom}>
          <img src={dezoomIcone} alt="" className="imgZomm" />
        </div>
      </div>

      {/* Bouton pour activer/désactiver le cachet */}
      <button onClick={() => setShowOverlay(o => !o)}>
        {showOverlay ? "Retirer le cachet" : "Ajouter un cachet"}
      </button>

      {/* Bouton pour enregistrer le PDF avec le cachet */}
      <button onClick={savePDFWithCachet}>
        Enregistrer le PDF avec cachet
      </button>
    </div>
  );
}

export default MyPDFViewer;
