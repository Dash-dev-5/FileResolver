import React from 'react';
import './Topbar.css';

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="currentPage">Acceuil</div>
      <input type="text" className="search-bar" placeholder="Recherche ..." />
      <button className="btn-send">Envoyer</button>
    </div>
  );
};

export default Topbar;
