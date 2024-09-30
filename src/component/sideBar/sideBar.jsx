import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="profile">
        <img
          src="https://via.placeholder.com/100" 
          alt="Profile"
          className="profile-image"
        />
        <h3>Aristote MAKUALA</h3>
        <p>Directeur provinciale</p>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li><a href="/dashboard">Tableau de bord</a></li>
          <li><a href="/folders">Classeurs</a></li>
          <li><a href="/settings">Paramètre</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
