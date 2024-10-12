import React, { useState, useEffect } from 'react';
import './UserManagement.css';

const UserManagement = () => {
  // Initial state for the users list
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : [
      { name: 'Aristote Makuala', email: 'aristote@gmail.com', service: 'Technique', jobFunction: 'Chef de service', password: '', confirmPass: '', role: "" },
      { name: 'John Doe', email: 'johndoe@gmail.com', service: 'Commercial', jobFunction: 'Secretaire', password: '', confirmPass: '', role: "" }
    ];
  });

  // State for the form data (used for both adding and editing)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    role: "",
    jobFunction: '',  // Changed from function to jobFunction
    password: '',
    confirmPass: ''
  });

  // State to track if we are editing or adding
  const [editMode, setEditMode] = useState(false);
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);

  // Effect to store users in local storage whenever they change
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

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
    console.log(users);
    
    // Reset the form
    setFormData({
      name: '',
      email: '',
      service: '',
      jobFunction: '',  // Changed from function to jobFunction
      password: '',
      confirmPass: '',
      role: ""
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
    console.log(formData);
    
  };

  // Function to clear the form (for adding new user)
  const clearForm = () => {
    setFormData({
      name: '',
      email: '',
      service: '',
      jobFunction: '',  // Changed from function to jobFunction
      password: '',
      confirmPass: '',
      role: ""
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
        <select
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          className="role-select"
        >
          <option value="">Selectioner pouvoir</option>
          <option value="Directeur">Directeur</option>
          <option value="Service">Service</option>
          <option value="Secretaire">Secrétaire</option>
          <option value="Admin">Administrateur</option>
        </select>
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
