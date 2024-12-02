import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { gsap } from "gsap";
import { actionGetBinder } from "../../../redux/actions/actionGetBinder";
import { actionGetFileByBinder } from "../../../redux/actions/actionGetFileByBinder";
import "./Classeur.css";

const formatDate = (isoDateString) => {
  const date = new Date(isoDateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("fr-FR", options);
};

const Classeur = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const classeurs = useSelector((state) => state.classeurs) || [];
  const files = useSelector((state) => state.fileForBinder) || [];
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [showFilters, setShowFilters] = useState(false); // État pour contrôler l'affichage du formulaire
  const [searchCriteria, setSearchCriteria] = useState({
    name: "",
    category: "",
    status: "",
    binderName: "",
    creationDate: "",
    service: "",
  });
  const [sortedClasseurs, setSortedClasseurs] = useState([]);

  useEffect(() => {
    dispatch(actionGetBinder());
    dispatch(actionGetFileByBinder());
  }, [dispatch]);

  useEffect(() => {
    gsap.fromTo(
      ".document-item",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.3, stagger: 0.2 }
    );
  }, []);

  useEffect(() => {
    sortClasseurs();
  }, [searchCriteria, files, classeurs]);

  const toggleDocuments = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleView = (item) => {
    navigation("/home/MyPDFViewer", { state: { item } });
  };

  const handleViewSicle = (item) => {
    navigation("/home/ViewSicleOfDocument", { state: { item } });
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria((prev) => ({ ...prev, [name]: value }));
  };

  const filterFiles = (file) => {
    const {
      name,
      category,
      status,
      binderName,
      creationDate,
      service,
    } = searchCriteria;

    const matchesName = name ? file.name.toLowerCase().includes(name.toLowerCase()) : true;
    const matchesCategory = category ? file.object?.toLowerCase().includes(category.toLowerCase()) : true;
    const matchesStatus = status ? file.status?.label_fr === status : true;
    const matchesBinder = binderName
      ? classeurs.some(
          (classeur) =>
            classeur.name.toLowerCase().includes(binderName.toLowerCase()) &&
            classeur.id === file.binder_id
        )
      : true;
    const matchesDate = creationDate ? file.created_at.startsWith(creationDate) : true;
    const matchesService = service
      ? file.service?.name.toLowerCase().includes(service.toLowerCase())
      : true;

    return (
      matchesName &&
      matchesCategory &&
      matchesStatus &&
      matchesBinder &&
      matchesDate &&
      matchesService
    );
  };

  const sortClasseurs = () => {
    const filteredClasseurs = classeurs.map((classeur) => {
      const filteredFiles = files.filter(
        (file) => file.binder_id === classeur.id && filterFiles(file)
      );
      return { ...classeur, matchingFiles: filteredFiles.length };
    });

    const sorted = filteredClasseurs.sort((a, b) => b.matchingFiles - a.matchingFiles);
    setSortedClasseurs(sorted);
  };

  return (
    <div className="main-content-classeur">
      {/* Bouton pour afficher/masquer les filtres */}
      <button
        onClick={() => setShowFilters((prev) => !prev)}
        className="extend-btn"
        style={{marginBottom:12}}
      >
        {showFilters ? "Masquer les filtres" : "Filtrer"}
      </button>

      {/* Formulaire de filtres conditionnel */}
      {showFilters && (
        <div className="search-filters">
          <div className="input-group" style={{display : 'flex',height : 40,alignItems:'center'}}>
          <input
            type="text"
            name="name"
            placeholder="Nom du fichier"
            value={searchCriteria.name}
            onChange={handleSearchChange}
            style={{marginRight : 4}}
            />
          <input
            type="text"
            name="category"
            placeholder="Catégorie"
            value={searchCriteria.category}
            onChange={handleSearchChange}
            style={{marginRight : 4}}
            />
          <input
            type="text"
            name="binderName"
            placeholder="Nom du classeur"
            value={searchCriteria.binderName}
            onChange={handleSearchChange}
            style={{marginRight : 4}}
            />
          <input
            type="date"
            name="creationDate"
            value={searchCriteria.creationDate}
            onChange={handleSearchChange}
            style={{marginRight : 4}}
            />
          <input
            type="text"
            name="service"
            placeholder="Service"
            value={searchCriteria.service}
            style={{marginRight : 4}}
            onChange={handleSearchChange}
            />
          <select
            name="status"
            value={searchCriteria.status}
            onChange={handleSearchChange}
            style={{marginRight : 4}}
            
            >
            <option value="">Statut</option>
            <option value="En attente">En attente</option>
            <option value="Approuvé">Approuvé</option>
            <option value="Rejeté">Rejeté</option>
          </select>
          <button className="extend-btn" onClick={sortClasseurs}>Rechercher</button>
        </div>
        </div>
      )}

      <div className="document-list">
        {sortedClasseurs.map((classeur, index) => {
          const filteredFiles = files.filter(
            (file) => file.binder_id === classeur.id && filterFiles(file)
          );

          return (
            <div key={classeur.id} className="document-item">
              <div className="document-header">
                <span className="doc-name">{classeur.name}</span>
                <span className="doc-date">
                  Créé le {formatDate(classeur.created_at)}
                </span>
                <span className="doc-date">
                  Modifié le {formatDate(classeur.updated_at)}
                </span>
                <span className="doc-count">
                  Documents : {filteredFiles.length}
                </span>
                <button
                  onClick={() => toggleDocuments(index)}
                  className="extend-btn"
                >
                  {expandedIndex === index ? "Réduire" : "Étendre"}
                </button>
              </div>

              {expandedIndex === index && (
                <div className="document-contents">
                  <ul className="document-list">
                    {filteredFiles.map((file) => (
                      <li key={file.id} className="document-detail">
                        <div className="doc-title">{file.name}</div>
                        <div className="doc-ref">
                          N° Ref : {file.num_ref}
                        </div>
                        <div className="doc-ref">
                          Date : {formatDate(file.created_at)}
                        </div>
                        <div className="action-btn" style={{ display: "flex" }}>
                          <div
                            className="viewBtn"
                            style={{ backgroundColor: "#fff" }}
                            onClick={() => handleViewSicle(file)}
                          >
                            <img
                              src="/routage.png"
                              width={20}
                              height={20}
                              alt=""
                            />
                          </div>
                          <div className="viewBtn" onClick={() => handleView(file)}>
                            Voir
                          </div>
                        </div>
                      </li>
                    ))}
                    {filteredFiles.length === 0 && (
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
