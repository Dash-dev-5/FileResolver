import axios from 'axios';
import { LINK_API } from '../confiApp';

/**
 * Fetches the binder service data from the API based on the provided service ID.
 * @param {string} serviceId - The ID of the service to fetch.
 * @param {function} callback - A callback function to handle the fetched data.
 * @throws Will throw an error if authentication details or company ID are missing.
 */
export const fetchBinderService = async (serviceId, callback) => {
  try {
    // Récupération des détails de l'utilisateur depuis localStorage
    const userDetailsStr = localStorage.getItem('userDetails');
    const userDetailsObj = JSON.parse(userDetailsStr);

    if (!userDetailsObj?.access_token) {
      throw new Error('Token d\'authentification non trouvé.');
    }

    const token = userDetailsObj.access_token;
    const companyId = userDetailsObj.data?.company?.[0]?.id;

    if (!companyId) {
      throw new Error('ID de l\'entreprise non trouvé.');
    }
    console.log('service id',serviceId);
    const serviceiDset = serviceId || userDetailsObj.data?.service?.id

    // Configuration de la requête API
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${LINK_API}/api/binders/service/${serviceiDset}`,
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

    return response.data.data; // Retourne les données si nécessaire
  } catch (error) {
    console.error('Erreur lors de la récupération du service du classeur :', error.message);
    throw error; // Relance l'erreur pour une gestion éventuelle en amont
  }
};
