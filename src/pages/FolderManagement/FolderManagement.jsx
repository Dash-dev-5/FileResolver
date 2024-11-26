import React, { useEffect, useLayoutEffect, useState } from 'react';
import './FolderManagement.css';
import { useOutletContext } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addService, updateService, deleteService } from '../../../redux/actions/actionsServices';
import { addFolder, updateFolder, deleteFolder } from '../../../redux/actions/actionsBinder'; // Actions Redux pour les classeurs
import { ationGetBinderCategory } from '../../../redux/actions/ationGetBinderCategory';
import { actionGetBinder } from '../../../redux/actions/actionGetBinder';
import { actionGetService } from '../../../redux/actions/actionGetService';

const formatDate = (isoDateString) => {
 

// Créer un objet Date à partir de la chaîne ISO
const date = new Date(isoDateString);

// Options pour formater la date
const options = {
  weekday: 'long', // Jour de la semaine
  year: 'numeric', // Année
  month: 'long', // Mois en texte
  day: 'numeric', // Jour du mois
  hour: '2-digit', // Heure sur 2 chiffres
  minute: '2-digit', // Minute sur 2 chiffres
  second: '2-digit', // Seconde sur 2 chiffres
  timeZoneName: 'short', // Nom du fuseau horaire (ex : UTC, GMT)
};

// Formater la date selon les options
const formattedDate = date.toLocaleString('fr-FR', options);
return formattedDate
}

const FolderManagement = () => {
  const services = useSelector(state => state.services);
  const folders = useSelector(state => state.classeurs);
  // console.log(services);
  
  const { ModalView } = useOutletContext();
  const dispatch = useDispatch();
  const categorieBinder = useSelector(state => state.classeursCategories)
  useLayoutEffect(()=>{
    dispatch(ationGetBinderCategory())
    dispatch(actionGetService())
    dispatch(actionGetBinder())
  },[])
  // Récupérer les services et classeurs depuis le store Redux
 

  // États pour les formulaires
  const [folderData, setFolderData] = useState({
    "name":"",
    "company_id":'',
    "service_id":'',
    "binder_category_id":""
});
  const [folderDataService, setFolderDataService] = useState({ name: '' });

  // États d'édition
  const [editModeFolder, setEditModeFolder] = useState(false);
  const [editModeService, setEditModeService] = useState(false);

  // Gestion des inputs
  const handleInputChangeFolder = (e) => {
    const { name, value } = e.target;
    setFolderData({ ...folderData, [name]: value });
  };

  const handleInputChangeService = (e) => {
    const { name, value } = e.target;
    setFolderDataService({ ...folderDataService, [name]: value });
  };

  // Soumission des formulaires
  const handleSubmitFolder = () => {
    if (editModeFolder) {
      dispatch(updateFolder(folderData));
      setEditModeFolder(false);
    } else {
      dispatch(addFolder(folderData)); // ID unique temporaire
      // console.log('fol',folders);
      
    }
    setFolderData({ id: null, name: '', binder_category_id: '' });
  };

  const handleSubmitService = () => {
    if (editModeService) {
      dispatch(updateService(folderDataService));
      setEditModeService(false);
    } else {
      dispatch(addService(folderDataService)); // ID unique temporaire
    }
    setFolderDataService({ name: '' });
  };

  // Gestion des suppressions
  const handleDeleteFolder = async (id) => {
    const response = await ModalView("Voulez-vous vraiment supprimer ce classeur ?", async () => {
      const finalResponse = await ModalView("Cette action est irréversible. Confirmez-vous ?");
      if (finalResponse === 'OK') {
        dispatch(deleteFolder(id));
      }
    });
  };

  const handleDeleteService = async (id) => {
    const response = await ModalView("Voulez-vous vraiment supprimer ce service ?", async () => {
      const finalResponse = await ModalView("Cette action est irréversible. Confirmez-vous ?");
      if (finalResponse === 'OK') {
        dispatch(deleteService(id));
      }
    });
  };

  // Gestion des éditions
  const handleEditFolder = (folder) => {
    setFolderData(folder);
    setEditModeFolder(true);
  };

  const handleEditService = (service) => {
    setFolderDataService(service);
    setEditModeService(true);
  };

  // Réinitialisation des formulaires
  const clearFormFolder = () => {
    setFolderData({ id: null, name: '', binder_category_id: '' });
    setEditModeFolder(false);
  };

  const clearFormService = () => {
    setFolderDataService({ name: ''});
    setEditModeService(false);
  };

  return (
    <div className="folder-management-container">
      <div className="rowManager">
        {/* Formulaire pour les classeurs */}
        <div className="folder-form">
          <h3>{editModeFolder ? 'Modifier un classeur' : 'Ajouter un classeur'}</h3>
          <input
            type="text"
            name="name"
            placeholder="Nom du classeur"
            value={folderData.name}
            onChange={handleInputChangeFolder}
          />
          {/* <input
            type="text"
            name="company"
            placeholder="Entreprise"
            value={folderData.company}
            onChange={handleInputChangeFolder}
          /> */}
           <select
          name="service_id"
          value={folderData.service_id}
          onChange={handleInputChangeFolder}
        >
          <option value="">Sélectionnez le service</option>
          {services.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
           <select
          name="binder_category_id"
          value={folderData.binder_category_id}
          onChange={handleInputChangeFolder}
        >
          <option value="">Sélectionnez la categorie du doc</option>
          {categorieBinder.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
          <div className="buttons">
            <button className="btn-delete" onClick={clearFormFolder}>
              Effacer
            </button>
            <button className="btn-save" onClick={handleSubmitFolder}>
              {editModeFolder ? 'Mettre à jour' : 'Ajouter'}
            </button>
          </div>
        </div>

        {/* Liste des classeurs */}
        <div className="folder-list">
          <h3>Liste des classeurs</h3>
          {folders.length === 0 ? (
            <p>Aucun classeur</p>
          ) : (
            folders.map(folder => (
              <div key={folder.id} className="folder-item">
                <div className="paragraphe ">{folder.name}</div>
                <div className="paragraphe sm">{formatDate(folder.created_at)}</div>
                <div className="paragraphe sm">{formatDate(folder.updated_at)}</div>
                <div className="folder-actions">
                  <button className="btn-edit" onClick={() => handleEditFolder(folder)}>✏️</button>
                  <button className="btn-delete" onClick={() => handleDeleteFolder(folder.id)}>🗑️</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="rowManager">
        {/* Formulaire pour les services */}
        <div className="folder-form">
          <h3>{editModeService ? 'Modifier un service' : 'Ajouter un service'}</h3>
          <input
            type="text"
            name="name"
            placeholder="Nom du service"
            value={folderDataService.name}
            onChange={handleInputChangeService}
          />
          {/* <input
            type="text"
            name="company_id"
            placeholder="ID de l'entreprise"
            value={folderDataService.company_id}
            onChange={handleInputChangeService}
          /> */}
          <div className="buttons">
            <button className="btn-delete" onClick={clearFormService}>
              Effacer
            </button>
            <button className="btn-save" onClick={handleSubmitService}>
              {editModeService ? 'Mettre à jour' : 'Ajouter'}
            </button>
          </div>
        </div>

        {/* Liste des services */}
        <div className="folder-list">
          <h3>Liste des services</h3>
          {services.length === 0 ? (
            <p>Aucun service</p>
          ) : (
            services.map(service => (
              <div key={service.id} className="folder-item">
                <div className="paragraphe">{service.name}</div>
                <div className="paragraphe sm">{formatDate(service.created_at)}</div>
                <div className="paragraphe sm">{formatDate(service.updated_at)}</div>
                <div className="folder-actions">
                  <button className="btn-edit" onClick={() => handleEditService(service)}>✏️</button>
                  <button className="btn-delete" onClick={() => handleDeleteService(service.id)}>🗑️</button>
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
