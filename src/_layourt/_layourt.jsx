import React, { useState } from 'react';
import './_layourt.css';
import SubmitFile from '../pages/SubmitFile/SubmitFile';
import Sidebar from '../component/sideBar/sideBar';
import Topbar from '../component/Topbar/Topbar';
import MyPDFViewer from '../component/PDF/PDFViewer';
import { Outlet } from 'react-router-dom';
import PopUp from '../component/Popup/Popup';
function Layourt() {
  const [showPopUp, setShowPopUp] = useState(false);
  const [detail, setDetail] = useState();

  const togglePopUp = () => {
    setShowPopUp(!showPopUp);
  };
  return (
    <div className="app">
      <Sidebar/>
      <div className="main-section">
        <div className="top">
          <Topbar showPopUp={togglePopUp} documentDetail={detail}/>
        </div>
        <div className="page">
          <Outlet />
          {showPopUp && <PopUp onClose={togglePopUp} />}
        </div>
      </div>
    </div>
  );
}

export default Layourt;
