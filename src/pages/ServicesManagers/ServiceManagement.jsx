import React, { useEffect, useLayoutEffect, useState } from 'react';
import './ServiceManagement.css';
import { useOutletContext } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addService, updateService, deleteService } from '../../../redux/actions/actionsServices';
import { addFolder, updateFolder, deleteFolder } from '../../../redux/actions/actionsBinder'; // Actions Redux pour les classeurs
import { ationGetBinderCategory } from '../../../redux/actions/ationGetBinderCategory';
import { actionGetBinder } from '../../../redux/actions/actionGetBinder';
import { actionGetService } from '../../../redux/actions/actionGetService';

const formatDate = (isoDateString) => {
  const date = new Date(isoDateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("fr-FR", options);
};


const ServiceManagement = () => {
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
      // dispatch(actionGetBinder())
    } else {
      dispatch(addFolder(folderData)); // ID unique temporaire
      // console.log('fol',folders);
      
    }
    setFolderData({ id: null, name: '', binder_category_id: '' });
  };

  const handleSubmitService = () => {
    if (editModeService) {
      dispatch(updateService(folderDataService,()=>{
        dispatch(actionGetService())
      }));
      setEditModeService(false);
    } else {
      dispatch(addService(folderDataService)); // ID unique temporaire
    }
    setFolderDataService({ name: '' });
  };

  // Gestion des suppressions
  const handleDeleteFolder = async (id) => {
    ModalView("Voulez-vous vraiment supprimer ce dossier ?",{action:'delete folder',data:id});
  };

  const handleDeleteService =  (id) => {
    ModalView("Voulez-vous vraiment supprimer ce service ?",{action:'delete service',data:id});
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
        {/* Formulaire pour les services */}
        <div className="folder-form-serv">
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
      {/* Titres pour les colonnes */}
      <div className="folder-header">
        <div className="paragraphes" style={{ width: '35%', textAlign: 'left', fontWeight: 'bold' }}>Nom</div>
        <div className="paragraphes sm" style={{ width: '21.2%', textAlign: 'left', fontWeight: 'bold' }}>Creé le</div>
        <div className="paragraphes sm" style={{ width: '21.2%', textAlign: 'left', fontWeight: 'bold' }}>Dernière modification</div>
                <div className="folder-actions"></div>
      </div>
          <div className="first">
          {services.length === 0 ? (
            <p>Aucun service</p>
          ) : (
            services.map(service => (
              <div key={service.id} className="folder-item">
                <div className="paragraphe" style={{width:'30%',textAlign : 'left'}}>{service.name}</div>
                <div className="paragraphe sm" style={{width:'20%',textAlign : 'left'}}>{formatDate(service.created_at)}</div>
                <div className="paragraphe sm" style={{width:'20%',textAlign : 'left'}}>{formatDate(service.updated_at)}</div>
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
    </div>
  );
};

export default ServiceManagement;
