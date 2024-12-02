import React, { useState, useEffect } from 'react';
import './ProfileEdit.css';
import updatePassword from '../../../request/updatePassword';
import { alertParam } from '../../../request/alertParam';


const ProfileEdit = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
    currentPass : ""
  });

  // Load user data from local storage on component mount


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
    // const file = e.target.files[0];
    // if (file) {
    //   const reader = new FileReader();
    //   reader.onloadend = () => {
    //     setFormData({
    //       ...formData,
    //       avatar: reader.result // Set the image preview
    //     });
    //   };
    //   reader.readAsDataURL(file); // Read the file as a Data URL
    // }
    alertParam('Votre entreprise n\'est pas encore permit d\'ajouter des photos. contacter le tchniciens si possible','warning',5000)
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password === formData.confirmPassword) {
      updatePassword(formData.currentPass, formData.password, formData.confirmPassword)
        .then((data) => {
          console.log('Mot de passe mis à jour avec succès :', data);
          setFormData({
            password: '',
            confirmPassword: '',
            currentPass : ""
          })
        })
        .catch((error) => {
          console.error('Erreur lors de la mise à jour du mot de passe :', error.message);
        });

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
        </div>
        <form onSubmit={handleSubmit} className="profile-form">
          <input
            type="password"
            name="currentPass"
            value={formData.currentPass}
            onChange={handleInputChange}
            placeholder="Mot de passe actuel"
          />
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
          <button type="submit" className="btn-submit">Modier</button>
        </form>
      </div>

    </div>
  );
};

export default ProfileEdit;
