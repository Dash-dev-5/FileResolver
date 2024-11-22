import React from 'react';
import './OrderHome.css';
import { useNavigate } from 'react-router-dom';
import { fetchBinderService } from '../../../request/fetchBinderService';
import { useSelector } from 'react-redux';
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

  fetchBinderService(1)
  // Example data for the dashboard lists
  const dataOriented = [
    { name: 'Regideso', pdf: '/1.pdf', object: 'Facturation eau', ref: '0152526/GJ61537', status: 'OK', color: 'green' },
    { name: 'Regideso', pdf: '/5.pdf', object: 'Facturation eau', ref: '0152526/GJ61537', status: 'OK', color: 'green' },
    { name: 'Regideso', pdf: '/8.pdf', object: 'Facturation eau', ref: '0152526/GJ61537', status: 'OK', color: 'green' },
    { name: 'Regideso', pdf: '/11.pdf', object: 'Facturation eau', ref: '0152526/GJ61537', status: 'OK', color: 'green' },
    { name: 'Regideso', pdf: '/14.pdf', object: 'Facturation eau', ref: '0152526/GJ61537', status: 'OK', color: 'green' },
];



  const dataReceived = [
    { name: 'Regideso', pdf: '/16.pdf', object: 'Facturation eau', ref: '0152526/GJ61537', status: 'Orienter', color: 'white' },
    { name: 'Regideso', pdf: '/17.pdf', object: 'Facturation eau', ref: '0152526/GJ61537', status: 'Orienter', color: 'white' },
    { name: 'Regideso', pdf: '/23.pdf', object: 'Facturation eau', ref: '0152526/GJ61537', status: 'Orienter', color: 'white' },
];
const navigation = useNavigate()
  const handeleView = (item)=>{
   
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
                    <div className="view-btn" onClick={()=>handeleView(item)}>Voir</div>
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
            {dataReceived.map((item, index) => (
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
