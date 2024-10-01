import React from "react";
import imgLogin from '../../assets/login.png'
import imgLogo from '../../assets/logo.svg'
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigation = useNavigate()
  const  handeleLogin = (e)=>{
    e.preventDefault()
    navigation('/home')

  }
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
          <form onSubmit={handeleLogin}>
            <div className="input-group">
              <label>Email</label>
              <input type="email" placeholder="eg. kollectifnumrique@gmail.com" />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input type="password" placeholder="********" />
            </div>
            <div className=" remember-me">
              <input type="checkbox" />
              <label>Se souvenir de moi</label>
            </div>
            <button type="submit" className="btn">Se connecter</button>
          </form>
          <div className="login-footer">
            <a href="/forgot-password">Mot de passe oublier?</a>
            <p>Vous n'avez pas un compte? <a href="/signup">Inscrivez-vous</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
