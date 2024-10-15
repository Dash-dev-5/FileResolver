import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';
import imgLogo from '../../assets/logo.svg';

const SplashScreen = () => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const nameRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Animation du logo
    tl.to(logoRef.current, {
      opacity: 1,
      scale: 0.8,
      duration: 1,
      ease: "bounce.out"
    })
    // Animation du nom de l'application
    .to(nameRef.current, {
      opacity: 1,
      y: 50,
      duration: 1,
      ease: "power4.out"
    }, "-=0.5") // "-=0.5" pour commencer avant la fin de l'animation précédente
    
    // Après l'animation, on navigue vers la page d'accueil
    .to(containerRef.current, {
      opacity: 0,
      duration: 1,
      onComplete: () => {
        const storedUsers = JSON.parse(localStorage.getItem('loggedInUser')) || null
        if (storedUsers === null ){
          navigate('/login'); // Redirige vers la page d'accueil après 2 secondes
        }else{
          navigate('/home');
        }
      }
    }, "+=1.5"); // Délai avant de commencer cette animation
  }, [navigate]);

  return (
    <div ref={containerRef} className="splash-container" style={styles.container}>
      <div ref={logoRef} className="logo" style={styles.logo}>

        <img src={imgLogo} alt="Logo" style={{ width: '150px' }} />
      </div>
      <h1 ref={nameRef} className="app-name" style={styles.appName}>FileResolver</h1>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0ba9f3',
    color: '#fff'
  },
  logo: {
    marginBottom: '20px'
  },
  appName: {
    fontSize: '2.5rem',
    fontWeight: 'bold'
  }
};

export default SplashScreen;
