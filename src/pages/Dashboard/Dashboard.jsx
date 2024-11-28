import React, {useRef,useEffect, useState} from 'react';
import './Dashboard.css';
import { gsap } from 'gsap';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actionGetFileByService } from '../../../redux/actions/actionGetFileByService';
// import '../../assets/'
const Dashboard = () => {
  const { orientView } = useOutletContext();
  const dispatch = useDispatch()
  const filesService = useSelector(state => state.fileForService)
  const files = useSelector((state) => state.fileForBinder) || [];
  const userProfil = useSelector(state=>state.profile)
  const services = useSelector(state => state.services)
  const [dataOriented, setDataOriented] = useState()
  const [dataOnTrait, setDataOnTrait] = useState()
  const [fileOder, setFileOder] = useState()
console.log(userProfil);

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
  
  useEffect(() => {
    const TabDataOrient = []
    const TabDataOnTrait = []
    files?.map((file) => {
      if(file?.status?.name !== "completed"){
        TabDataOrient.unshift(file)
      }else{
        TabDataOnTrait.unshift(file)
      }
    })
    setFileOder(TabDataOrient)
    // set(TabDataOnTrait)
    
  }, [filesService]);
  console.log('sdfddddd',fileOder);

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
    dispatch(actionGetFileByService(undefined))
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
          <h3>Liste de courriels et document en cours d'autres services</h3>
          <div className="list-content" >
            {fileOder?.map((item, index) => (
              <div className="list-item" key={index} >
                <p>{item.name}</p>
                <p>{item.object}</p>
                <p>{item.num_ref}</p>
                <div className="conetntButton">
                    <div style={{ backgroundColor: item.color }} className='divState'>{item.status.label_fr}</div>
                    <div className="view-btn" onClick={()=>handeleView(item)}>Voir</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Received Documents */}
        <div className="list" >
          <h3>Liste de courriels et document reçus</h3>
          <div className="list-content" >
            {dataOriented?.map((item, index) => (
              <div className="list-item" key={index} >
                <p>{item.name}</p>
                <p>{item.object}</p>
                <p>{item.num_ref}</p>
                <div className="conetntButton">
                    <div style={{ backgroundColor: item.status.name === "pending" ? 'lightgrey': 'red'  }} onClick={()=>handeleOrient(item)} className=' blue-color'>{''}</div>
                    <div style={{ backgroundColor: 'white' }} onClick={()=>handeleOrient(item)} className=' blue-color'>Orienter</div>
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