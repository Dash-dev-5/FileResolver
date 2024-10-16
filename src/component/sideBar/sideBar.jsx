import React, { useEffect, useState, useRef } from 'react';
import './Sidebar.css';
import avatar from '../../assets/avatar.svg';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { gsap } from 'gsap';

const Sidebar = () => {
  const [formData, setFormData] = useState({
    avatar: '/default-avatar.svg',
    name: '',
    jobFunction: '',
  });
  const [viewText, setViewText] = useState(true);
  const sidebarRef = useRef(null);
  useEffect(()=>{
    if (viewText){

      setTimeout(() => {
        handleMouseLeave()
      }, 3000);
    }
  },[] )

  // Fonction pour agrandir la sidebar au survol
  const handleMouseEnter =  () => {
  gsap.to(sidebarRef.current, { width: '250px', duration: 0.5, ease: 'power3.out' });
    gsap.to('.profile', { opacity: 1, delay: 0.2, duration: 0.4, ease: 'power3.out' }); // Animation du texte
    setViewText(true);
  };

  // Fonction pour réduire la sidebar lorsqu'on quitte le survol
  const handleMouseLeave =  () => {
    gsap.to(sidebarRef.current, { width: '60px', duration: 0.5, ease: 'power3.in' });
    // gsap.to('.profile', { opacity: 0, duration: 0.4, ease: 'power3.in' }); // Animation pour cacher le texte
    setViewText(false);
  };

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

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/", { replace: true });
  };

  return (
    <div
      className="sidebar"
      ref={sidebarRef}
      onMouseOver={handleMouseEnter}
      onMouseOut={handleMouseLeave}
    >
      <div className="topSidebar">
        {viewText && (
          <div className="logoContenaire">
            <img src={logo} alt="Logo" className="logo-imageSide" />
            <div className="textLogo">FileResolver</div>
            {/* <img src="/menu.png" style={{margin:10,alignItems:'flex-end'}} onClick={handleMouseLeave} width={20} alt="" /> */}
          </div>
        )}
        <div className="profile">
        {/* {viewText ? <img src={formData.avatar} alt="Profile" className="profile-image" /> : <img src="/menu.png" style={{margin:10}} onClick={handleMouseEnter} width={20} alt="" />} */}
       <img src={formData.avatar} alt="Profile"  className={!viewText ? "profile-image":"profile-image2"} /> 
          {viewText && (
            <>
              <h3>{formData.name}</h3>
              <p>{formData.jobFunction}</p>
            </>
          )}
        </div>
        <nav className="sidebar-nav">
          {(formData?.role === 'Directeur' || formData?.role === 'Admin') && (
            <NavLink
              className={({ isActive }) => (isActive ? "selectNav" : "NavLink")}
              to="/home/Dashboard"
            >
              <img src="/dashboard.png" width={20} alt="" />
              <p>

              {viewText && (formData?.role === 'Admin' ? 'Tableau de bord DP' : 'Accueil')}
              </p>
            </NavLink>
          )}
          {(formData?.role === 'Service' || formData?.role === 'Admin') && (
            <NavLink
              className={({ isActive }) => (isActive ? "selectNav" : "NavLink")}
              to="/home/OrderHome"
            >
              <img src="/dashboard.png" width={20} alt="" />
              <p>
                 
              {viewText && (formData?.role === 'Admin' ? 'Les services' : 'Accueil')}
              </p>
            </NavLink>
          )}
          {(formData?.role === 'Secretaire' || formData?.role === 'Admin') && (
            <NavLink
              className={({ isActive }) => (isActive ? "selectNav" : "NavLink")}
              to="/home"
            >
              <img src="/add-file.png" width={20} alt="" />
              <p>

              {viewText && (formData?.role === 'Admin' ? 'Ajouter File' : 'Accueil')}
              </p>
            </NavLink>
          )}
          {(formData?.role === 'Secretaire' ||
            formData?.role === 'Admin' ||
            formData?.role === 'Directeur') && (
            <NavLink
              className={({ isActive }) => (isActive ? "selectNav" : "NavLink")}
              to="/home/Classeur"
            >
              <img src="/classeurs.png" width={20} alt="" />
              <p>

              {viewText && 'Classeur'}
              </p>
            </NavLink>
          )}
          <NavLink
            className={({ isActive }) => (isActive ? "selectNav" : "NavLink")}
            to="/home/ProfileEdit"
          >
            <img src="/people.png" width={20} alt="" />
            <p>

            {viewText && 'Modifier profile'}
            </p>
          </NavLink>
          {formData?.role === 'Admin' && (
            <>
              <NavLink
                className={({ isActive }) => (isActive ? "selectNav" : "NavLink")}
                to="/home/UserManagement"
              >
                <img src="/group.png" width={20} alt="" />
                <p>

                {viewText && 'Les utilisateurs'}
                </p>
              </NavLink>
              <NavLink
                className={({ isActive }) => (isActive ? "selectNav" : "NavLink")}
                to="/home/FolderManagement"
              >
                <img src="/classeur.png" width={20} alt="" />
                <p>

                {viewText && 'Gerer classeur'}
                </p>
              </NavLink>
            </>
          )}
        </nav>
      </div>
      <div className="NavLink" onClick={handleLogout}>
      <img src="/log-out.png" width={20} alt="" />
      <p>

      {viewText &&  'Se déconnecter'}
      </p>
      </div>
    </div>
  );
};

export default Sidebar;
