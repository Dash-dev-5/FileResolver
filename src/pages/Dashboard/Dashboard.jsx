import React, {useRef,useEffect} from 'react';
import './Dashboard.css';
import { gsap } from 'gsap';
import { useNavigate, useOutletContext } from 'react-router-dom';
// import '../../assets/'
const Dashboard = () => {
  const { orientView } = useOutletContext();
  
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
  const handeleView = (item)=>{
    navigation('/home/MyPDFViewer',{ state: { item } })
  }
const handeleOrient = (item)=>{
  orientView(item)
}
  const summaryRef = useRef(null);
  const listRef = useRef(null);
  const listRef1 = useRef(null);

  useEffect(() => {
    gsap.to(summaryRef.current.children, {
      duration: 1,
      opacity: 1,
      y: 30,
      stagger: 0.2,
      ease: 'power3.out',
    });

    gsap.to(listRef1.current.children, {
      duration: 0.2,
      opacity: 1,
      x: 30,
      stagger: 0.1,
      ease: 'power3.out',
    });

    gsap.to(listRef.current.children, {
      duration: 1,
      opacity: 1,
      x: 30,
      stagger: 0.1,
      ease: 'power3.out',
    });
  }, []);

  return (
    <div className="dashboard">
      {/* Top summary cards */}
      <div className="summary" style={{marginBottom:"30px"}} ref={summaryRef}>
        <div className="card" style={{marginTop:"-30px"}}>
          <h4>Nombre de document</h4>
          <p>20 <span>Aujourd'hui</span></p>
        </div>
        <div className="card" style={{marginTop:"-30px"}}>
          <h4>Nombre de document en cours</h4>
          <p>12 <span>Aujourd'hui</span></p>
        </div>
        <div className="card" style={{marginTop:"-30px"}}>
          <h4>Nombre de document traité</h4>
          <p>8 <span>Aujourd'hui</span></p>
        </div>
        <div className="card" style={{marginTop:"-30px"}}>
          <h4>Nombre de document reçu</h4>
          <p>8 <span>Aujourd'hui</span></p>
        </div>
      </div>

      {/* Lists */}
      <div className="lists-container">
        {/* Oriented Documents */}
        <div className="list" >
          <h3>Liste de courriels et document déjà orientés</h3>
          <div className="list-content"style={{marginRight:"30px"}} ref={listRef1}>
            {dataOriented.map((item, index) => (
              <div className="list-item" key={index} style={{marginLeft:"-30px"}}>
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
        <div className="list" >
          <h3>Liste de courriels et document reçus</h3>
          <div className="list-content" style={{marginRight:"30px"}} ref={listRef}>
            {dataReceived.map((item, index) => (
              <div className="list-item" key={index} style={{marginLeft:"-30px"}}>
                <p>{item.name}</p>
                <p>{item.object}</p>
                <p>{item.ref}</p>
                <div className="conetntButton">
                    <div style={{ backgroundColor: item.color }} onClick={()=>handeleOrient(item)} className=' blue-color'>{item.status}</div>
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

export default Dashboard;