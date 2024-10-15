import React, { useState, useEffect } from 'react';
import './SubmitFile.css';
import DragAndDrop from '../../component/DragAnDrop/DragAndDrop';
import { useSelector } from 'react-redux';

const SubmitFile = () => {
  const typeSubmit = useSelector(state => state.typeOfSubmit)
  console.log(typeSubmit);
  
  // Factures fictives
  const invoices = [
    { nom: "Facture Regideso", objet: "Facturation eau", reference: "0152526/GJ61537" },
    { nom: "Facture Regideso", objet: "Facturation eau", reference: "0152526/GJ61537" },
  ];

  // État pour le fichier et le nouveau nom de fichier
  const [file, setFile] = useState(null);
  const [newFileName, setNewFileName] = useState('');

  // État pour la liste des classeurs et le classeur sélectionné
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState('');

  const [service, setService] = useState([]);
  const [selectedService, setSelectedService] = useState('');
   // Récupérer les classeurs dans le local storage
   useEffect(() => {
    const storedFolders = localStorage.getItem('service');
    if (storedFolders) {
      setService(JSON.parse(storedFolders));
    }
  }, []);

  // Récupérer les classeurs dans le local storage
  useEffect(() => {
    const storedFolders = localStorage.getItem('classeur');
    if (storedFolders) {
      setFolders(JSON.parse(storedFolders));
    }
  }, []);

  // Fonction de renommage de fichier
  const handleFileRename = () => {
    if (!file) {
      alert("Aucun fichier n'est chargé.");
      return;
    }

    if (!newFileName) {
      alert("Veuillez entrer un nouveau nom de fichier.");
      return;
    }

    const extension = file.name.split('.').pop(); // Récupère l'extension du fichier original
    const renamedFile = new File([file], `${newFileName}.${extension}`, { type: file.type });

    // Sauvegarder le fichier avec le nouveau nom
    saveAs(renamedFile);

    // Mettre à jour l'état du fichier avec le nouveau fichier renommé
    setFile(renamedFile);
    setNewFileName(''); // Réinitialise l'input après renommage
  };

  return (
    <div className="main-content">
      <div className="firtBlock">
        { typeSubmit  === 'receive' 
          &&
        <div className="invoice-container">
          <h4 style={{marginBottom:10}}>Fichiers dans les classeurs</h4>
          <div className="invoice-header">
            <span>Nom</span>
            <span>Objet</span>
            <span>N° de référence</span>
          </div>
          {invoices.map((invoice, index) => (
            <div key={index} className="invoice-row">
              <input type="checkbox" className='chekbox' />
              <span>{invoice.nom}</span>
              <span>{invoice.objet}</span>
              <span>{invoice.reference}</span>
            </div>
          ))}
        </div>}
        <div className="upload-area">
          <DragAndDrop />
        </div>
      </div>

      <div className="form-area">
       {typeSubmit  !== 'receive' ?
        <button className="btn-send btn-padding" onClick={handleFileRename}>Enregistrer</button>
        :
        <button className="btn-send btn-padding" onClick={handleFileRename}>Envoyer</button>
        }
        {/* Sélection du classeur dans un select */}

       { 
        typeSubmit  !== 'receive' &&
        <select
          value={selectedFolder}
          onChange={(e) => setSelectedFolder(e.target.value)}
        >
          <option value="">Choisir le service</option>
          {service.map((folder, index) => (
            <option key={index} value={folder.service}>
              {folder.service} - {folder.comment}
            </option>
          ))}
        </select>}
        <select
          value={selectedFolder}
          onChange={(e) => setSelectedFolder(e.target.value)}
        >
          <option value="">Sélectionnez un classeur</option>
          {folders.map((folder, index) => (
            <option key={index} value={folder.folderName}>
              {folder.folderName} - {folder.company}
            </option>
          ))}
        </select>
        <input type="text" placeholder="Objet" />
        <input type="text" placeholder="N° de référence" />
        <textarea placeholder="Note" className="Note"></textarea>
      </div>
    </div>
  );
};

export default SubmitFile;
