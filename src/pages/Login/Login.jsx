import React, { useState } from "react";
import imgLogin from '../../assets/login.png';
import imgLogo from '../../assets/logo.svg';
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'; 
import { actionLoginUser } from '../../../redux/actions/actionLoginUser';
import { fetchBinderService } from "../../../request/fetchBinderService";
import { actionGetServiceSelected } from "../../../redux/actions/actionServiceSelected";
import { alertParam } from "../../../request/alertParam";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    setError(null); // Reset error state
    
    if (!email || !password) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    dispatch(actionLoginUser(email, password, (status, role, data) => {
      // console.log('LOGINIIII',data?.service?.id);
      console.log('........',data);
      fetchBinderService(data?.service?.id, (data) => {
      dispatch(actionGetServiceSelected(data?.service?.id,data))
      }) 
      // serviceSelect(data?.service?.id)
      if (status === '200') {
          alertParam(`Bienvenu(e) ${data?.first_name}`,'success', 5000);
          switch (role) {
            case 'admin':
              navigate('/home');
              case 'secretaire':
                navigate('/home');
            break;
          case 'chef-service':
            navigate('/home/OrderHome');
            break;
          case 'Directeur':
            navigate('/home/Dashboard');
            break;
            case 'agent':
              
              navigate('/home/OrderHome');
              break;
              default:
                navigate('/home');
              }
            } else if (status === '400') {
              setError('Email ou mot de passe invalide.');
              alertParam(`Oups ! Email ou mot de passe invalide.`,'failed', 5000);
            } else if (status === '300') {
        alertParam(` Oups ! Erreur réseau, veuillez réessayer plus tard.`,'failed', 5000);
        setError('Erreur réseau, veuillez réessayer plus tard.');
      }
    }));
  };
  
  // const serviceSelect = async (selectedService) => {
  //   await fetchBinderService(selectedService,callback)  
  //   const callback = (data) => {
  //     console.log("connexion",  data);
  //   } 
  // }

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-illustration">
          <img src={imgLogin} alt="Illustration" className="login-image" />
        </div>
      </div>
      <div className="login-right">
        <div className="login-box">
          <img src={imgLogo} alt="Logo" className="logo-image" />
          <h2>Bienvenue sur Digit File</h2>
          <p>S'il vous plaît entrez vos informations</p>
          <form onSubmit={handleLogin}>
            {error && <div className="error-message" aria-live="polite">{error}</div>}
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="ex. kollectifnumerique@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Mot de passe</label>
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="remember-me">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Se souvenir de moi</label>
            </div>
            <button type="submit" className="btn">Se connecter</button>
          </form>
          <div className="login-footer">
            <a href="/forgot-password">Mot de passe oublié?</a>
            <p>Vous n'avez pas un compte? <a href="/signup">Inscrivez-vous</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
