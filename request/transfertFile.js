import axios from 'axios';
import { LINK_API } from '../confiApp';

/**
 * Transfère un fichier d'un classeur à un autre via l'API.
 * @param {Object} transferData - Les données nécessaires pour le transfert.
 * @param {number} transferData.file_id - ID du fichier à transférer.
 * @param {number} transferData.from_binder_id - ID du classeur de provenance.
 * @param {number} transferData.to_binder_id - ID du classeur de destination.
 * @param {number} transferData.status_id - ID du statut du fichier après transfert.
 * @param {string} transferData.remarks - Remarques sur le transfert.
 * @returns {Promise<Object>} - Les données de la réponse de l'API.
 * @throws Will throw an error si une erreur survient lors du transfert.
 */
export const transferFile = async (transferData) => {
  try {
    // Récupération du token d'authentification depuis localStorage
    const userDetailsStr = localStorage.getItem('userDetails');
    const userDetailsObj = JSON.parse(userDetailsStr);

    if (!userDetailsObj?.access_token) {
      throw new Error('Token d\'authentification non trouvé.');
    }

    const token = userDetailsObj.access_token;

    // Configuration de la requête API
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: LINK_API+'/api/files/transfert',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`, // Ajout du token
        'Content-Type': 'application/json',
      },
      data: transferData,
    };

    // Envoi de la requête
    const response = await axios(config);

    console.log('Réponse API:', response.data);
    return response.data; // Retourne les données de l'API
  } catch (error) {
    console.error('Erreur lors du transfert de fichier :', error.message);
    throw error; // Relance l'erreur pour une gestion éventuelle en amont
  }
};
