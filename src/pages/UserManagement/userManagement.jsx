import React, { useState } from 'react';
import './UserManagement.css';

const UserManagement = () => {
  // Initial state for the users list
  const [users, setUsers] = useState([
    { name: 'Aristote Makuala', email: 'aristote@gmail.com', service: 'Technique', jobFunction: 'Chef de service', password: '', confirmPass: '' },
    { name: 'John Doe', email: 'johndoe@gmail.com', service: 'Commercial', jobFunction: 'Secretaire', password: '', confirmPass: '' }
  ]);

  // State for the form data (used for both adding and editing)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    jobFunction: '',  // Changed from function to jobFunction
    password: '',
    confirmPass: ''
  });

  // State to track if we are editing or adding
  const [editMode, setEditMode] = useState(false);
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to add or update a user
  const handleSubmit = () => {
    if (editMode) {
      // Update existing user
      const updatedUsers = [...users];
      updatedUsers[selectedUserIndex] = formData;
      setUsers(updatedUsers);
      setEditMode(false);
    } else {
      // Add a new user
      setUsers([...users, formData]);
    }

    // Reset the form
    setFormData({
      name: '',
      email: '',
      service: '',
      jobFunction: '',  // Changed from function to jobFunction
      password: '',
      confirmPass: ''
    });
  };

  // Function to delete a user
  const handleDelete = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  // Function to start editing a user
  const handleEdit = (index) => {
    setFormData(users[index]);
    setSelectedUserIndex(index);
    setEditMode(true);
  };

  // Function to clear the form (for adding new user)
  const clearForm = () => {
    setFormData({
      name: '',
      email: '',
      service: '',
      jobFunction: '',  // Changed from function to jobFunction
      password: '',
      confirmPass: ''
    });
    setEditMode(false);
  };

  return (
    <div className="user-management-container">
      <div className="user-form">
        <h3>{editMode ? 'Modifier Utilisateur' : 'Ajouter Utilisateur'}</h3>

        <input
          type="text"
          name="name"
          placeholder="Nom complet"
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="service"
          placeholder="Service"
          value={formData.service}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="jobFunction"  // Changed from function to jobFunction
          placeholder="Fonction"
          value={formData.jobFunction}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="confirmPass"
          placeholder="Confirmer le mot de passe"
          value={formData.confirmPass}
          onChange={handleInputChange}
        />

        <div className="buttons">
          <button className="btn-delete" onClick={clearForm}>Effacer</button>
          <button className="btn-save" onClick={handleSubmit}>
            {editMode ? 'Mettre à jour' : 'Ajouter'}
          </button>
        </div>
      </div>

      <div className="user-list">
        <h3>Les utilisateurs</h3>
        {users.length === 0 ? (
          <p>Aucun utilisateur</p>
        ) : (
          users.map((user, index) => (
            <div key={index} className="user-item">
              <div className="paragraphe">{user.name}</div>
              <div className="paragraphe">{user.email}</div>
              <div className="paragraphe">{user.service}</div>
              <div className="paragraphe">{user.jobFunction}</div> {/* Updated here */}
              <div className="user-actions">
                <button className="btn-edit" onClick={() => handleEdit(index)}>✏️</button>
                <button className="btn-delete" onClick={() => handleDelete(index)}>🗑️</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserManagement;
