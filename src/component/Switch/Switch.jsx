import React, { useState } from 'react';
import './Switch.css'; // Importation du fichier CSS

const Switch = ({ onActionChange }) => {
  const [selectedAction, setSelectedAction] = useState('send'); // Par défaut, "send" est sélectionné

  // Gestion du changement de checkbox
  const handleOptionChange = (option) => {
    setSelectedAction(option);  // Met à jour l'option sélectionnée
    onActionChange(option);     // Transmet l'option au parent
  };

  return (
    <div className="checkbox-container">
        Choisir le type de dossier a soumetre
      <label>
        <input
          type="checkbox"
          checked={selectedAction === 'send'}
          onChange={() => handleOptionChange('send')}
        />
        Envoyer
      </label>

      <label>
        <input
          type="checkbox"
          checked={selectedAction === 'receive'}
          onChange={() => handleOptionChange('receive')}
        />
        Recu
      </label>
    </div>
  );
};

export default Switch;
