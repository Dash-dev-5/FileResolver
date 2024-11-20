import React, { useState } from "react";
import imgLogin from '../../assets/login.png';
import imgLogo from '../../assets/logo.svg';
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'; // Pour dispatcher les actions
import { actionLoginUser } from '../../../redux/actions/actionLoginUser'; // Assurez-vous que l'importation pointe vers le bon fichier

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialisation du dispatch pour Redux
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = (e) => {
    e.preventDefault();

    // Appelle l'action pour se connecter via l'API
    dispatch(actionLoginUser(email, password, (status, role, data) => {
      if (status === '200') {
        // Stocke les détails de l'utilisateur connecté dans le localStorage
        localStorage.setItem('loggedInUser', JSON.stringify({ ...data, role }));
        
        // Redirection basée sur le rôle
        switch (role) {
          case 'Secretaire':
            navigate('/home');
            break;
          case 'Directeur':
            navigate('/home/Dashboard');
            break;
          case 'Service':
            navigate('/home/OrderHome');
            break;
          default:
            navigate('/home');
        }
      } else if (status === '400') {
        alert('Invalid email or password!');
      } else if (status === '300') {
        alert('Network error, please try again later.');
      }
    }));
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-illustration">
          <img
            src={imgLogin}
            alt="Illustration"
            className="login-image"
          />
        </div>
      </div>
      <div className="login-right">
        <div className="login-box">
          <img
            src={imgLogo}
            alt="Illustration"
            className="logo-image"
          />
          <h2>Bienvenu sur FileResolver</h2>
          <p>S'il vous plaît entrez vos informations</p>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="eg. kollectifnumrique@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="remember-me">
              <input type="checkbox" />
              <label>Se souvenir de moi</label>
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
