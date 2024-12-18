import { useEffect, useState, useRef, useMemo } from "react";
import { Document, Page } from "react-pdf";
import { useLocation, useOutletContext } from "react-router-dom";
import './MyPDFViewer.css';
import zoomIcone from '/zoom.png';
import dezoomIcone from '/dezoomer.png';
import { PDFDocument } from 'pdf-lib';  // Importer pdf-lib pour modifier le PDF
import { saveAs } from 'file-saver';  // Importer file-saver pour sauvegarder le PDF
import { gsap } from 'gsap';
import { useSelector } from "react-redux";
import { alertParam } from "../../../request/alertParam";
import { updateFile } from "../../../request/updateFile";



function MyPDFViewer({  }) {
  const {haneleTrait }= useOutletContext()
  const userDetailsStr = localStorage.getItem('userDetails');
  const userDetailsObj = JSON.parse(userDetailsStr);
  const services = useSelector(state => state.services)
  
  if (!userDetailsObj?.access_token) {
    throw new Error('Token d\'authentification non trouvé.');
  }

  const token = userDetailsObj.access_token;
  const companyId = userDetailsObj.data?.company?.[0]?.id;

  if (!companyId) {
    throw new Error('ID de l\'entreprise non trouvé.');
  }

  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [scalPage, setScalPage] = useState(1);
  const [showAllComments, setShowAllComments] = useState(false); 
  const [showOverlay, setShowOverlay] = useState(false); // État pour le cachet
  const [showOverlay2, setShowOverlay2] = useState(false); // État pour le cachet
  const [cachetPosition, setCachetPosition] = useState({ x: 0, y: 0 }); // Position du cachet
  const [cachetPosition2, setCachetPosition2] = useState({ x: 0, y: 0 }); // Position du cachet
  const [commentsTab, setCommentsTab] = useState([]); // Position du cachet
  const location = useLocation();
  const { item } = location.state || {};  // Access the state
  const windowPDFRef = useRef(null);
  const commentRef = useRef(null); 
  const [percenta, setPercent] = useState(0);
  const [idFile, setIdFile] = useState();
  const [filePath, setFilePath] = useState('');
  const validateForm = () => {
    if (!filePath ) {
      alertParam('Fichier introuvable !','warning');
      return false;
    }
    return true;
  };


  const generatePDFWithCachet = async () => {
    try {
        const existingPdfBytes = await fetch(item.path).then(res => res.arrayBuffer());
        const cachetImageBytes = await fetch('/cachet.png').then(res => res.arrayBuffer());
        const cachetImageBytes2 = await fetch('/signature.png').then(res => res.arrayBuffer());

        const pdfDoc = await PDFDocument.load(existingPdfBytes);

        const cachetImage = await pdfDoc.embedPng(cachetImageBytes);
        const cachetImage2 = await pdfDoc.embedPng(cachetImageBytes2);
        const pages = pdfDoc.getPages();

        const cachetWidth = 100;
        const cachetHeight = 100;
        const cachetX = cachetPosition.x / scalPage;
        const cachetY = cachetPosition.y / scalPage;

        const cachetWidth2 = 100;
        const cachetHeight2 = 100;
        const cachetX2 = cachetPosition2.x / scalPage;
        const cachetY2 = cachetPosition2.y / scalPage;

        const lastPage = pages[pages.length - 1];

        if (showOverlay) {
            lastPage.drawImage(cachetImage, {
                x: cachetX,
                y: lastPage.getHeight() - cachetY - cachetHeight,
                width: cachetWidth,
                height: cachetHeight,
            });
        }

        if (showOverlay2) {
            lastPage.drawImage(cachetImage2, {
                x: cachetX2,
                y: lastPage.getHeight() - cachetY2 - cachetHeight2,
                width: cachetWidth2,
                height: cachetHeight2,
            });
        }

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });

        return blob;
    } catch (error) {
        console.error("Erreur lors de la génération du PDF :", error);
        throw error;
    }
};




const updatingFile = async () => {
  try {
      const newFileBlob = await generatePDFWithCachet();
      const newFile = new File([newFileBlob], `${item.name}_${item.object}_${item.num_ref}.pdf`, { type: 'application/pdf' });

      // Affecter le nouveau fichier
      setFilePath(newFile);

      // Vérifier si le fichier est valide avant l'envoi
      // if (!validateForm()) return;

      updateFile(
          {
              idFile,
              filePath: newFile, // Envoi du nouveau fichier
              onProgress: (percent) => setPercent(percent),
          },
          () => {
              // Action après la mise à jour réussie
              alertParam('Fichier enregistré et envoyé !', 'success', 5000);
          }
      ).catch((err) => {
          setErrorMessage('Échec de l\'enregistrement, veuillez réessayer.');
          console.error('Erreur lors de l\'enregistrement :', err);
      });
  } catch (error) {
      console.error('Erreur lors de la création du fichier :', error);
      alertParam('Erreur lors de la création du fichier.', 'error');
  }
};


 
  useEffect(() => {
    const tabsComment = [{id : `${item.id}`+`${item.binder_id}`, owner : 'Secretaire',comment :item.note,date : item.created_at }]
    item?.transfers?.map((com)=>{
      tabsComment.push({
        id : `${com.id}`, 
        owner : com?.user?.email === null ? 'inconnu' : com?.user?.email  ,
        comment :com.remarks,
        date : com.created_at })
    })
    setCommentsTab(tabsComment)
  }, []);
  useEffect(() => {
    setIdFile(item.id)
    gsap.fromTo(windowPDFRef.current, 
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "power1.out", delay: 0.3 }
    );
  }, []);

  const memoizedFile = useMemo(() => {
    return { url: item.path };
  }, [item.path]);


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
        const existingPdfBytes = await fetch(item.path).then(res => res.arrayBuffer());
        let cachetImageBytes 
        let cachetImageBytes2
        cachetImageBytes2 = await fetch('/signature.png').then(res => res.arrayBuffer());
        cachetImageBytes = await fetch('/cachet.png').then(res => res.arrayBuffer());
        // Charger l'image du cachet
        
        // Charger le document PDF
        const pdfDoc = await PDFDocument.load(existingPdfBytes);

        // Embedding the cachet image
        const cachetImage = await pdfDoc.embedPng(cachetImageBytes);
        const cachetImage2 = await pdfDoc.embedPng(cachetImageBytes2);
        const pages = pdfDoc.getPages();

        // Taille du cachet
        const cachetWidth = 100;
        const cachetHeight = 100;
        const cachetWidth2 = 100;
        const cachetHeight2 = 100;

        // Positionner le cachet selon les coordonnées actuelles et l'échelle
        const cachetX = cachetPosition.x / scalPage; // Ajuster pour l'échelle
        const cachetY = cachetPosition.y / scalPage; // Ajuster pour l'échelle
        const cachetX2 = cachetPosition2.x / scalPage; // Ajuster pour l'échelle
        const cachetY2 = cachetPosition2.y / scalPage; // Ajuster pour l'échelle

        const firstPage = pages[0];
        const lastPage = pages[pages.length - 1];
        
        if (showOverlay){
          
          lastPage.drawImage(cachetImage, {
              x: cachetX,
              y: lastPage.getHeight() - cachetY - cachetHeight, // Ajuster pour que le Y soit en bas
              width: cachetWidth,
              height: cachetHeight,
          });
        }
        if (showOverlay2){
          lastPage.drawImage(cachetImage2, {
              x: cachetX2,
              y: lastPage.getHeight() - cachetY2 - cachetHeight2, // Ajuster pour que le Y soit en bas
              width: cachetWidth2,
              height: cachetHeight2,
          });
        
        }
 

        // Sauvegarder le nouveau PDF avec le cachet
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        saveAs(blob, item.name+'_'+item.object+'_'+item.num_ref+'.pdf');
        console.log(blob);
        
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
  const handleMouseDown2 = (e) => {
    // Obtenir la position de la page PDF
    const pdfContainerRect = windowPDFRef.current.getBoundingClientRect();
    
    // Calculer l'offset par rapport à la position du cachet
    const offsetX = e.clientX - (cachetPosition2.x + pdfContainerRect.left);
    const offsetY = e.clientY - (cachetPosition2.y + pdfContainerRect.top);
    
    const handleMouseMove = (e) => {
      setCachetPosition2({
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
  console.log('pdf',item);
  useEffect(() => {
    if (percenta == 100){
      setTimeout(() => {
        setPercent(0)
      }, 2000);
    }
  }, [percenta]);
  return (
    <div className="contenaire-pdf-comment">
       <div className="topbar topbar-pdf">
   {userDetailsObj.data?.roles[0].name === 'chef-service' || userDetailsObj.data?.roles[0].name === 'Directeur' || userDetailsObj.data?.roles[0].name === 'admin' &&
          <>
            <div className="documentDetail">Document {item.name}</div>
            <div className="blockAction">
              <button className="btn-send"  onClick={() => haneleTrait(item)}>Traiter</button>
              <button className="btn-send" onClick={() => setShowOverlay(o => !o)}>{showOverlay ? "Retirer le cachet" : "Ajouter le cachet"}</button>
              <button className="btn-send" onClick={() => setShowOverlay2(o => !o)}>{showOverlay2 ? "Retirer la signature" : "Ajouter la signature"}</button>
              {/* <button className="btn-send" style={{color : percenta > 0 ? 'black' : 'white',backgroundColor:percenta > 0 ? '#f0f4f8' : '#0ba9f3'}} disabled={percenta > 0} onClick={() => updatingFile()}>{percenta === 0 ? "Eregistrer" : `${percenta} %`}</button> */}
              <button 
                  className="btn-send" 
                  style={{ 
                      color: percenta > 0 ? 'black' : 'white', 
                      backgroundColor: percenta > 0 ? '#f0f4f8' : '#0ba9f3' 
                  }} 
                  disabled={percenta > 0} 
                  onClick={() => updatingFile()}
              >
                  {percenta === 0 ? "Enregistrer" : `${percenta} %`}
              </button>
              <button className="btn-send" onClick={savePDFWithCachet}>Telecharger</button>
            </div>
          </>
   }  
    </div>
      <div className="contenaire-comment">
        <div className="contenaire-button">
          <div ref={commentRef} style={{ overflow: "hidden" }}>
            {
              showAllComments ? (
                commentsTab.map((item) => (
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
          {/* 'https://cdn.filestackcontent.com/wcrjf9qPTCKXV3hMXDwK' */}
        <Document 
            file={memoizedFile}
           onLoadSuccess={onDocumentLoadSuccess}
          //  onError={(error)=>console.log(error)}
           >
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
                  {(page === numPages) && showOverlay && (
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
                  {(page === numPages) && showOverlay2 && (
                    <img
                      src="/signature.png"
                      alt="SIGNATURE"
                      className="cachet"
                      style={{
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        cursor: "move",
                        transform: `translate(${cachetPosition2.x}px, ${cachetPosition2.y}px)`,
                      }}
                      onMouseDown={handleMouseDown2}
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
    </div>
  );
}

export default MyPDFViewer;
