import React, { useState } from 'react';
import './DragAndDrop.css';
import pdf from '../../assets/Untitled.pdf'
import PDFViewer from '../PDF/PDFViewer';

const DragAndDrop = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');

  // Liste des extensions de fichiers acceptées
  const acceptedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];

  const handleDragOver = (event) => {
    event.preventDefault(); // Empêche le comportement par défaut
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setError(''); // Réinitialise les erreurs
    const droppedFile = event.dataTransfer.files[0]; // On prend le premier fichier déposé
    processFile(droppedFile);
  };

  const handleFileInput = (event) => {
    const selectedFile = event.target.files[0]; // On prend le premier fichier sélectionné
    processFile(selectedFile);
  };

  const processFile = (file) => {
    if (file && acceptedFileTypes.includes(file.type)) {
      setFile(file);

      if (file.type.startsWith('image/')) {
        // Si c'est une image, on crée une prévisualisation
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreview(e.target.result);
        };
        reader.readAsDataURL(file);
      } else if (file.type === 'application/pdf') {
        // Si c'est un PDF, on affiche juste un lien de téléchargement
        setPreview(URL.createObjectURL(file));
      }
    } else {
      // Si l'extension n'est pas acceptée, on affiche une erreur
      setError('Type de fichier non pris en charge. Veuillez déposer une image ou un PDF.');
      setFile(null);
      setPreview(null);
    }
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

          {file.type.startsWith('image/') && (
            <img src={preview} alt="Preview" className="file-image" />
          )}

<PDFViewer fileUrl={'../../assets/Untitled.pdf'} />
          {file.type === 'application/pdf' && (
            <div className="file-pdf">
              {/* <embed src={preview} width="600" height="400" type="application/pdf" /> */}
              {/* <p>
                <a href={preview} download={file.name}>
                  Télécharger le PDF
                </a>
              </p> */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DragAndDrop;
