import React, { useRef, useEffect, useState } from 'react';
import './Dashboard.css';
import { gsap } from 'gsap';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actionGetFileByService } from '../../../redux/actions/actionGetFileByService';

const Dashboard = () => {
  const { orientView } = useOutletContext();
  const dispatch = useDispatch();
  const filesService = useSelector((state) => state.fileForService) || [];
  const files = useSelector((state) => state.fileForBinder) || [];
  const profile = useSelector((state) => state.profile);
  const services = useSelector((state) => state.services) || [];
  const [docOrde, setDocOrder] = useState(0);
  const [dataOriented, setDataOriented] = useState([]);
  const [otherServiceFiles, setOtherServiceFiles] = useState([]);

  const navigation = useNavigate();

  useEffect(() => {
    // Filtrer les documents en attente (pending)
    const TabDataOrient = filesService.filter((file) => file?.status?.name === 'pending');
    setDataOriented(TabDataOrient);
  }, [filesService]);

  useEffect(() => {
    const userServiceId = profile?.data?.service?.id;

    // Filtrer les fichiers des autres services
    const otherFiles = files.filter((file) => file?.service?.id !== userServiceId);
    setOtherServiceFiles(otherFiles);
  }, [files, profile]);

  const handleView = (item) => {
    navigation('/home/MyPDFViewer', { state: { item } });
  };

  const handleOrient = (item) => {
    orientView(item);
  };

  const summaryRef = useRef(null);

  useEffect(() => {
    gsap.to(summaryRef.current.children, {
      duration: 1,
      opacity: 1,
      y: 30,
      stagger: 0.2,
      ease: 'power3.out',
    });
  }, []);

  useEffect(() => {
    dispatch(actionGetFileByService());
  }, [dispatch]);

  return (
    <div className="dashboard">
      {/* Top summary cards */}
      <div className="summary" style={{ marginBottom: '30px' }} ref={summaryRef}>
        <div className="card" style={{ marginTop: '-30px' }}>
          <h4>Nombre de document en cours de traitement dans d'autre service</h4>
          <p>{otherServiceFiles.length} <span>Aujourd'hui</span></p>
        </div>
        <div className="card" style={{ marginTop: '-30px' }}>
          <h4>Nombre de document a traitéz</h4>
          <p>{dataOriented.length} <span>document</span></p>
        </div>
      </div>

      {/* Lists */}
      <div className="lists-container">
        {/* Oriented Documents */}
        <div className="list">
          <h3>Liste de courriels et documents en cours d'autres services</h3>
          <div className="list-content">
            {otherServiceFiles.map((item, index) => {
              const service = services?.find((s) => s.id === item?.service?.id);
              return (
                <div className="list-item" key={index}>
                  <p style={{ width: '30%', textAlign: 'left' }}>{item.name}</p>
                  <p style={{ width: '40%', textAlign: 'left' }}>
                    {service?.name || 'Service inconnu'}
                  </p>
                  <div className="conetntButton">
                    <div style={{ backgroundColor: item.color }} className="divState">
                      {item.status.label_fr}
                    </div>
                    <div className="view-btn" onClick={() => handleView(item)}>
                      Voir
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Received Documents */}
        <div className="list">
          <h3>Liste des documents que vous devez traiter</h3>
          <div className="list-content">
            {dataOriented.map((item, index) => (
              <div className="list-item" key={index}>
                <p style={{ width: '30%', textAlign: 'left' }}>{item.name}</p>
                <p style={{ width: '20%', textAlign: 'left' }}>{item.object}</p>
                <p style={{ width: '20%', textAlign: 'left' }}>{item.num_ref}</p>
                <div className="conetntButton">
                  <div
                    style={{
                      backgroundColor: item.status.name === 'pending' ? 'lightgrey' : 'red',
                    }}
                    onClick={() => handleOrient(item)}
                    className="blue-color"
                  >
                    {' '}
                  </div>
                  <div
                    style={{ backgroundColor: 'white' }}
                    onClick={() => handleOrient(item)}
                    className="blue-color"
                  >
                    Orienter
                  </div>
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

export default Dashboard;
