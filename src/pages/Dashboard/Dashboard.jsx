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
  
  const [dataOriented, setDataOriented] = useState([]);
  const [otherServiceFiles, setOtherServiceFiles] = useState([]);

  const navigation = useNavigate();

  useEffect(() => {
    const TabDataOrient = [];
    filesService.forEach((file) => {
      if (file?.status?.name === 'pending') {
        TabDataOrient.push(file);
      }
    });
    setDataOriented(TabDataOrient);
  }, [filesService]);

  useEffect(() => {
    const userServiceId = profile?.data?.service?.id;

    // Filtrer les fichiers des autres services
    const otherFiles = files.filter(
      (file) => file.service.id !== userServiceId
    );

    setOtherServiceFiles(otherFiles);
  }, [files, profile]);

  const handeleView = (item) => {
    navigation('/home/MyPDFViewer', { state: { item } });
  };

  const handeleOrient = (item) => {
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
          <h4>Nombre de document</h4>
          <p>20 <span>Aujourd'hui</span></p>
        </div>
        <div className="card" style={{ marginTop: '-30px' }}>
          <h4>Nombre de document en cours</h4>
          <p>12 <span>Aujourd'hui</span></p>
        </div>
        <div className="card" style={{ marginTop: '-30px' }}>
          <h4>Nombre de document traité</h4>
          <p>8 <span>Aujourd'hui</span></p>
        </div>
        <div className="card" style={{ marginTop: '-30px' }}>
          <h4>Nombre de document reçu</h4>
          <p>8 <span>Aujourd'hui</span></p>
        </div>
      </div>

      {/* Lists */}
      <div className="lists-container">
        {/* Oriented Documents */}
        <div className="list">
          <h3>Liste de courriels et documents en cours d'autres services</h3>
          <div className="list-content">
            {otherServiceFiles.map((item, index) => {
              const service = services.find((s) => s.id === item.service.id);
              return (
                <div className="list-item" key={index}>
                  <p style={{width:'30%',textAlign : 'left'}}>{item.name}</p>
                  {/* <p>{item.object}</p> */}
                  {/* <p>{item.num_ref}</p> */}
                  <p style={{width:'40%',textAlign : 'left'}}>{service?.name || 'Service inconnu'}</p>
                  <div className="conetntButton">
                    <div style={{ backgroundColor: item.color }} className="divState">{item.status.label_fr}</div>
                    <div className="view-btn" onClick={() => handeleView(item)}>Voir</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Received Documents */}
        <div className="list">
          <h3>Liste de courriels et documents reçus</h3>
          <div className="list-content">
            {dataOriented.map((item, index) => (
              <div className="list-item" key={index}>
                <p style={{width:'30%',textAlign : 'left'}}>{item.name}</p>
                <p style={{width:'20%',textAlign : 'left'}}>{item.object}</p>
                <p style={{width:'20%',textAlign : 'left'}}>{item.num_ref}</p>
                <div className="conetntButton">
                  <div
                    style={{ backgroundColor: item.status.name === 'pending' ? 'lightgrey' : 'red' }}
                    onClick={() => handeleOrient(item)}
                    className="blue-color"
                  >
                    {' '}
                  </div>
                  <div
                    style={{ backgroundColor: 'white' }}
                    onClick={() => handeleOrient(item)}
                    className="blue-color"
                  >
                    Orienter
                  </div>
                  <div className="view-btn" onClick={() => handeleView(item)}>Voir</div>
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
