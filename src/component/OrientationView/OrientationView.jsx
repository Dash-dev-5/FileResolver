import React, { useState } from 'react';
import './OrientationView.css'; // Styles du composant
import { Document, Page } from "react-pdf"; 

const OrientationView = ({ onClose,data }) => {
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);

    
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
      }
  return (
    <div className="overlay">
      <div className="document-container">
        {/* Partie gauche : Aperçu du document */}
        <div className="document-view">
          {/* <h2>Document</h2> */}
             
          <div className="document-preview">
          {/* <div className="pdf-div"> */}
            <Document file={data.pdf} onLoadSuccess={onDocumentLoadSuccess}>
              {Array.apply(null, Array(numPages))
                .map((x, i) => i + 1)
                .map((page) => {
                  return (
                    <Page
                    key={page}
                    pageNumber={page}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    scale={0.5}
                    />
                  );
                })}
            </Document>
                {/* </div> */}
        
          </div>
        </div>

        {/* Partie droite : Détails du document */}
        <div className="document-details">
          <h2>Détails du document</h2>
          <div className="form-group">
            <label>Objet : {data.object}</label>
          </div>
          <div className="form-group">
            <label>N° ref : {data.ref} </label>
          </div>
          <div className="form-group">
            <label>Classeur : {data.name}</label>
          </div>
          <div className="form-group">
            <label>Sélectionner un service à orienter</label>
            <select className="form-control">
              <option value="">Sélectionner un service</option>
              <option value="service1">Service 1</option>
              <option value="service2">Service 2</option>
            </select>
          </div>
          <div className="form-group">
            <label>Commentaire</label>
            <textarea className="form-control" placeholder="Ajouter un commentaire"></textarea>
          </div>

          {/* Boutons */}
          <div className="popup-buttons">
            <button className="btn btn-cancel" onClick={onClose}>Annuler</button>
            <button className="btn btn-confirm">Confirmer</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrientationView;
