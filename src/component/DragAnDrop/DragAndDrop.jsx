import React, { useState } from 'react';
import './DragAndDrop.css';
import { saveAs } from 'file-saver';
import { useNavigate } from 'react-router-dom';
import { alertParam } from '../../../request/alertParam';

const DragAndDrop = ({ preview, setPreview }) => {
  const [file, setFile] = useState(null);
  // const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const navigation = useNavigate()
  // const [newFileName, setNewFileName] = useState(''); // Pour stocker le nouveau nom

  const acceptedFileTypes = [ 'application/pdf'];

  const handeleView = (item)=>{
    navigation('/home/MyPDFViewer',{ state: { item } })
  }
  const handleDragOver = (event) => {
    event.preventDefault();

  };

  const handleDrop = (event) => {
    event.preventDefault();
    setError('');
    const droppedFile = event.dataTransfer.files[0];
    processFile(droppedFile);
  };

  const handleFileInput = (event) => {
    const selectedFile = event.target.files[0];
    processFile(selectedFile);
  };

  const processFile = (file) => {
    if (file && acceptedFileTypes.includes(file.type)) {
      setPreview(file)
      setFile(file);

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          // setPreview(e.target.result);
        };
        reader.readAsDataURL(file);
      } else if (file.type === 'application/pdf') {
        // setPreview(file);
        // console.log(URL.createObjectURL());
        
      }
    } else {
      setError('Type de fichier non pris en charge. Veuillez déposer un PDF.');
      alertParam("Type de fichier non pris en charge. Veuillez déposer un PDF.",'warning',5000)
      setFile(null);
      setPreview(null);
    }
  };

  const handleFileRename = (newFileName) => {
    if (!newFileName) {
      alert("Veuillez entrer un nouveau nom de fichier.");
      return;
    }

    const extension = file.name.split('.').pop(); // Récupère l'extension du fichier original
    const renamedFile = new File([file], `${newFileName}.${extension}`, { type: file.type });
    
    // Sauvegarder le fichier avec le nouveau nom (si nécessaire)
    saveAs(renamedFile);

    setFile(renamedFile); // Mettre à jour l'état avec le fichier renommé

  };

  return (
    <div className="drag-and-drop">
      <div
        className="drop-zone"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <p>Glissez et déposez un fichier ici (image ou PDF)</p>
        <input
          type="file"
          id="fileInput"
          style={{ display: 'none' }}
          onChange={handleFileInput}
        />
        <button className="upload-button" onClick={() => document.getElementById('fileInput').click()}>
          Importer un fichier
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {file && (
        <div className="file-preview">
          <h4>Fichier chargé: {file.name}</h4>
          {/* <button className="upload-button" onClick={() => handeleView({name: file.name, path: `${preview}` ,})
          }>
            Voir
          </button> */}
        </div>
      )}
    </div>
  );
};

export default DragAndDrop;
