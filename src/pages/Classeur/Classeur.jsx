import React, { useState } from 'react';
import './Classeur.css';
import { useNavigate } from 'react-router-dom';

const classeurs = [
  {
    name: "Regideso",
    createdAt: "12 juin 2024",
    updatedAt: "12 juin 2024",
    docCount: 5,
    documents: [
      { title: "Facture Janvier", date: "12 Jan 2024", referenceNumber: "Ref001", pdfLink: "/1.pdf" },
      { title: "Contrat de Service", date: "15 Jan 2024", referenceNumber: "Ref002", pdfLink: "/2.pdf" },
      { title: "Rapport Annuel", date: "20 Jan 2024", referenceNumber: "Ref003", pdfLink: "/3.pdf" },
      { title: "Rapport Financier", date: "25 Jan 2024", referenceNumber: "Ref004", pdfLink: "/4.pdf" },
      { title: "Reçu de Paiement", date: "30 Jan 2024", referenceNumber: "Ref005", pdfLink: "/5.pdf" }
    ]
  },
  {
    name: "SNEL",
    createdAt: "10 mai 2024",
    updatedAt: "12 juin 2024",
    docCount: 5,
    documents: [
      { title: "Facture Février", date: "15 Février 2024", referenceNumber: "Ref006", pdfLink: "/6.pdf" },
      { title: "Protocole d'Accord", date: "20 Février 2024", referenceNumber: "Ref007", pdfLink: "/7.pdf" },
      { title: "Lettre de Transmission", date: "28 Février 2024", referenceNumber: "Ref008", pdfLink: "/8.pdf" },
      { title: "Facture Janvier", date: "12 Jan 2024", referenceNumber: "Ref001", pdfLink: "/1.pdf" },
      { title: "Contrat de Service", date: "15 Jan 2024", referenceNumber: "Ref002", pdfLink: "/2.pdf" }
    ]
  },
  {
    name: "BCEAO",
    createdAt: "25 juin 2024",
    updatedAt: "1 juillet 2024",
    docCount: 5,
    documents: [
      { title: "Rapport Annuel", date: "25 Juin 2024", referenceNumber: "Ref009", pdfLink: "/9.pdf" },
      { title: "Statistiques Financières", date: "30 Juin 2024", referenceNumber: "Ref010", pdfLink: "/10.pdf" },
      { title: "Facture Audit", date: "5 Juillet 2024", referenceNumber: "Ref011", pdfLink: "/11.pdf" },
      { title: "Rapport Financier", date: "25 Jan 2024", referenceNumber: "Ref004", pdfLink: "/4.pdf" },
      { title: "Reçu de Paiement", date: "30 Jan 2024", referenceNumber: "Ref005", pdfLink: "/5.pdf" }
    ]
  },
  {
    name: "PNUD",
    createdAt: "3 janvier 2024",
    updatedAt: "10 juin 2024",
    docCount: 5,
    documents: [
      { title: "Contrat Projet", date: "3 Jan 2024", referenceNumber: "Ref012", pdfLink: "/12.pdf" },
      { title: "Rapport Activités", date: "10 Jan 2024", referenceNumber: "Ref013", pdfLink: "/13.pdf" },
      { title: "Facture Services", date: "15 Jan 2024", referenceNumber: "Ref014", pdfLink: "/14.pdf" },
      { title: "Étude de Terrain", date: "20 Jan 2024", referenceNumber: "Ref015", pdfLink: "/15.pdf" },
      { title: "Budget Prévisionnel", date: "25 Jan 2024", referenceNumber: "Ref016", pdfLink: "/16.pdf" }
    ]
  },
  {
    name: "Kollectif Numerique",
    createdAt: "5 août 2024",
    updatedAt: "10 août 2024",
    docCount: 5,
    documents: [
      { title: "Contrat de partenatiat", date: "1 Août 2024", referenceNumber: "Ref018", pdfLink: "/18.pdf" },
      { title: "Contrat de maintenance", date: "2 Août 2024", referenceNumber: "Ref019", pdfLink: "/19.pdf" },
      { title: "Contrat de sous traitence", date: "3 Août 2024", referenceNumber: "Ref020", pdfLink: "/20.pdf" },
      { title: "Preuve de payement", date: "4 Août 2024", referenceNumber: "Ref021", pdfLink: "/21.pdf" },
      { title: "Quitance banque", date: "5 Août 2024", referenceNumber: "Ref022", pdfLink: "/22.pdf" }
    ]
  }
];

const Classeur = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);  // Track which class is expanded
  const [searchQueries, setSearchQueries] = useState({});    // Track search queries for each class
  const navigation = useNavigate()
    const handeleView = (pdf)=>{
      navigation('/home/MyPDFViewer',{ state: { pdf } })
    }

  const toggleDocuments = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleSearchChange = (e, index) => {
    const value = e.target.value;
    setSearchQueries({
      ...searchQueries,
      [index]: value
    });
  };

  return (
    <div className="main-content-classeur">
      <div className="document-list">
        {classeurs.map((classeur, index) => {
          const searchQuery = searchQueries[index] || '';
          const filteredDocuments = classeur.documents.filter(doc =>
            doc.title.toLowerCase().includes(searchQuery.toLowerCase())
          );

          return (
            <div key={index} className="document-item">
              <div className="document-header">
                <span className="doc-name">{classeur.name}</span>
                <span className="doc-date">Créer le {classeur.createdAt}</span>
                <span className="doc-date">Modifier le {classeur.updatedAt}</span>
                <span className="doc-count">Documents {classeur.docCount}</span>
                <button 
                  onClick={() => toggleDocuments(index)} 
                  className="extend-btn"
                >
                  {expandedIndex === index ? 'Réduire' : 'Étendre'}
                </button>
              </div>

              {/* Show search bar and document list when extended */}
              {expandedIndex === index && (
                <div className="document-contents">
                  <input
                    type="text"
                    placeholder="Rechercher un document..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e, index)}
                    className="search-bar"
                  />
                  <ul className="document-list">
                    {filteredDocuments.length > 0 ? (
                      filteredDocuments.map((doc, docIndex) => (
                        <li key={docIndex} className="document-detail">
                          <div className="doc-title">{doc.title}</div>
                          <div className="doc-date">N° Ref : {doc.referenceNumber}</div>
                          <div className="doc-date">Date : {doc.date}</div>
                          <div className="viewBtn" onClick={()=>handeleView(doc.pdfLink)}>Voir</div>
                        </li>
                      ))
                    ) : (
                      <li className="no-documents">Aucun document trouvé</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Classeur;
