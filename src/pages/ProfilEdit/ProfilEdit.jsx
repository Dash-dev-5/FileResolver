import React, { useState, useEffect } from 'react';
import './ProfileEdit.css';

const ProfileEdit = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
    avatar: '/default-avatar.svg', // default avatar path
    name: '',
    jobFunction: ''
  });

  // Load user data from local storage on component mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedData) {
      setFormData(storedData);
    }
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle avatar change
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          avatar: reader.result // Set the image preview
        });
      };
      reader.readAsDataURL(file); // Read the file as a Data URL
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password === formData.confirmPassword) {
      // Met à jour les informations de l'utilisateur dans 'loggedInUser'
      localStorage.setItem('loggedInUser', JSON.stringify(formData));
  
      // Récupère la liste d'utilisateurs existante
      const users = JSON.parse(localStorage.getItem('users')) || [];
      
      // Vérifie si l'utilisateur existe déjà dans 'users'
      const userExists = users.some(user => user.email === formData.email);
      
      if (userExists) {
        // Met à jour l'utilisateur existant
        const updatedUsers = users.map(user =>
          user.email === formData.email ? formData : user
        );
        localStorage.setItem('users', JSON.stringify(updatedUsers));
      } else {
        alert('User does not exist in the user list!');
      }
  
      alert('Profile updated successfully!');
    } else {
      alert('Passwords do not match!');
    }
  };
  

  return (
    <div className="profile-page-container">
      <div className="profile-edit-container">
        <div className="profile-info">
          <div className="avatar-container">
            <img
              src={formData.avatar ? formData.avatar : '/default-avatar.svg'}
              alt="Profile"
              className="profile-avatar"
            />
            <input 
              type="file" 
              id="avatarUpload" 
              accept="image/*"
              onChange={handleAvatarChange}
              style={{ display: 'none' }}
            />
            <label htmlFor="avatarUpload" className="avatar-upload-btn">📷</label>
          </div>
          <h2>{formData.name}</h2>
          <p>{formData.jobFunction}</p>
        </div>

        <form onSubmit={handleSubmit} className="profile-form">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Mot de passe"
          />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirmer le mot de passe"
          />
          <button type="submit" className="btn-submit">Valider</button>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;
