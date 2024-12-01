import React, { useEffect, useState } from 'react';
import './Topbar.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Switch from '../Switch/Switch';
import { useDispatch, useSelector } from 'react-redux';
import { actionChangeType } from '../../../redux/actions/actionChangeTheme';
import { fetchBinderService } from '../../../request/fetchBinderService';
import { actionGetServiceSelected } from '../../../redux/actions/actionServiceSelected';
import { actionLoadUser } from '../../../redux/actions/actionLoadUser';
import { actionGetFileByService } from '../../../redux/actions/actionGetFileByService';
import { alertParam } from '../../../request/alertParam';

const Topbar = ({showPopUp,documentDetail}) => {
  const services = useSelector(state => state.services)
  const userProfil = useSelector(state=>state.profile)
  const [isPDFView, setIsPDFView] = useState(false)
  const location = useLocation().pathname
  const [formData, setFormData] = useState({});
  const [service, setService] = useState([]);
  const [selectedService, setSelectedService] = useState(userProfil?.data?.service?.id);
// console.log('user',userProfil);

const  handeleSearch = ()  => {
    // Succès
    
// alertParam('Opération réussie !', 'success', 3000);

// Échec
alertParam('Échec de l\'opération.', 'failed', 5000);

// Avertissement
// alertParam('Attention, veuillez vérifier vos informations.', 'warning', 4000);
  }
  
  const dispash = useDispatch()
  const navigate = useNavigate()
  const handeleAddClasseur = () =>{
    navigate('/home/FolderManagement'); // Redirige vers la page d'accueil après 2 secondes
  }
  const handeleAddService = () =>{
    navigate('/home/ServiceManagement'); // Redirige vers la page d'accueil après 2 secondes
  }
  const handeleChangeType = (type) =>{
    // console.log(type);
    
    dispash(actionChangeType(type))
  }
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('userDetails')) || null
    if (storedUsers === null ){
      navigate('/login'); // Redirige vers la page d'accueil après 2 secondes
    }else{
      dispash(actionLoadUser(storedUsers))
      

    }
  }, []);

  useEffect(() => {
    const callback = (data) => {
      // console.log("ici",  data);
      dispash(actionGetServiceSelected(selectedService,data))
    }
    fetchBinderService(selectedService,callback)  
    dispash(actionGetFileByService(selectedService))
  }, [selectedService]);
  useEffect(()=>{
    if (location === '/home/MyPDFViewer'){
      setIsPDFView(true)
    }else{
      setIsPDFView(false)
    }
  },[location])
  // console.log(location);
  
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
        
          userProfil?.data?.roles[0]?.name === 'admin' &&
        <select
          name="service"
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          className='selectOderServicve'
          >
            <option value="">Sélectionnez un classeur</option>
            {services.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name}
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
          <button className="btn-send" onClick={handeleSearch}>Envoyer</button>
      </div>
      
    }
      {
        location === '/home' &&
        <Switch onActionChange={handeleChangeType}/>
      }
      {
        location ===  '/home/Classeur' &&
        <button className="btn-send" onClick={handeleAddClasseur}>Ajouter un classeur</button>
      }
      {
        location ===  '/home/OrderHome' &&
        <button className="btn-send" onClick={handeleAddService}>Ajouter un service</button>
      }
    </div>
  );
};

export default Topbar;
