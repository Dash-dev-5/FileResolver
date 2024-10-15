import React, { useEffect, useState } from 'react';
import './Topbar.css';
import { useLocation } from 'react-router-dom';
import Switch from '../Switch/Switch';
import { useDispatch } from 'react-redux';
import { actionChangeType } from '../../../redux/actions/actionChangeTheme';

const Topbar = ({showPopUp,documentDetail}) => {
  const [isPDFView, setIsPDFView] = useState(false)
  const location = useLocation().pathname
  const [formData, setFormData] = useState({});
  const [service, setService] = useState([]);
  const [selectedService, setSelectedService] = useState('');

  const dispash = useDispatch()

  const handeleChangeType = (type) =>{
    console.log(type);
    
    dispash(actionChangeType(type))
  }
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
          <div className="search-input-container">
            <input type="text" className="search-bar-top-bar" placeholder="Recherche ..." />
            <button className="btn-filter-inside">Filtrer</button>
          </div>
          <button className="btn-send">Envoyer</button>
      </div>
      
      }
      {
        location === '/home' &&
        <Switch onActionChange={handeleChangeType}/>
      }
    </div>
  );
};

export default Topbar;
