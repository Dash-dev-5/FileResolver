import React from 'react';
import './_layourt.css';
import SubmitFile from '../pages/SubmitFile/SubmitFile';
import Sidebar from '../component/sideBar/sideBar';
import Topbar from '../component/Topbar/Topbar';

function Layourt() {
  return (
    <div className="app">
      <Sidebar/>
      <div className="main-section">
        <Topbar/>
        <SubmitFile/>
      </div>
    </div>
  );
}

export default Layourt;
