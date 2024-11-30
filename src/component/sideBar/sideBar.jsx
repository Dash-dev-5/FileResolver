import React, { useEffect, useState, useRef } from 'react';
import './Sidebar.css';
import avatar from '../../assets/avatar.svg';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { gsap } from 'gsap';
import { useDispatch } from 'react-redux';
import { actionLoadUser } from '../../../redux/actions/actionLoadUser';
import { actionGetService } from '../../../redux/actions/actionGetService';
import { actionGetBinder } from '../../../redux/actions/actionGetBinder';
import { ationGetBinderCategory } from '../../../redux/actions/ationGetBinderCategory';
import { actionGetFileByBinder } from '../../../redux/actions/actionGetFileByBinder';

const Sidebar = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [viewText, setViewText] = useState(true);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userDetails'));
    if (storedData) {
      setUserDetails(storedData.data);
    }
  }, []);
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('userDetails')) || null
    if (storedUsers === null ){
      navigate('/login'); // Redirige vers la page d'accueil après 2 secondes
    }else{
      dispatch(actionLoadUser(storedUsers))
      dispatch(actionGetService())
      dispatch(actionGetBinder())
      dispatch(actionGetFileByBinder())
      dispatch(ationGetBinderCategory())

    }
  }, []);

  // useEffect(() => {
  //   if (viewText) {
  //     setTimeout(() => {
  //       handleMouseLeave();
  //     }, 3000);
  //   }
  // }, []);

  const handleMouseEnter = () => {
    gsap.to(sidebarRef.current, { width: '230px', duration: 0.5, ease: 'power3.out' });
    gsap.to('.profile', { opacity: 1, delay: 0.2, duration: 0.4, ease: 'power3.out' });
    setViewText(true);
  };

  const handleMouseLeave = () => {
    gsap.to(sidebarRef.current, { width: '60px', duration: 0.5, ease: 'power3.in' });
    setViewText(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('userDetails');
    navigate("/", { replace: true });
  };

  if (!userDetails) {
    return null; // Charge uniquement si les données existent
  }

  const { first_name, last_name, roles, company } = userDetails;
  const roleName = roles[0]?.name || "agent";

  return (
    <div
      className="sidebar"
      ref={sidebarRef}
      // onMouseOver={handleMouseEnter}
      // onMouseOut={handleMouseLeave}
    >
      <div className="topSidebar">
        {viewText && (
          <div className="logoContenaire">
            <img src={logo} alt="Logo" className="logo-imageSide" />
            <div className="textLogo">FileResolver</div>
            <div className="textLogo buttonBurger" onClick={handleMouseLeave}>✖</div>

          </div>
        )}
        <div className="profile">
          {!viewText && <div className="textLogo buttonBurger" onClick={handleMouseEnter}>▶</div>}
          <img src={avatar} alt="Profile" className={!viewText ? "profile-image" : "profile-image2"} />
          {viewText && (
            <>
              <h3>{`${first_name} ${last_name}`}</h3>
              <p>{roleName}</p>
              {company && <p>{company[0]?.name}</p>}
            </>
          )}
        </div>
        <nav className="sidebar-nav">
          {(roleName  === 'chef-service' || roleName  === 'admin') && (
            <NavLink
              className={({ isActive }) => (isActive ? "selectNav" : "NavLink")}
              to="/home/Dashboard"
            >
              <img src="/dashboard.png" width={20} alt="" />
              <p>

              {viewText && (roleName  === 'admin' ? 'Tableau de bord DP' : 'Accueil')}
              </p>
            </NavLink>
          )}
          {(roleName  === 'agent' || roleName  === 'admin') && (
            <NavLink
              className={({ isActive }) => (isActive ? "selectNav" : "NavLink")}
              to="/home/OrderHome"
            >
              <img src="/dashboard.png" width={20} alt="" />
              <p>
                 
              {viewText && (roleName  === 'admin' ? 'Les services' : 'Accueil')}
              </p>
            </NavLink>
          )}
          {(roleName  === 'secretaire' || roleName  === 'admin') && (
            <NavLink
              className={({ isActive }) => (isActive ? "selectNav" : "NavLink")}
              to="/home"
            >
              <img src="/add-file.png" width={20} alt="" />
              <p>

              {viewText && (roleName  === 'admin' ? 'Ajouter File' : 'Accueil')}
              </p>
            </NavLink>
          )}
          {(roleName === 'secretaire' ||
            roleName === 'admin' ||
            roleName === 'chef-service') && (
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
          {roleName === 'admin' && (
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
        <p>{viewText && 'Se déconnecter'}</p>
      </div>
    </div>
  );
};

export default Sidebar;
