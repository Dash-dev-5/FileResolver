import React from 'react';
import './OrderHome.css';
import { useNavigate } from 'react-router-dom';
// import '../../assets/'
const OrderHome = () => {
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
          <p> <span>Technique</span></p>
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
          <h3>Liste de courriels et document déjà orientés</h3>
          <div className="list-content">
            {dataOriented.map((item, index) => (
              <div className="list-item" key={index}>
                <p>{item.name}</p>
                <p>{item.object}</p>
                <p>{item.ref}</p>
                <div className="conetntButton">
                    <div style={{ backgroundColor: item.color }} className='divState'>{item.status}</div>
                    <div className="view-btn" onClick={()=>handeleView(item)}>Voir</div>
                </div>
              </div>
            ))}
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
