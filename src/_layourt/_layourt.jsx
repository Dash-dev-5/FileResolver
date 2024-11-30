import React, { useState,useEffect, useRef } from 'react';
import './_layourt.css';
import SubmitFile from '../pages/SubmitFile/SubmitFile';
import Sidebar from '../component/sideBar/sideBar';
import Topbar from '../component/Topbar/Topbar';
import { Outlet, useLocation } from 'react-router-dom';
import PopUp from '../component/Popup/PopUp.jsx'
import Modal from '../component/Modal/Modal.jsx';
import GoBackButton from '../component/GoBackButton/GoBackButton.jsx';
import OrientationView from '../component/OrientationView/OrientationView.jsx';
import { gsap } from 'gsap';
import { useDispatch } from 'react-redux';
import { deleteService } from '../../redux/actions/actionsServices.js';
import { actionGetService } from '../../redux/actions/actionGetService.js';
import { actionGetBinder } from '../../redux/actions/actionGetBinder.js';
import { deleteFolder } from '../../redux/actions/actionsBinder.js';
import { deleteuSER } from '../../redux/actions/actionsUsersForCompany.js';
import { actionLoadUser } from '../../redux/actions/actionLoadUser.js';
import Alert from '../component/Alert/Alert.jsx';

function Layourt() {
  const location = useLocation().pathname
  const dispatch = useDispatch()
  const [showPopUp, setShowPopUp] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalFinal, setShowModalFinal] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [itemOrient, setItemOrient] = useState({});
  const [isOrient, setIsOrient] = useState(false);
  const [affirmOp, setAffirmOp] = useState(null);
  const [paramsOperation, setParamsOperation] = useState(null);
  // const [onConfirmCallback, setOnConfirmCallback] = useState(null);
  const windowRef = useRef(null);

  useEffect(() => {
    // Animation GSAP pour l'effet d'ouverture de fenêtre
    
    gsap.fromTo(windowRef.current, 
      { opacity: 0 }, // Point de départ
      { opacity: 1, duration: 0.5, ease: "power1.out" } // Animation vers le point final
    );
  }, []);

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


  const ModalView = (message, params) => {
      toggleModal(message); 
      console.log(params);
      setParamsOperation(params)
    };

    const onConfirmCallback = () => {
    toggleModalFinal();
  
  };

  const orientView = (item) => {
    setItemOrient(item)
    toggleOrienteSubmit()

  };

  const handleFinalConfirmation = () => {
    console.log("Dash",paramsOperation);
    
    switch (paramsOperation.action) {
      case "delete service":
          // console.log('delete');
          dispatch(deleteService(paramsOperation.data))
          dispatch(actionGetService())
        break;
      case "delete folder":
          // console.log('delete');
          dispatch(deleteFolder(paramsOperation.data))
          dispatch(actionGetBinder())
        break;
    
      case "delete user":
          // console.log('delete');
          dispatch(deleteuSER(paramsOperation.data))
          dispatch(actionLoadUser())
        break;
    
      default:
        break;
    }    
    toggleModalFinal(); // Close the final modal after confirming
    toggleModal(); // Reset for future operations
  };

  

  return (
    <div className="app" >
      <Alert />
      <Sidebar />
      <div className="main-section">
        {location !== '/home/MyPDFViewer' && <div className="top">
          <Topbar showPopUp={togglePopUp} documentDetail={confirmMessage}  />
        </div>}
        <div className="page" ref={windowRef}>
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
              {'Cette opération est dangereuse et irrevercible. Confirmez-vous ?'}
            </Modal>
          )}
          <GoBackButton />
        </div>
      </div>
    </div>
  );
}

export default Layourt;
