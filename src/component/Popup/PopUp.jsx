import React,{useEffect,useRef}  from 'react';
import './PopUp.css';
import { gsap } from 'gsap';

const PopUp = ({ onClose }) => {
  const windowRef = useRef(null);

  useEffect(() => {
    // Animation GSAP pour l'effet d'ouverture de fenêtre
    gsap.fromTo(windowRef.current, 
      { scale: 0.5, opacity: 0 }, // Point de départ
      { scale: 1, opacity: 1, duration: 0.5, ease: "power1.out" } // Animation vers le point final
    );
  }, []);
  
  return (
    <div className="overlay" ref={windowRef}>
      <div className="popup flexing-bottom">
        <h2>Insérer la note qui va accompagner le document</h2>
      </div>
      <div className="popup">
        <textarea placeholder="Note" className="note-input"></textarea>
      </div>
      <div className="popup flexing-bottom">
        <div className="popup-buttons ">
          <button className="btn btn-cancel" onClick={onClose}>Annuler</button>
          <button className="btn btn-confirm">Confirmer</button>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
