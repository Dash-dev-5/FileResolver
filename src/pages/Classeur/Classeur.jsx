// MainContent.js
import React from 'react';
import './Classeur.css';

const documents = [
  { name: "Regideso", createdAt: "12 juin 2024", updatedAt: "12 juin 2024", docCount: 5 },
  { name: "Regideso", createdAt: "12 juin 2024", updatedAt: "12 juin 2024", docCount: 5 },
  { name: "Regideso", createdAt: "12 juin 2024", updatedAt: "12 juin 2024", docCount: 5 },
  { name: "Regideso", createdAt: "12 juin 2024", updatedAt: "12 juin 2024", docCount: 5 },
  { name: "Regideso", createdAt: "12 juin 2024", updatedAt: "12 juin 2024", docCount: 5 },
  // Add more as needed...
];

const Classeur = () => {
  return (
    <div className="main-content-classeur">
      <div className="document-list">
        {documents.map((doc, index) => (
          <div key={index} className="document-item">
            <span className="doc-name">{doc.name}</span>
            <span className="doc-date">Créer le {doc.createdAt}</span>
            <span className="doc-date">Modifier le {doc.updatedAt}</span>
            <span className="doc-count">Documents {doc.docCount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classeur;
