import React, { useState, useEffect } from 'react';
import './SubmitFile.css';
import DragAndDrop from '../../component/DragAnDrop/DragAndDrop';
import { useDispatch, useSelector } from 'react-redux';
import { actionGetBinder } from '../../../redux/actions/actionGetBinder';
import { uploadFile } from '../../../request/uploadFile';
import ProgressBar from "@ramonak/react-progress-bar";
import { alertParam } from '../../../request/alertParam';
import { actionGetFileByBinder } from '../../../redux/actions/actionGetFileByBinder';
import { useNavigate } from 'react-router-dom';


// Formater une date en français
const formatDate = (isoDateString) => {
  const date = new Date(isoDateString);
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const SubmitFile = () => {
  const typeSubmit = useSelector((state) => state.typeOfSubmit);
  const classeurs = useSelector((state) => state.classeurs);
  const dispatch = useDispatch();
  const files = useSelector((state) => state.fileForBinder) || [];
  const navigation =useNavigate()

  const [percenta, setPercent] = useState(0);
  const [name, setName] = useState('');
  const [object, setObject] = useState('');
  const [numRef, setNumRef] = useState('');
  const [binderId, setBinderId] = useState('');
  const [note, setNote] = useState('');
  const [filePath, setFilePath] = useState(null);
  const [service, setService] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Récupérer les classeurs depuis le Redux store
  useEffect(() => {
    dispatch(actionGetBinder());
  }, [dispatch]);
  useEffect(() => {
    if (percenta == 100){
      setTimeout(() => {
        setPercent(0)
      }, 2000);
    }
  }, [percenta]);

  // Charger les services
  useEffect(() => {
    fetch('/api/services') // Remplace par ton endpoint réel
      .then((response) => response.json())
      .then((data) => setService(data))
      .catch((err) => console.error('Erreur lors de la récupération des services:', err));
  }, []);

  const validateForm = () => {
    if (!name || !object || !numRef || !binderId || !filePath || !note) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return false;
    }
    return true;
  };
  const handleView = (item) => {
    navigation("/home/MyPDFViewer", { state: { item } });
  };
  const handleFileRename = () => {
    // console.log('Type de filePath:',  filePath); // Devrait afficher "object"
    if (!validateForm()) return;
  
    // if (!(filePath instanceof File)) {
    //   setErrorMessage('Le fichier sélectionné est invalide.');
    //   return;
    // }
  

    // console.log('Instance de File:', filePath instanceof File); 
    // console.log('Nom du fichier:', filePath.name);
    
    uploadFile({
      name,
      object,
      numRef,
      binderId,
      filePath,
      note,
      onProgress: (percent) => {
        setPercent(percent)
      },
    },()=>{
      dispatch(actionGetFileByBinder())
    })
      .then(() => {
        // alertParam('Fichier envoyé !','success',5000)
        
      }
      )
      .catch((err) => {
        setErrorMessage('Échec du téléchargement, veuillez réessayer.');
        console.error('Erreur lors de l\'upload :', err);
      });
  };
  

  return (
    <div className="main-content">
      <div className="firtBlock">
        {typeSubmit === 'receive' && (
          <div className="invoice-container">
            <h4 style={{ marginBottom: 10 }}>Fichiers dans les classeurs</h4>
            {/* Exemple de liste */}
            {files
  .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // Trier du plus récent au plus ancien
  .map((file) => (
    <li key={file.id} className="document-detail">
      <div className="doc-title">{file.name}</div>
      <div className="doc-ref">N° Ref : {file.num_ref}</div>
      <div className="doc-ref">Date : {formatDate(file.created_at)}</div>
      <div className="action-btn" style={{ display: "flex" }}>
        <div className="viewBtn" onClick={() => handleView(file)}>
          Voir
        </div>
      </div>
    </li>
  ))}

          </div>
        )}
      </div>

      <div className="form-area">
        {typeSubmit !== 'receive' ? (
          <button className="btn-send btn-padding" onClick={handleFileRename}>
            Enregistrer
          </button>
        ) : (
          <button className="btn-send btn-padding" onClick={handleFileRename}>
            Envoyer
          </button>
        )}
        {errorMessage && <div className="error">{errorMessage}</div>}
        {typeSubmit !== 'receive' && (
          <select value={selectedFolder} onChange={(e) => setSelectedFolder(e.target.value)}>
            <option value="">Choisir le service</option>
            {service.map((folder, index) => (
              <option key={index} value={folder.service}>
                {folder.service} - {folder.comment}
              </option>
            ))}
          </select>
        )}
        <input
          type="text"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select value={binderId} onChange={(e) => setBinderId(e.target.value)}>
          <option value="">Sélectionnez un classeur</option>
          {classeurs.map((folder, index) => (
            <option key={index} value={folder.id}>
              {folder.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Objet"
          value={object}
          onChange={(e) => setObject(e.target.value)}
        />
        <input
          type="text"
          placeholder="N° de référence"
          value={numRef}
          onChange={(e) => setNumRef(e.target.value)}
        />
        <textarea
          placeholder="Note"
          className="Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        ></textarea>
        <div className="upload-area">
          {percenta > 1 && <ProgressBar completed={percenta} bgColor='#0ba9f3' labelSize='8px' margin='4px' height='12px'/>}
          <DragAndDrop setPreview={setFilePath} preview={filePath} />
        </div>
      </div>
    </div>
  );
};

export default SubmitFile;
