import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login/Login'
import Layourt from './_layourt/_layourt'
import MyPDFViewer from './component/PDF/PDFViewer'
import { pdfjs } from 'react-pdf'; 

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();
function App() {
  // const [count, setCount] = useState(0)

  return (
  //  <Login/>
  // <Layourt/>
  <>
  <MyPDFViewer/>
   </>
  )
}

export default App
