import React, { useState } from "react";
import imgLogin from '../../assets/login.png';
import imgLogo from '../../assets/logo.svg';
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigation = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // localStorage.clear()
  const handleLogin = (e) => {
    e.preventDefault();

    // Retrieve users from local storage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [{email : 'admin@gmail.com',password : 'admin',role :'Admin'}];

    // Validate user credentials
    const user = storedUsers.find(user => user.email === email && user.password === password);
    
    if (user) {
      // Store the logged-in user in local storage
      localStorage.setItem('loggedInUser', JSON.stringify(user));

      // If credentials are valid, navigate to home (or profile page)
      if(user.role === 'Secretaire'){
        navigation('/home');

      }else if(user.role === 'Directeur'){
        navigation('/home/Dashboard');

      }else if(user.role === 'Service'){
        navigation('/home/OrderHome');

      }else{
        navigation('/home');
      }
    } else {
      // Show error if credentials are invalid
      alert('Invalid email or password!');
    }
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
                onChange={(e) => setEmail(e.target.value)}  // Update email state
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}  // Update password state
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
