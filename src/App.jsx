import { useState } from 'react'
import './App.css'
import Login from './pages/Login/Login'
import Layourt from './_layourt/_layourt'
import MyPDFViewer from './component/PDF/PDFViewer'
import { pdfjs } from 'react-pdf'; 
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import pdf from "./assets/document.pdf";

import SubmitFile from './pages/SubmitFile/SubmitFile'
import Classeur from './pages/Classeur/Classeur'
import Dashboard from './pages/Dashboard/Dashboard'
import UserManagement from './pages/UserManagement/userManagement'
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();
function App() {
  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/home" element={<Layourt />}>
        <Route index element={<SubmitFile />} />
        <Route path="MyPDFViewer" element={<MyPDFViewer file={pdf} />} />
        <Route path="Classeur" element={<Classeur/>} />
        <Route path="Dashboard" element={<Dashboard/>} />
        <Route path="UserManagement" element={<UserManagement/>} />
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App
