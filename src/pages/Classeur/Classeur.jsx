import React, { useState, useEffect, useRef } from "react";
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
console.log(files);

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

  const toggleDocuments = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleView = (item) => {
    navigation("/home/MyPDFViewer", { state: { item } });
  };
  const handleViewSicle = (item) => {
    navigation("/home/ViewSicleOfDocument", { state: { item } });
  };

  if (classeurs.length === 0) {
    return <p className="no-documents">Aucun classeur trouvé</p>;
  }

  return (
    <div className="main-content-classeur">
      <div className="document-list">
        {classeurs.map((classeur, index) => {
          const filteredFiles = files.filter(
            (file) => file.binder_id === classeur.id
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
                        <div className="action-btn" style={{display:'flex'}}>
                          <div className="viewBtn" style={{backgroundColor:'#fff'}} onClick={() => handleViewSicle(file)}>
                            <img src="/routage.png" width={20} height={20} style={{}} alt="" />
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
