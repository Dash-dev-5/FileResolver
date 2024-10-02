import React from 'react';
import './PopUp.css';

const PopUp = ({ onClose }) => {
  return (
    <div className="overlay">
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
