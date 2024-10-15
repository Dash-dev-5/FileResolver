import React, { useState } from 'react';
import './_layourt.css';
import SubmitFile from '../pages/SubmitFile/SubmitFile';
import Sidebar from '../component/sideBar/sideBar';
import Topbar from '../component/Topbar/Topbar';
import { Outlet } from 'react-router-dom';
import PopUp from '../component/Popup/PopUp.jsx'
import Modal from '../component/Modal/Modal.jsx';
import GoBackButton from '../component/GoBackButton/GoBackButton.jsx';
import OrientationView from '../component/OrientationView/OrientationView.jsx';

function Layourt() {
  const [showPopUp, setShowPopUp] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalFinal, setShowModalFinal] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [itemOrient, setItemOrient] = useState({});
  const [isOrient, setIsOrient] = useState(false);
  const [affirmOp, setAffirmOp] = useState(null);
  const [isSecondStep, setIsSecondStep] = useState(false);
  const [onConfirmCallback, setOnConfirmCallback] = useState(null);


  const togglePopUp = () => {
    setShowPopUp(!showPopUp);
  };


  const toggleModal = (message = '') => {
    setConfirmMessage(message);
    setShowModal((prev) => !prev);
  };


  const toggleModalFinal = () => {
    setShowModalFinal((prev) => !prev);
  };
  const toggleOrienteSubmit = () => {
    setIsOrient((prev) => !prev);
  };


  const ModalView = (message, callback) => {
    return new Promise((resolve) => {
      toggleModal(message); // Show the first modal
      setOnConfirmCallback(() => () => {
        setIsSecondStep(true); // When user confirms the first step, show the second modal
        toggleModalFinal();
        resolve();
      });
    });
  };

  const orientView = (item) => {
    setItemOrient(item)
    toggleOrienteSubmit()

  };

  const handleFinalConfirmation = () => {

   
    toggleModalFinal(); // Close the final modal after confirming
    toggleModal(); // Reset for future operations
  };

  return (
    <div className="app">
      <Sidebar />
      <div className="main-section">
        <div className="top">
          <Topbar showPopUp={togglePopUp} documentDetail={confirmMessage} />
        </div>
        <div className="page">
          <Outlet context={{ ModalView , orientView }} />
          {showPopUp && <PopUp onClose={togglePopUp} />}
          {isOrient && <OrientationView onClose={()=>toggleOrienteSubmit()} data={itemOrient}/>}
          {showModal && (
            <Modal onClose={toggleModal} onAcc={onConfirmCallback}>
              {confirmMessage || 'Voulez-vous vraiment effectuer cette opération ?'}
             
            </Modal>
          )}
          {showModalFinal && (
            <Modal onClose={toggleModalFinal} onAcc={handleFinalConfirmation}>
              {'Cette opération est dangereuse. Confirmez-vous ?'}
            </Modal>
          )}
          <GoBackButton />
        </div>
      </div>
    </div>
  );
}

export default Layourt;
