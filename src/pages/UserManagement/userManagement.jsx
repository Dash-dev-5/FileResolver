import React, { useState, useEffect } from 'react';
import './UserManagement.css';
import { actionGetService } from '../../../redux/actions/actionGetService';
import { useDispatch, useSelector } from 'react-redux';
import { actionGetUsers } from '../../../redux/actions/actionGetUsers';
import { addUser } from '../../../redux/actions/actionsUsersForCompany';

const UserManagement = () => {
  const services = useSelector(state=>state.services)
  const usersForCompany = useSelector(state=>state.usersForCompany) || null

  const userProfil = useSelector(state=>state.profile)
  const dispatch = useDispatch()
 useEffect(()=>{
   dispatch(actionGetService())
   dispatch(actionGetUsers())
 },[])
 console.log('view',usersForCompany);
 
  // Initial state for the users list
  const [users, setUsers] = useState(() => {
    // const storedUsers = localStorage.getItem('users');
    return usersForCompany ? usersForCompany : [
      { name: 'Aristote Makuala', email: 'aristote@gmail.com', service: 'Technique', jobFunction: 'Chef de service', password: '', confirmPass: '', role: "" },
      { name: 'John Doe', email: 'johndoe@gmail.com', service: 'Commercial', jobFunction: 'Secretaire', password: '', confirmPass: '', role: "" }
    ];
  });

  // State for the form data (used for both adding and editing)
  const [formData, setFormData] = useState(
    {
      "email": "",
      "first_name": "",
      "last_name": "",
      "middle_name": "",
      "service_id": 1, //exemple service informatique
      "role_id": 6, //exemple chef-service,
      "password": "",
      "password_confirmation": ""
  }
  );

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
      console.log(formData);
      
      dispatch(addUser(formData))
      // setUsers([...users, {...formData,service : selectedService }]);
    }
    console.log(users);
    
    // Reset the form
    setSelectedService('')
    setFormData({
      "email": "",
      "first_name": "",
      "last_name": "",
      "middle_name": "",
      "service_id": 1, //exemple service informatique
      "role_id": 6, //exemple chef-service,
      "password": "",
      "password_confirmation": ""
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
  const [service, setService] = useState([]);
  const [selectedService, setSelectedService] = useState('');
   // Récupérer les classeurs dans le local storage
   useEffect(() => {
    const storedFolders = localStorage.getItem('service');
    if (storedFolders) {
      setService(JSON.parse(storedFolders));
    }
  }, []);

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
//   {
//     "email": "Shany16@hotmail.com",
//     "first_name": "Bernie_Dietrich93",
//     "last_name": "Karelle",
//     "middle_name": "Jacobs",
//     "service_id": 1, //exemple service informatique
//     "role_id": 6, //exemple chef-service,
//     "password": "12345678",
//     "password_confirmation": "12345678"
// }

  return (
    <div className="user-management-container">
      <div className="user-form">
        <h3>{editMode ? 'Modifier Utilisateur' : 'Ajouter Utilisateur'}</h3>
        <div className="contentName">
          <input
            type="text"
            name="first_name"
            placeholder="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="last_name"
            placeholder="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="middle_name"
            placeholder="middle_name"
            value={formData.middle_name}
            onChange={handleInputChange}
          />
          
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
         <select
          name="service_id"
          value={formData.service_id}
          onChange={handleInputChange}
        >
          <option value="">Sélectionnez un service</option>
          {services.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        {/* <input
          type="text"
          name="service"
          placeholder="Service"
          value={formData.service}
          onChange={handleInputChange}
        /> */}
        {/* <input
          type="text"
          name="jobFunction"  // Changed from function to jobFunction
          placeholder="Fonction"
          value={formData.jobFunction}
          onChange={handleInputChange}
        /> */}
        <select
          name="role_id"
          value={formData.role_id}
          onChange={handleInputChange}
          className="role-select"
        >
          <option value="">Selectioner pouvoir</option>
          <option value={4}>Directeur</option>
          <option value={2}>Administrateur</option>
          <option value={3}>Service</option>
          <option value={6}>Secrétaire</option>
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
          name="password_confirmation"
          placeholder="Confirmer le mot de passe"
          value={formData.password_confirmation}
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
        {usersForCompany !== null && usersForCompany.length === 0 ? (
          <p>Aucun utilisateur</p>
        ) : (
          usersForCompany.map((user, index) => (
            <div key={user.id} className="user-item">
              <div className="paragraphe">{user.first_name} {user.last_name} {user.middle_name}</div>
              <div className="paragraphe">{user.email}</div>
              <div className="paragraphe">{user.roles[0].name}</div>
              {/* <div className="paragraphe">{user.jobFunction}</div> Updated here */}
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
