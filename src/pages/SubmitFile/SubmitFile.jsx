import React, { useState } from 'react';
import './SubmitFile.css';
import DragAndDrop from '../../component/DragAnDrop/DragAndDrop';

const SubmitFile = () => {

  const invoices = [
    { nom: "Facture Regideso", objet: "Facturation eau", reference: "0152526/GJ61537" },
    { nom: "Facture Regideso", objet: "Facturation eau", reference: "0152526/GJ61537" },
  ];

const [file, setFile] = useState(null);
  const [newFileName, setNewFileName] = useState('');

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
        <div className="invoice-container">
        <div className="invoice-header">
          <span>Nom</span>
          <span>Objet</span>
          <span>N° de référence</span>
        </div>
        {invoices.map((invoice, index) => (
          <div key={index} className="invoice-row">
            <span>{invoice.nom}</span>
            <span>{invoice.objet}</span>
            <span>{invoice.reference}</span>
          </div>
        ))}
        </div>
        <div className="upload-area">
          <DragAndDrop/>
        </div>
      </div>

      <div className="form-area">
      <button className="btn-send btn-padding" onClick={handleFileRename}>Envoyer</button>
        <input type="text"  
           placeholder="Nouveau nom du fichier"
           value={newFileName}
           onChange={(e) => setNewFileName(e.target.value)}
        />
        <input type="text" placeholder="Correspondant..." />
        <input type="text" placeholder="N° de reference" />
        <textarea placeholder="Note" className='Note'></textarea>
      </div>

      
    </div>
  );
};

export default SubmitFile;
