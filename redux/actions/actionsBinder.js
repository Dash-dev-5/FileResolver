import axios from 'axios';
import { LINK_API } from '../../confiApp';

export const addFolder = (folder) => {
  return (dispatch) => {
    // Créer la structure de données pour la requête
    const userDetailsStr = localStorage.getItem('userDetails');
    const userDetailsObj = JSON.parse(userDetailsStr);
// console.log(userDetailsObj);

const token = userDetailsObj.access_token;
// console.log(token);

const companyId = userDetailsObj.data.company[0].id
    const data = `{
      "name": "${folder.name}",
      "company_id": ${companyId},
      "service_id": ${folder.service_id},
      "binder_category_id": ${folder.binder_category_id}
    }`;

    // Configurer l'appel API
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${LINK_API}/api/binders`,
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json',
      },
      
      data: data
    };

    // Faire la requête API avec axios
    axios(config)
      .then(function (response) {
        // Si la requête réussit, dispatch l'action ADD_FOLDER avec la réponse
        dispatch({
          type: 'ADD_FOLDER',
          payload: response.data.data, // Vous pouvez ajuster ce qui est dans payload
        });
        // console.log('Réponse de l\'API:', response.data);
      })
      .catch(function (error) {
        // En cas d'erreur, vous pouvez aussi dispatcher une autre action ou un log
        console.log('Erreur lors de la requête API:', error);
      });
  };
};

export const updateFolder = (folder) => ({
  type: 'UPDATE_FOLDER',
  payload: folder,
});

export const deleteFolder = (id) => ({
  type: 'DELETE_FOLDER',
  payload: id,
});
