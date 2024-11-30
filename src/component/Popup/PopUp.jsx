import React, { useState,useRef,useEffect } from 'react';
import './PopUp.css'; // Styles du composant
import { Document, Page } from "react-pdf"; 
import { gsap } from 'gsap';
import { useDispatch, useSelector } from 'react-redux';
import { transferFile } from '../../../request/transfertFile';
import { fetchBinderService } from '../../../request/fetchBinderService';
import { actionGetFileByService } from '../../../redux/actions/actionGetFileByService';
import { alertParam } from '../../../request/alertParam';

const PopUp = ({ onClose,data }) => {
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const [idBinderDest, setIdBinderDest] = useState();
    const [idBinder, setIdBinder] = useState();
    const [binder,setBinder] = useState();
    const [comment, setComment] = useState();
    const windowRef = useRef(null);
    const services = useSelector(state => state.services)
    const dispatch = useDispatch()
    // console.log(services);
    
    useEffect(() => {
      fetchBinderService(idBinderDest,(data) => {
        setBinder(data)
      })
    }, [idBinderDest]);
    
    useEffect(() => {
      // Animation GSAP pour l'effet d'ouverture de fenêtre
      gsap.fromTo(windowRef.current, 
        { scale: 0.5, opacity: 0 }, // Point de départ
        { scale: 1, opacity: 1, duration: 0.2, ease: "power1.out" } // Animation vers le point final
      );
    }, []);
    
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
      }
    function handleInputChange(e) {
      const { name, value } = e.target;
      setIdBinderDest(value)
      }
    function handleInputChangeBind(e) {
      const { name, value } = e.target;
      setIdBinder(value)
      }
    function handeletransfert() {
      const transferData = {
        file_id: data.id,
        from_binder_id: data.binder_id,
        to_binder_id: idBinder,
        status_id: 1,
        remarks:comment ,
      };
      console.log('DATA ;',transferData);
      
      transferFile(transferData)
        .then((data) => {
          dispatch(
            actionGetFileByService(undefined)
          )
          // console.log('Transfert réussi :', data);
          // alertParam('Transfert réussi ','success',5000)
          onClose()
        })
        .catch((error) => {
          // alertParam('Erreur lors de l\'orientation ','success',5000)
          // console.error('Erreur lors du transfert :', error);
        });
      }
  return (
    <div className="overlay" ref={windowRef} >
      <div className="document-container">
        {/* Partie gauche : Aperçu du document */}
        <div className="document-view">
          {/* <h2>Document</h2> */}
             
          <div className="document-preview">
          {/* <div className="pdf-div"> */}
            <Document file={data.path} onLoadSuccess={onDocumentLoadSuccess}>
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
          <div className="form-group">
            <label>Nom : {data.name}</label>
          </div>
            <label>Objet : {data.object}</label>
          </div>
          <div className="form-group">
            <label>N° ref : {data.num_ref} </label>
          </div>
          <div className="form-group">
            <label>Sélectionner un service à orienter</label>
            <select className="form-control"
              value={idBinderDest}
              onChange={handleInputChange}
            >
              <option value="">Sélectionner un service</option>
              {services.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Sélectionner le classeur </label>
            <select className="form-control"
              value={idBinder}
              onChange={handleInputChangeBind}
            >
              <option value="">Sélectionner un service</option>
              {binder?.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Commentaire</label>
            <textarea className="form-control" placeholder="Ajouter un commentaire" 
              value={comment}
              onChange={(event) => {
                setComment(event.target.value); // Met à jour le state avec la valeur actuelle
              }}
              
            ></textarea>
          </div>

          {/* Boutons */}
          <div className="popup-buttons">
            <button className="btn btn-cancel" onClick={onClose}>Annuler</button>
            <button className="btn btn-confirm" onClick={handeletransfert}>Confirmer</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
