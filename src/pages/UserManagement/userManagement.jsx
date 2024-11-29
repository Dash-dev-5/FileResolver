import React, { useState, useEffect } from 'react';
import './UserManagement.css';
import { useDispatch, useSelector } from 'react-redux';
import { actionGetService } from '../../../redux/actions/actionGetService';
import { actionGetUsers } from '../../../redux/actions/actionGetUsers';
import { addUser, updateUser } from '../../../redux/actions/actionsUsersForCompany';
import { fetchRoles } from '../../../request/fetchRoles';
import { useOutletContext } from 'react-router-dom';

const UserManagement = () => {
  // État global et dispatch
  const dispatch = useDispatch();
  const services = useSelector((state) => state.services);
  const usersForCompany = useSelector((state) => state.usersForCompany) || [];
  const { ModalView } = useOutletContext();

  // État local
  const [users, setUsers] = useState(usersForCompany);
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState(initialFormData());
  const [editMode, setEditMode] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  // Initialisation
  useEffect(() => {
    dispatch(actionGetService());
    dispatch(actionGetUsers());
    fetchRoles(setRoles);
  }, [dispatch]);

  useEffect(() => {
    setUsers(usersForCompany);
  }, [usersForCompany]);

  // Gestion des événements
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (editMode) {
      const updatedUsers = users.map((user) =>
        user.id === selectedUserId ? { ...user, ...formData } : user
      );
      setUsers(updatedUsers);
      dispatch(updateUser(formData));
    } else {
      dispatch(addUser(formData));
    }
    resetForm();
  };

  const handleDelete = (userId) => {
    ModalView(`Voulez-vous vraiment supprimer ${userId.first_name} ${userId.last_name} ?`,{action:'delete user',data:userId.id});
    
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
    // Envoyer une action Redux pour supprimer côté backend si nécessaire
  };

  const handleEdit = (userId) => {
    const userToEdit = users.find((user) => user.id === userId);
    if (userToEdit) {
      setFormData(userToEdit);
      setEditMode(true);
      setSelectedUserId(userId);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData());
    setEditMode(false);
    setSelectedUserId(null);
  };

  return (
    <div className="user-management-container">
      {/* Formulaire utilisateur */}
      <div className="user-form">
        <h3>{editMode ? 'Modifier Utilisateur' : 'Ajouter Utilisateur'}</h3>
        <UserForm
          formData={formData}
          services={services}
          roles={roles}
          editMode={editMode}
          onInputChange={handleInputChange}
          onReset={resetForm}
          onSubmit={handleSubmit}
        />
      </div>

      {/* Liste des utilisateurs */}
      <div className="user-list">
        <h3>Les utilisateurs</h3>
        {users.length === 0 ? (
          <p>Aucun utilisateur</p>
        ) : (
          users.map((user) => (
            <UserItem
              key={user.id}
              user={user}
              onEdit={() => handleEdit(user.id)}
              onDelete={() => handleDelete(user)}
            />
          ))
        )}
      </div>
    </div>
  );
};

const UserForm = ({ formData, services, roles, editMode, onInputChange, onReset, onSubmit }) => (
  <>
    <div className="contentName">
      <input
        type="text"
        name="first_name"
        placeholder="Prénom"
        value={formData.first_name}
        onChange={onInputChange}
      />
      <input
        type="text"
        name="last_name"
        placeholder="Nom"
        value={formData.last_name}
        onChange={onInputChange}
      />
      <input
        type="text"
        name="middle_name"
        placeholder="Post-nom"
        value={formData.middle_name}
        onChange={onInputChange}
      />
    </div>
    <input
      type="email"
      name="email"
      placeholder="Email"
      value={formData.email}
      onChange={onInputChange}
    />
    <select
      name="service_id"
      value={formData.service_id}
      onChange={onInputChange}
    >
      <option value="">Sélectionnez un service</option>
      {services.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </select>
    <select
      name="role_id"
      value={formData.role_id}
      onChange={onInputChange}
    >
      <option value="">Sélectionnez un rôle</option>
      {roles.map((role) => (
        <option key={role.id} value={role.id}>
          {role.name}
        </option>
      ))}
    </select>
    {!editMode && (
      <>
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={onInputChange}
        />
        <input
          type="password"
          name="password_confirmation"
          placeholder="Confirmez le mot de passe"
          value={formData.password_confirmation}
          onChange={onInputChange}
        />
      </>
    )}
    <div className="buttons">
      <button className="btn-delete" onClick={onReset}>
        Effacer
      </button>
      <button className="btn-save" onClick={onSubmit}>
        {editMode ? 'Mettre à jour' : 'Ajouter'}
      </button>
    </div>
  </>
);

const UserItem = ({ user, onEdit, onDelete }) => (
  <div className="user-item">
    <div style={{ width: '30%', textAlign: 'left' }}>
      {user.first_name} {user.last_name} {user.middle_name}
    </div>
    <div style={{ width: '30%', textAlign: 'left' }}>{user.email}</div>
    <div style={{ width: '15%', textAlign: 'left' }}>
      {user.roles?.[0]?.name || 'N/A'}
    </div>
    <div className="user-actions">
      <button className="btn-edit" onClick={onEdit}>
        ✏️
      </button>
      <button className="btn-delete" onClick={onDelete}>
        🗑️
      </button>
    </div>
  </div>
);

const initialFormData = () => ({
  email: "",
  first_name: "",
  last_name: "",
  middle_name: "",
  service_id: 1,
  role_id: 6,
  password: "",
  password_confirmation: ""
});

export default UserManagement;
