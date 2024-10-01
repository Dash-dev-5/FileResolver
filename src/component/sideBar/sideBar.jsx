import React from 'react';
import './Sidebar.css';
import avatar from '../../assets/avatar.svg'
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const user = {
    avatar : avatar,
    name:'Aristote Makuala',
    function : 'Directeur provinciale'
  }
  return (
    <div className="sidebar">
      <div className="profile">
        <img
          src={user.avatar}
          alt="Profile"
          className="profile-image"
        />
        <h3>{user.name}</h3>
        <p>{user.function} </p>
      </div>
      <nav className="sidebar-nav">
   
            <NavLink  className={({ isActive, isPending }) =>
    isActive ? "selectNav" : "NavLink"
  } about='Acceuil' to="/home">Acceuil</NavLink>

            <NavLink className={({ isActive, isPending }) =>
    isActive ? "selectNav" : "NavLink"
  }  to="/home/Classeur">Classeur</NavLink>

            {/* <NavLink to="/Parametre">Parametre</NavLink>  */}

            <NavLink className={({ isActive, isPending }) =>
    isActive ? "selectNav" : "NavLink"
  }  to="/home/MyPDFViewer">pdf</NavLink>

            <NavLink className={({ isActive, isPending }) =>
    isActive ? "selectNav" : "NavLink"
  }  to="/home/Dashboard">Dashboard</NavLink>

      </nav>
    </div>
  );
};

export default Sidebar;
