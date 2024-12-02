import axios from 'axios';
import { LINK_API } from '../../confiApp';

const API_URL = LINK_API+'/api/users'; // URL de l'API

export const addUser = (dataSent) => {
  return (dispatch) => {
    // Récupérer les détails de l'utilisateur depuis le localStorage
    const userDetailsStr = localStorage.getItem('userDetails');
    const userDetailsObj = JSON.parse(userDetailsStr);

    const token = userDetailsObj.access_token;
    const companyId = userDetailsObj.data.company[0].id;

    // Créer la structure de données pour la requête
    const data = JSON.stringify(dataSent);

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

    axios(config)
      .then(function (response) {
        dispatch({
          type: 'ADD_USERS',
          payload: response.data.data, // Ajustez ce qui va dans le payload en fonction de la réponse de l'API
        });
      })
      .catch(function (error) {
        console.log('Erreur lors de la requête API:', error);
      });
  };
};

export const updateUser = (user) => {
  return (dispatch) => {
    const userDetailsStr = localStorage.getItem('userDetails');
    const userDetailsObj = JSON.parse(userDetailsStr);

    const token = userDetailsObj.access_token;
    const companyId = userDetailsObj.data.company[0].id;

    // Créer la structure de données pour la requête
    const data = `{
    "first_name": "${user.first_name}",
    "last_name": "${user.last_name}",
    "middle_name": "${user.middle_name}",
    "email":"${user.email}",
    "service_id": ${user.service_id},
    "role_id": ${user.roles[0].id}
}`;

console.log('dash :',data);

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${LINK_API}/api/users/${user.id}/edit`, // Utiliser l'ID du service à mettre à jour
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
          payload: response.data.data, // Ajustez ce qui va dans le payload
        });
        console.log('Réponse de l\'API:', response.data);
      })
      .catch(function (error) {
        console.log('Erreur lors de la requête API:', error);
      });
  };
};

export const deleteuSER = (id) => {
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
        console.log('Réponse delete user :', response.data);
      })
      .catch(function (error) {
        console.log('Erreur lors de la requête API:', error);
      });
  };
};
