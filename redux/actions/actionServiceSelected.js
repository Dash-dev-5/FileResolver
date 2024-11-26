import axios from 'axios';
import { LINK_API } from '../../confiApp';

export const actionGetServiceSelected = (idSource, data) => {
  return async (dispatch) => {
    try {
      
      // Récupération des détails utilisateur depuis localStorage
      const userDetailsStr = localStorage.getItem('userDetails');
      const userDetailsObj = JSON.parse(userDetailsStr);

      if (!userDetailsObj || !userDetailsObj.access_token) {
        console.error('Token d\'authentification introuvable.');
        return;
      }

      const token = userDetailsObj.access_token;
      const companyId = userDetailsObj.data?.company?.[0]?.id;
      const id = idSource || userDetailsObj.data?.service?.id
      if (!companyId) {
        console.error('ID de l\'entreprise introuvable.');
        return;
      }
      console.log('id comp',companyId);
      

      // Configuration de la requête API
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${LINK_API}/api/services/company/${companyId}`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      // Envoi de la requête
      const response = await axios(config);

      // Vérification que les données sont bien reçues
      const services = response.data;
      // console.log('Services reçus :', services);

      // Recherche du service correspondant à l'ID
      const service = services.data.find((item) => item.id == id);

      // console.log('Service correspondant :', service);

      // Dispatch avec le payload si le service est trouvé
      if (service) {
        dispatch({
          type: 'LOAD_SERVICE_SELECTED',
          playload: { service, data },
        });
      } else {
        console.warn(`Service avec l'ID ${id} introuvable.`);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des services :', error);
    }
  };
};
