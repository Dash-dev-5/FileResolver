import axios from 'axios';
import { LINK_API } from '../confiApp';



export const fetchStatus = async ( callback) => {
  try {
    // Récupération des détails de l'utilisateur depuis localStorage
    const userDetailsStr = localStorage.getItem('userDetails');
    const userDetailsObj = JSON.parse(userDetailsStr);

    if (!userDetailsObj?.access_token) {
      throw new Error('Token d\'authentification non trouvé.');
    }

    const token = userDetailsObj.access_token;
    const companyId = userDetailsObj.data?.company?.[0]?.id;

    // Configuration de la requête API
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${LINK_API}/api/files/status`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    // Envoi de la requête
    const response = await axios(config);

    // Exécution du callback avec les données récupérées
    if (callback && typeof callback === 'function') {
      callback(response.data.data);
    }
console.log('dashir :',response.data);

    return response.data.data; // Retourne les données si nécessaire
  } catch (error) {
    console.error('Erreur lors de la récupération du service du classeur :', error.message);
    throw error; // Relance l'erreur pour une gestion éventuelle en amont
  }
};
