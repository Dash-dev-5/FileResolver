import React, { useEffect, useState } from 'react';
import './Topbar.css';
import { useLocation } from 'react-router-dom';

const Topbar = ({showPopUp,documentDetail}) => {
  const [isPDFView, setIsPDFView] = useState(false)
  const location = useLocation().pathname
  const [formData, setFormData] = useState({});
  // Load user data from local storage on component mount
  const [service, setService] = useState([]);
  const [selectedService, setSelectedService] = useState('');
   // Récupérer les classeurs dans le local storage
   useEffect(() => {
    const storedFolders = localStorage.getItem('service');
    if (storedFolders) {
      setService(JSON.parse(storedFolders));
    }
  }, []);
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedData) {
      setFormData(storedData);
    }
  }, []);
  useEffect(()=>{
    if (location === '/home/MyPDFViewer'){
      setIsPDFView(true)
    }else{
      setIsPDFView(false)
    }
  },[location])
  console.log(location);
  
  return (
    <div className="topbar">
      {
        location === '/home/MyPDFViewer' ? (
          <>
            <div className="documentDetail">Document de { documentDetail && documentDetail.name }  { documentDetail && documentDetail.objet }</div>
            <div className="blockAction">
              <button className="btn-send" onClick={showPopUp}>Commanter</button>
              <button className="btn-send">Ajouter cachet</button>
              <button className="btn-send">Ajouter signature</button>
              <button className="btn-send">Telecharger</button>
            </div>
          </>
        ):
        location === '/home/OrderHome' ?
        
          formData?.role === 'Admin' &&
        <select
          name="service"
          value={selectedService}
          onChange={(e) => setSelectedFolder(e.target.value)}
          className='selectOderServicve'
          >
            <option value="">Sélectionnez un classeur</option>
            {service.map((folder, index) => (
              <option key={index} value={folder.service}>
                {folder.service} - {folder.comment}
              </option>
            ))}
        </select>
        :
      <div className="searchBlock">
        <div className="currentPage">Acceuil</div>
        <input type="text" className="search-bar-top-bar" placeholder="Recherche ..." />
        <button className="btn-send">Envoyer</button>
      </div>

      }
    </div>
  );
};

export default Topbar;
