import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import avatar from '../../assets/avatar.svg';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.svg';

const Sidebar = () => {
  const [formData, setFormData] = useState({
    avatar: '/default-avatar.svg',
    name: '',
    jobFunction: '',
    // role : ''
  });

  // alert(JSON.stringify(formData));
  
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const location = useLocation();

  // Load user data from local storage on component mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedData) {
      setFormData(storedData);
    }
  }, []);
  
console.log(formData);

  useEffect(() => {
    // If the user is not authenticated, redirect to login
    if (!isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/", { replace: true });
  };

  return (
    <div className="sidebar">
      <div className="topSidebar">
        <div className="logoContenaire">
          <img
            src={logo}
            alt="Logo"
            className="logo-imageSide"
          />
          <div className="textLogo">
            FileResolver
          </div>
        </div>
        <div className="profile">
          <img
            src={formData.avatar}
            alt="Profile"
            className="profile-image"
          />
          <h3>{formData.name}</h3>
          <p>{formData.jobFunction}</p>
        </div>
        <nav className="sidebar-nav">
          {
            formData?.role === 'Directeur' || formData?.role === 'Admin' ?
          <NavLink className={({ isActive }) => (isActive ? "selectNav" : "NavLink")} to="/home/Dashboard">
            {formData?.role === 'Admin' ? 'Tableau de bord DP':'Acceuil'}
          </NavLink>
          :
          <></>
          }
        {
            formData?.role === 'Service' || formData?.role === 'Admin' ?
          <NavLink className={({ isActive }) => (isActive ? "selectNav" : "NavLink")} to="/home/OrderHome">
            {formData?.role === 'Admin' ? 'Les services':'Acceuil'}
          </NavLink>
          :
          <></>
}
          {
            formData?.role === 'Secretaire'  || formData?.role === 'Admin' ?
          <NavLink className={({ isActive }) => (isActive ? "selectNav" : "NavLink")} to="/home">
            {formData?.role === 'Admin' ? 'Ajouter File':'Acceuil'}
          </NavLink>
          :
          <></>
          }
           {
            formData?.role === 'Secretaire' || formData?.role === 'Admin' || formData?.role === 'Directeur' ?
          <NavLink className={({ isActive }) => (isActive ? "selectNav" : "NavLink")} to="/home/Classeur">
            Classeur
          </NavLink>
          :
          <></>
          }
          <NavLink className={({ isActive }) => (isActive ? "selectNav" : "NavLink")} to="/home/ProfileEdit">
            Modifier profile
          </NavLink>
           {
            formData?.role === 'Admin' ?
          <NavLink className={({ isActive }) => (isActive ? "selectNav" : "NavLink")} to="/home/UserManagement">
            Les utilisateurs
          </NavLink>
          :
          <></>
          }
           {
            formData?.role === 'Admin' ?
          <NavLink className={({ isActive }) => (isActive ? "selectNav" : "NavLink")} to="/home/FolderManagement">
            Gerer classeur
          </NavLink>
          :
          <></>
          }
          
        </nav>
      </div>
      <div className="NavLink" onClick={handleLogout}>
        Se déconnecter
      </div>
    </div>
  );
};

export default Sidebar;
