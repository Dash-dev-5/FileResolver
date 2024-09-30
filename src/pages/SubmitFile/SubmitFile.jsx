import React from 'react';
import './SubmitFile.css';
import DragAndDrop from '../../component/DragAnDrop/DragAndDrop';

const SubmitFile = () => {
  return (
    <div className="main-content">
      <div className="table-area">
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Objet</th>
              <th>N° de reference</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Facture Regideso</td>
              <td>Facturation eau</td>
              <td>0152526/GJ61537</td>
            </tr>
            <tr>
              <td>Facture Regideso</td>
              <td>Facturation eau</td>
              <td>0152526/GJ61537</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="form-area">
        <input type="text" placeholder="Correspondant..." />
        <input type="text" placeholder="N° de reference" />
        <textarea placeholder="Note"></textarea>
      </div>

      <div className="upload-area">
        <DragAndDrop/>
        {/* <p>Glisser et déposer</p>
        <button className="btn-upload">Upload</button> */}
      </div>
    </div>
  );
};

export default SubmitFile;
