import axios from 'axios';
import { LINK_API } from '../../confiApp';
import { alertParam } from '../../request/alertParam';

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
        alertParam('Classeur ajouté !',"success",4000)
        dispatch({
          type: 'ADD_FOLDER',
          payload: response.data.data, // Vous pouvez ajuster ce qui est dans payload
        });
        // console.log('Réponse de l\'API:', response.data);
      })
      .catch(function (error) {
        // En cas d'erreur, vous pouvez aussi dispatcher une autre action ou un log
        alertParam('Oups ! Erreur lors de l\'ajout du classeur !',"failed",4000)
        // console.log('Erreur lors de la requête API:', error);
      });
  };
};

export const updateFolder = (folder) => {
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
      "service_id": ${folder.service_id},
      "binder_category_id": ${folder.binder_category_id}
    }`;

    // Configurer l'appel API
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${LINK_API}/api/binders/${folder.id}/edit`,
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
        alertParam('Classeur Modifier !',"success",4000)
        dispatch({
          type: 'UPDATE_FOLDER',
          payload: folder, // Vous pouvez ajuster ce qui est dans payload
        });
        // console.log('Réponse de l\'API:', response.data);
      })
      .catch(function (error) {
        // En cas d'erreur, vous pouvez aussi dispatcher une autre action ou un log
        alertParam('Oups ! Erreur lors de la modification du classeur !',"failed",4000)
        // console.log('Erreur lors de la requête API:', error);
      });
  };
}


export const deleteFolder = (id) => ({
  type: 'DELETE_FOLDER',
  payload: id,
});
