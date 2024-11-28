import React,{useState,useEffect} from 'react';
import './OrderHome.css';
import { useNavigate } from 'react-router-dom';
import { fetchBinderService } from '../../../request/fetchBinderService';
import { useDispatch, useSelector } from 'react-redux';
import { actionGetFileByService } from '../../../redux/actions/actionGetFileByService';
// import '../../assets/'

const formatDate = (isoDateString) => {

  const date = new Date(isoDateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("fr-FR", options);
};

const OrderHome = () => {
  const serviceSelected = useSelector(state => state.serviceSelected)
  const filesService = useSelector(state => state.fileForService)
  const [dataOriented, setDataOriented] = useState()
  const [dataOnTrait, setDataOnTrait] = useState()
  const dispatch = useDispatch()
  console.log('log  :',filesService);
  useEffect(() => {
    dispatch(actionGetFileByService(undefined))
  }, []);
  useEffect(() => {
    const TabDataOrient = []
    const TabDataOnTrait = []
    filesService?.map((file) => {
      if(file?.status?.name === "pending"){
        TabDataOrient.unshift(file)
      }else{
        TabDataOnTrait.unshift(file)
      }
    })
    setDataOriented(TabDataOrient)
    setDataOnTrait(TabDataOnTrait)
  }, [filesService]);
  fetchBinderService(1)
  // Example data for the dashboard lists

const navigation = useNavigate()
  const handeleView = (item)=>{
  //  console.log(item);
   
      navigation('/home/MyPDFViewer',{ state: { item } })
  }
  return (
    <div className="dashboard">
      {/* Top summary cards */}
      <div className="summary">
        <div className="card-service">
          <h2>Service</h2>
          <p> <span>{serviceSelected?.service?.name}</span></p>
        </div>
        <div className="card">
          <h4>Nombre de document traité</h4>
          <p>8 <span>Aujourd'hui</span></p>
        </div>
        <div className="card">
          <h4>Nombre de document reçu</h4>
          <p>8 <span>Aujourd'hui</span></p>
        </div>
      </div>

      {/* Lists */}
      <div className="lists-container">
        {/* Oriented Documents */}
        <div className="list">
          <h3>Liste des classeurs</h3>
          <div className="list-content">
            {serviceSelected ? (serviceSelected?.data?.length !== 0 ?  (serviceSelected?.data?.map((item, index) => (
              <div className="list-item" key={item.id}>
                <p>{item.name}</p>
                <p>{formatDate(item.created_at) }</p>
                {/* <p>{item.ref}</p> */}
                <div className="conetntButton">
                    <div style={{  backgroundColor: item.color   }} className='divState'>{item.status}</div>
                    <div className="view-btn" onClick={()=>console.log(item)}>Voir</div>
                </div>
              </div>
            )))
            :(
              <>
                <div style={{ alignSelf : 'center'}} className='divState'>Pas de classeurs</div>
              </>
            )):(
              <>
                <div style={{ alignSelf : 'center'}} className='divState'>Chargement...</div>
              </>
            )
          }
          </div>
        </div>

        {/* Received Documents */}
        <div className="list">
          <h3>Liste de courriels et document reçus</h3>
          <div className="list-content">
            {dataOriented?.map((item, index) => (
              <div className="list-item" key={index}>
                <p>{item.name}</p>
                <p>{item.object}</p>
                <p>{item.ref}</p>
                <div className="conetntButton">
                    <div className="view-btn" onClick={()=>handeleView(item)}>Voir</div>
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
