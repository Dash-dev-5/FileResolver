import React, { useState, useEffect } from 'react';
import './FolderManagement.css';
import { useOutletContext } from 'react-router-dom';

const FolderManagement = () => {
  const { ModalView } = useOutletContext();
  
  // Initial state for folder form
  const [folderData, setFolderData] = useState({ folderName: '', company: '' });
  const [folderDataService, setFolderDataService] = useState({ service: '', comment: '' });

  const [folders, setFolders] = useState(() => {
    const storedFolders = localStorage.getItem('classeur');
    return storedFolders ? JSON.parse(storedFolders) : [];
  });

  const [services, setServices] = useState(() => {
    const storedServices = localStorage.getItem('service');
    return storedServices ? JSON.parse(storedServices) : [];
  });

  const [editMode, setEditMode] = useState(false);
  const [selectedFolderIndex, setSelectedFolderIndex] = useState(null);
  const [editMode2, setEditMode2] = useState(false);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem('classeur', JSON.stringify(folders));
  }, [folders]);

  useEffect(() => {
    localStorage.setItem('service', JSON.stringify(services));
  }, [services]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFolderData({ ...folderData, [name]: value });
  };

  const handleInputChange2 = (e) => {
    const { name, value } = e.target;
    setFolderDataService({ ...folderDataService, [name]: value });
  };

  const handleSubmit = () => {
    if (editMode) {
      const updatedFolders = [...folders];
      updatedFolders[selectedFolderIndex] = folderData;
      setFolders(updatedFolders);
      setEditMode(false);
    } else {
      setFolders([...folders, folderData]);
    }
    setFolderData({ folderName: '', company: '' });
  };

  const handleSubmit2 = () => {
    if (editMode2) {
      const updatedServices = [...services];
      updatedServices[selectedServiceIndex] = folderDataService;
      setServices(updatedServices);
      setEditMode2(false);
    } else {
      setServices([...services, folderDataService]);
    }
    setFolderDataService({ service: '', comment: '' });
  };

  const handleDelete = async (index) => {
    const response = await ModalView("Voulez-vous vraiment supprimer ce classeur ?", async () => {
      const finalResponse = await ModalView("Cette action est irréversible. Confirmez-vous ?");
      if (finalResponse === 'OK') {
        handleFinalConfirmation(index);
      }
    });
  };

  const handleFinalConfirmation = (index) => {
    const updatedFolders = folders.filter((_, i) => i !== index);
    setFolders(updatedFolders);
  };

  const handleDelete2 = async (index) => {
    const response = await ModalView("Voulez-vous vraiment supprimer ce service ?", async () => {
      const finalResponse = await ModalView("Cette action est irréversible. Confirmez-vous ?");
      if (finalResponse === 'OK') {
        handleFinalConfirmation2(index);
      }
    });
  };

  const handleFinalConfirmation2 = (index) => {
    const updatedServices = services.filter((_, i) => i !== index);
    setServices(updatedServices);
  };

  const handleEdit = (index) => {
    setFolderData(folders[index]);
    setSelectedFolderIndex(index);
    setEditMode(true);
  };

  const handleEdit2 = (index) => {
    setFolderDataService(services[index]);
    setSelectedServiceIndex(index);
    setEditMode2(true);
  };

  const clearForm = () => {
    setFolderData({ folderName: '', company: '' });
    setEditMode(false);
  };

  const clearForm2 = () => {
    setFolderDataService({ service: '', comment: '' });
    setEditMode2(false);
  };

  return (
    <div className="folder-management-container">
      <div className="rowManager">
        <div className="folder-form">
          <h3>{editMode ? 'Modifier un classeur' : 'Ajouter un classeur'}</h3>

          <input
            type="text"
            name="folderName"
            placeholder="Nom du classeur"
            value={folderData.folderName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="company"
            placeholder="Entreprise"
            value={folderData.company}
            onChange={handleInputChange}
          />

          <div className="buttons">
            <button className="btn-delete" onClick={clearForm}>
              Effacer
            </button>
            <button className="btn-save" onClick={handleSubmit}>
              {editMode ? 'Mettre à jour' : 'Ajouter'}
            </button>
          </div>
        </div>

        <div className="folder-list">
          <h3>Liste des classeurs</h3>
          {folders.length === 0 ? (
            <p>Aucun classeur</p>
          ) : (
            folders.map((folder, index) => (
              <div key={index} className="folder-item">
                <div className="paragraphe">{folder.folderName}</div>
                <div className="paragraphe">{folder.company}</div>
                <div className="folder-actions">
                  <button className="btn-edit" onClick={() => handleEdit(index)}>✏️</button>
                  <button className="btn-delete" onClick={() => handleDelete(index)}>🗑️</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="rowManager">
        <div className="folder-form">
          <h3>{editMode2 ? 'Modifier un service' : 'Ajouter un service'}</h3>

          <input
            type="text"
            name="service"
            placeholder="Nom du service"
            value={folderDataService.service}
            onChange={handleInputChange2}
          />
          <input
            type="text"
            name="comment"
            placeholder="Commentaire"
            value={folderDataService.comment}
            onChange={handleInputChange2}
          />

          <div className="buttons">
            <button className="btn-delete" onClick={clearForm2}>
              Effacer
            </button>
            <button className="btn-save" onClick={handleSubmit2}>
              {editMode2 ? 'Mettre à jour' : 'Ajouter'}
            </button>
          </div>
        </div>

        <div className="folder-list">
          <h3>Liste des services</h3>
          {services.length === 0 ? (
            <p>Aucun service</p>
          ) : (
            services.map((service, index) => (
              <div key={index} className="folder-item">
                <div className="paragraphe">{service.service}</div>
                <div className="paragraphe">{service.comment}</div>
                <div className="folder-actions">
                  <button className="btn-edit" onClick={() => handleEdit2(index)}>✏️</button>
                  <button className="btn-delete" onClick={() => handleDelete2(index)}>🗑️</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FolderManagement;
