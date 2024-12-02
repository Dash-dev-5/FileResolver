import React, { useState, useEffect } from 'react';
import './OrderHome.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actionGetFileByService } from '../../../redux/actions/actionGetFileByService';
import { fetchFileBiner } from '../../../request/fetchFileBinder';

// Formater une date en français
const formatDate = (isoDateString) => {
  const date = new Date(isoDateString);
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
const OrderHome = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const serviceSelected = useSelector((state) => state.serviceSelected);
  const filesService = useSelector((state) => state.fileForService);

  const [dataOriented, setDataOriented] = useState([]);
  const [dataOnTrait, setDataOnTrait] = useState([]);
  const [fileOfBinder, setFileOfBinder] = useState({});
  const [extending, setExtending] = useState({}); // State for each folder's expansion

  useEffect(() => {
    dispatch(actionGetFileByService());
  }, [dispatch]);

  useEffect(() => {
    const TabDataOrient = [];
    const TabDataOnTrait = [];

    filesService?.forEach((file) => {
      if (file?.status?.name === 'pending') {
        TabDataOrient.unshift(file);
      } else {
        TabDataOnTrait.unshift(file);
      }
    });

    setDataOriented(TabDataOrient);
    setDataOnTrait(TabDataOnTrait);
  }, [filesService]);

  const handleView = (item) => {
    navigation('/home/MyPDFViewer', { state: { item } });
  };

  const handleViewClasseur = (item) => {
    fetchFileBiner(item.id, (data) => {
      setFileOfBinder((prev) => ({
        ...prev,
        [item.id]: data,
      }));
      setExtending((prev) => ({
        ...prev,
        [item.id]: !prev[item.id], // Toggle only the clicked folder
      }));
    });
  };

  return (
    <div className="dashboard">
      <div className="summary">
        <div className="card-service">
          <h2>Service</h2>
          <p>
            <span>{serviceSelected?.service?.name}</span>
          </p>
        </div>
        <div className="card">
          <h4>Nombre de classeurs dans votre service</h4>
          <p>
            {serviceSelected?.data?.length || 0} <span>classeurs</span>
          </p>
        </div>
        <div className="card">
          <h4>Nombre de documents à traiter dans votre service</h4>
          <p>
            {dataOriented.length} <span>documents</span>
          </p>
        </div>
      </div>

      <div className="lists-container">
        <div className="list">
          <h3>Liste des classeurs</h3>
          <div className="list-content">
            {serviceSelected ? (
              serviceSelected?.data?.length ? (
                serviceSelected.data.map((item) => (
                  <div key={item.id} style={{ flexDirection: 'column' }}>
                    <div className="list-item">
                      <p style={{ width: '40%', textAlign: 'left' }}>{item.name}</p>
                      <p style={{ width: '40%', textAlign: 'left' }}>
                        {formatDate(item.created_at)}
                      </p>
                      <div className="contentButton">
                        <div
                          style={{ backgroundColor: item.color }}
                          className="divState"
                        >
                          {item.status}
                        </div>
                        <div
                          className="view-btn"
                          onClick={() => handleViewClasseur(item)}
                        >
                          {
                            !extending[item.id] ? '+' : '-'
                          }
                        </div>
                      </div>
                    </div>
                    {extending[item.id] && (
                      <div className="file_extend">
                        {fileOfBinder[item.id].length == 0 ? (
                          <div className="list-item" style={{backgroundColor : '#f0f4f8'}} >
                            <p style={{ width: '30%', textAlign: 'left',margin:0, fontSize:'0.7em', color:'black' }}>Pas de document</p>
                        </div>
                        ) :
                        (fileOfBinder[item.id] || []).map((binderItem) => (
                          <div className="list-item" style={{backgroundColor : '#f0f4f8', color:'black'}} key={binderItem.id}>
                            <p style={{ width: '30%', textAlign: 'left',margin:0, fontSize:'0.7em', color:'black' }}>{binderItem.name}</p>
                            <p style={{ width: '30%', textAlign: 'left',margin:0, fontSize:'0.7em', color:'black' }}>{binderItem.object}</p>
                            <p style={{ width: '30%', textAlign: 'left',margin:0, fontSize:'0.7em', color:'black' }}>{binderItem.num_ref}</p>
                            <div className="contentButton">
                              <div style={{ margin:0, fontSize:'0.7em' }} className="view-btn" onClick={() => handleView(binderItem)}>
                                Voir
                              </div>
                            </div>
                          </div>
                        ))
                        }
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="divState">Pas de classeurs</div>
              )
            ) : (
              <div className="divState">Chargement...</div>
            )}
          </div>
        </div>

        <div className="list">
          <h3>Liste de courriels et documents reçus</h3>
          <div className="list-content">
            {dataOriented.map((item) => (
              <div className="list-item" key={item.id}>
                <p style={{ width: '30%', textAlign: 'left' }}>{item.name}</p>
                <p style={{ width: '30%', textAlign: 'left' }}>{item.object}</p>
                <p style={{ width: '30%', textAlign: 'left' }}>{item.num_ref}</p>
                <div className="contentButton">
                  <div className="view-btn" onClick={() => handleView(item)}>
                    Voir
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHome;
