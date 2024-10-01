import React from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
// import '../../assets/'
const Dashboard = () => {
  // Example data for the dashboard lists
  const dataOriented = [
    { name: 'Regideso', pdf: '/1.pdf', object: 'Facturation eau', ref: '0152526/GJ61537', status: 'OK', color: 'green' },
    { name: 'Regideso', pdf: '/2.pdf', object: 'Facturation eau', ref: '0152526/GJ61537', status: '.....', color: 'yellow' },
    { name: 'Regideso', pdf: '/3.pdf', object: 'Facturation eau', ref: '0152526/GJ61537', status: '.....', color: 'yellow' },
    { name: 'Regideso', pdf: '/4.pdf', object: 'Facturation eau', ref: '0152526/GJ61537', status: '.....', color: 'yellow' },
    { name: 'Regideso', pdf: '/5.pdf', object: 'Facturation eau', ref: '0152526/GJ61537', status: 'OK', color: 'green' },
    { name: 'Regideso', pdf: '/6.pdf', object: 'Facturation eau', ref: '0152526/GJ61537', status: '.....', color: 'yellow' },
    { name: 'Regideso', pdf: '/7.pdf', object: 'Facturation eau', ref: '0152526/GJ61537', status: '.....', color: 'yellow' },
    { name: 'Regideso', pdf: '/8.pdf', object: 'Facturation eau', ref: '0152526/GJ61537', status: 'OK', color: 'green' },
    { name: 'Regideso', pdf: '/9.pdf', object: 'Facturation eau', ref: '0152526/GJ61537', status: '.....', color: 'yellow' },
    { name: 'Regideso', pdf: '/10.pdf', object: 'Facturation eau', ref: '0152526/GJ61537', status: '.....', color: 'yellow' },
    { name: 'Regideso', pdf: '/11.pdf', object: 'Facturation eau', ref: '0152526/GJ61537', status: 'OK', color: 'green' },
    { name: 'Regideso', pdf: '/12.pdf', object: 'Facturation eau', ref: '0152526/GJ61537', status: '.....', color: 'yellow' },
    { name: 'Regideso', pdf: '/13.pdf', object: 'Facturation eau', ref: '0152526/GJ61537', status: '.....', color: 'yellow' },
    { name: 'Regideso', pdf: '/14.pdf', object: 'Facturation eau', ref: '0152526/GJ61537', status: 'OK', color: 'green' },
    { name: 'Regideso', pdf: '/15.pdf', object: 'Facturation eau', ref: '0152526/GJ61537', status: '.....', color: 'yellow' },
];



  const dataReceived = [
    { name: 'Regideso', pdf: '/16.pdf', object: 'Facturation eau', ref: '0152526/GJ61537', status: 'Orienter', color: 'white' },
    { name: 'Regideso', pdf: '/17.pdf', object: 'Facturation eau', ref: '0152526/GJ61537', status: 'Orienter', color: 'white' },
    { name: 'Regideso', pdf: '/18.pdf', object: 'Facturation eau', ref: '0152526/GJ61537', status: 'Orienter', color: 'white' },
    { name: 'Regideso', pdf: '/19.pdf', object: 'Facturation eau', ref: '0152526/GJ61537', status: 'Orienter', color: 'white' },
    { name: 'Regideso', pdf: '/20.pdf', object: 'Facturation eau', ref: '0152526/GJ61537', status: 'Orienter', color: 'white' },
    { name: 'Regideso', pdf: '/21.pdf', object: 'Facturation eau', ref: '0152526/GJ61537', status: 'Orienter', color: 'white' },
    { name: 'Regideso', pdf: '/22.pdf', object: 'Facturation eau', ref: '0152526/GJ61537', status: 'Orienter', color: 'white' },
    { name: 'Regideso', pdf: '/23.pdf', object: 'Facturation eau', ref: '0152526/GJ61537', status: 'Orienter', color: 'white' },
];
const navigation = useNavigate()
  const handeleView = (pdf)=>{
    navigation('/home/MyPDFViewer',{ state: { pdf } })
  }
  return (
    <div className="dashboard">
      {/* Top summary cards */}
      <div className="summary">
        <div className="card">
          <h4>Nombre de document</h4>
          <p>20 <span>Aujourd'hui</span></p>
        </div>
        <div className="card">
          <h4>Nombre de document en cours</h4>
          <p>12 <span>Aujourd'hui</span></p>
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
                    <div className="view-btn" onClick={()=>handeleView(item.pdf)}>Voir</div>
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
                    <div style={{ backgroundColor: item.color }} className=' blue-color'>{item.status}</div>
                    <div className="view-btn" onClick={()=>handeleView(item.pdf)}>Voir</div>
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
