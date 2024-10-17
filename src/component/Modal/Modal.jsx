import React, { useEffect, useRef } from 'react';
import './Modal.css';
import { gsap } from 'gsap';
const Modal = ({ onClose,children,onAcc }) => {
  const windowRef = useRef(null);
  
  useEffect(() => {
    // Animation GSAP pour l'effet d'ouverture de fenêtre
    
    gsap.fromTo(windowRef.current, 
      { scale: 0.5, opacity: 0 }, // Point de départ
      { scale: 1, opacity: 1, duration: 0.3, ease: "power1.out" } // Animation vers le point final
    );
  }, []);
  const handeleAccept = ()=>{
    onAcc()
  }
  return (
    <div className="overlay-modal" ref={windowRef}>
      <div className="modal">
        <h2>{children}</h2>
        <div className="popup-buttons ">
          <button className="btn btn-cancel" onClick={onClose}>Annuler</button>
          <button className="btn btn-confirm" onClick={handeleAccept}>Confirmer</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
