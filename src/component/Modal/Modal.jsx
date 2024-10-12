import React from 'react';
import './Modal.css';

const Modal = ({ onClose,children,onAcc }) => {
  const handeleAccept = ()=>{
    onAcc()
  }
  return (
    <div className="overlay-modal">
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
