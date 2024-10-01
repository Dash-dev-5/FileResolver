import React,{useEffect, useState} from 'react';
import './Sidebar.css';
import avatar from '../../assets/avatar.svg'
import { NavLink, useNavigate,useLocation } from 'react-router-dom';
import logo from '../../assets/logo.svg'

const Sidebar = () => {
  const user = {
    avatar : avatar,
    name:'Aristote Makuala',
    function : 'Directeur provinciale'
  }
  const navigation = useNavigate()
  const [isAuthenticated,setIsAuthenticated] = useState(true)
  const location = useLocation();

  useEffect(() => {
    // Exemple : si l'utilisateur est déconnecté, on les renvoie vers la page d'accueil
    if (!isAuthenticated) { // Ajoutez votre logique d'authentification ici
      navigate("/", { replace: true });
    }
  }, [location, navigation]);
  const handeleDeconnect = ()=>{
    setIsAuthenticated(false)
    // window.history.pushState(null, "", "/");
    navigation("/", { replace: true });
  }
  return (
    <div className="sidebar">
      <div className="topSidebar">
          <div className="logoContenaire">
          <img
              src={logo}
              alt="Profile"
              className="logo-imageSide"
            />
            <div className="textLogo">
              FileResolver
            </div>
          </div>
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
    {/* 
                <NavLink className={({ isActive, isPending }) =>
        isActive ? "selectNav" : "NavLink"
      }  to="/home/MyPDFViewer">pdf</NavLink> */}

                <NavLink className={({ isActive, isPending }) =>
        isActive ? "selectNav" : "NavLink"
      }  to="/home/Dashboard">Dashboard</NavLink>
                <NavLink className={({ isActive, isPending }) =>
        isActive ? "selectNav" : "NavLink"
      }  to="/home/UserManagement">UserManagement</NavLink>

          </nav>
      </div>
        <div className="NavLink" onClick={handeleDeconnect}>
          Se déconnecter
        </div>

    </div>
  );
};

export default Sidebar;
