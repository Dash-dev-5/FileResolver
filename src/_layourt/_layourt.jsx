import React from 'react';
import './_layourt.css';
import SubmitFile from '../pages/SubmitFile/SubmitFile';
import Sidebar from '../component/sideBar/sideBar';
import Topbar from '../component/Topbar/Topbar';
import MyPDFViewer from '../component/PDF/PDFViewer';
import { Outlet } from 'react-router-dom';
function Layourt() {
  return (
    <div className="app">
      <Sidebar/>
      <div className="main-section">
        <div className="top">
          <Topbar/>
        </div>
        <div className="page">
          <Outlet/>
        </div>
      </div>
    </div>
  );
}

export default Layourt;
