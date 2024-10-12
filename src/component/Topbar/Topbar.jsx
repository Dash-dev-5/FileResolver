import React, { useEffect, useState } from 'react';
import './Topbar.css';
import { useLocation } from 'react-router-dom';

const Topbar = ({showPopUp,documentDetail}) => {
  const [isPDFView, setIsPDFView] = useState(false)
  const location = useLocation().pathname
  useEffect(()=>{
    if (location === '/home/MyPDFViewer'){
      setIsPDFView(true)
    }else{
      setIsPDFView(false)
    }
  },[location])
  console.log(location);
  
  return (
    <div className="topbar">
      {
        isPDFView ? (
          <>
            <div className="documentDetail">Document de { documentDetail && documentDetail.name }  { documentDetail && documentDetail.objet }</div>
            <div className="blockAction">
              <button className="btn-send" onClick={showPopUp}>Commanter</button>
              <button className="btn-send">Ajouter cachet</button>
              <button className="btn-send">Ajouter signature</button>
              <button className="btn-send">Telecharger</button>
            </div>
          </>
        ):
      <div className="searchBlock">
        <div className="currentPage">Acceuil</div>
        <input type="text" className="search-bar-top-bar" placeholder="Recherche ..." />
        <button className="btn-send">Envoyer</button>
      </div>

      }
    </div>
  );
};

export default Topbar;
