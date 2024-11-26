import axios from 'axios';
import { LINK_API } from '../../confiApp';

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
      })
      .catch(function (error) {
        console.log('Erreur lors de la requête API:', error);
      });
  };
};

export const updateService = (service) => {
  return (dispatch) => {
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
      method: 'put',
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
        dispatch({
          type: 'UPDATE_SERVICE',
          payload: response.data, // Ajustez ce qui va dans le payload
        });
        // console.log('Réponse de l\'API:', response.data);
      })
      .catch(function (error) {
        console.log('Erreur lors de la requête API:', error);
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
      url: `${API_URL}/${id}`, // Utiliser l'ID du service à supprimer
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
        // console.log('Réponse de l\'API:', response.data);
      })
      .catch(function (error) {
        console.log('Erreur lors de la requête API:', error);
      });
  };
};
