import React from "react";
import { useNavigate } from "react-router-dom";
import './NotFound.css'; // Import the CSS for styling

const NotFound = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/"); // Navigate back to home page
  };

  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <img
          src="path-to-broken-link-illustration.png"
          alt="Broken Link"
          className="notfound-image"
        />
        <h1>404 - Page Not Found</h1>
        <p>Oops! la page que vous cherchez n'existe pas.</p>
        <button className="btn" onClick={goHome}>Revenir a l'acceuil</button>
      </div>
    </div>
  );
};

export default NotFound;
