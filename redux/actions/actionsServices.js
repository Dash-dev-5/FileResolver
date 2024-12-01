import axios from 'axios';
import { LINK_API } from '../../confiApp';
import { actionGetService } from './actionGetService';
import { alertParam } from '../../request/alertParam';

const API_URL = LINK_API+'/api/services'; // URL de l'API

export const addService = (service) => {
  return (dispatch) => {
    // Récupérer les détails de l'utilisateur depuis le localStorage
    const userDetailsStr = localStorage.getItem('userDetails');
    const userDetailsObj = JSON.parse(userDetailsStr);

    const token = userDetailsObj.access_token;
    const companyId = userDetailsObj.data.company[0].id;

    // Créer la structure de données pour la requête
    const data = `{
      "name": "${service.name}",
      "company_id": ${companyId},
      "user_id": null
    }`;

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: API_URL,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      data: data,
    };

    // Faire la requête API avec axios
    axios(config)
    .then(function (response) {
      dispatch({
        type: 'ADD_SERVICE',
          payload: response.data.data, // Ajustez ce qui va dans le payload en fonction de la réponse de l'API
        });
        // console.log('Réponse de l\'API: service', response.data);
        alertParam('Service ' +response.data.data.name+ ' ajouté avec succes !','success',4000)
      })
      .catch(function (error) {
        alertParam('Oups ! Erreur lors de l\'ajout du service','failed',4000)
        // console.log('Erreur lors de la requête API:', error);
      });
  };
};

export const updateService = (service,callBack) => {
  return (dispatch) => {
    const userDetailsStr = localStorage.getItem('userDetails');
    const userDetailsObj = JSON.parse(userDetailsStr);

    const token = userDetailsObj.access_token;
    const companyId = userDetailsObj.data.company[0].id;

    // Créer la structure de données pour la requête
    const data = `{
      "name": "${service.name}",
      "user_id": "${userDetailsObj.data.id}"
    }`;

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${API_URL}/${service.id}`, // Utiliser l'ID du service à mettre à jour
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        callBack()
        alertParam('Service modifié avec succes !','success',4000)
        // console.log('Réponse de l\'API:', response.data);
      })
      .catch(function (error) {
        alertParam('Oups ! Erreur lors de la mise a jour','failed',4000)
        // console.log('Erreur lors de la requête API:', error);
      });
  };
};

export const deleteService = (id) => {
  return (dispatch) => {
    const userDetailsStr = localStorage.getItem('userDetails');
    const userDetailsObj = JSON.parse(userDetailsStr);

    const token = userDetailsObj.access_token;

    const config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `${API_URL}/${id}/delete`, // Utiliser l'ID du service à supprimer
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    };

    axios(config)
      .then(function (response) {
        dispatch({
          type: 'DELETE_SERVICE',
          payload: id, // Passer simplement l'ID du service à supprimer
        });
        alertParam('Service supprimer !','warning',4000)
        // console.log('delete success:', response.data);
      })
      .catch(function (error) {
        alertParam('Erreur lors de suppression !','failed',4000)
        // console.log('Erreur lors de la requête API:', error);
      });
    };
};
