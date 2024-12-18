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
  const date = new Date(isoDateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("fr-FR", options);
};


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


  // États d'édition
  const [editModeFolder, setEditModeFolder] = useState(false);


  // Gestion des inputs
  const handleInputChangeFolder = (e) => {
    const { name, value } = e.target;
    setFolderData({ ...folderData, [name]: value });
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

  // Gestion des suppressions
  const handleDeleteFolder = async (id) => {
    ModalView("Voulez-vous vraiment supprimer ce dossier ?",{action:'delete folder',data:id});
  };


  // Gestion des éditions
  const handleEditFolder = (folder) => {
    setFolderData(folder);
    setEditModeFolder(true);
  };


  // Réinitialisation des formulaires
  const clearFormFolder = () => {
    setFolderData({ id: null, name: '', binder_category_id: '' });
    setEditModeFolder(false);
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
          <div className="first">
          {folders.length === 0 ? (
            <p>Aucun classeur</p>
          ) : (
            folders.map(folder => (
              <div key={folder.id} className="folder-item">
                <div className="paragraphe " style={{width:'30%',textAlign : 'left'}}>{folder.name}</div>
                <div className="paragraphe sm" style={{width:'20%',textAlign : 'left'}}>{formatDate(folder.created_at)}</div>
                <div className="paragraphe sm" style={{width:'20%',textAlign : 'left'}}>{formatDate(folder.updated_at)}</div>
                <div className="folder-actions">
                  <button className="btn-edit" onClick={() => handleEditFolder(folder)}>✏️</button>
                  <button className="btn-delete" onClick={() => handleDeleteFolder(folder.id)}>🗑️</button>
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

export default FolderManagement;
