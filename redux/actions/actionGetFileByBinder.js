import axios from 'axios';
// import { LOAD_CLASSEUR } from '../constantes'; // Assurez-vous que cette constante est définie correctement
import { LINK_API } from '../../confiApp';

export const actionGetFileByBinder = () => {
  return async (dispatch) => {
    try {
      // Configuration de la requête
      const userDetailsStr = localStorage.getItem('userDetails');
      const userDetailsObj = JSON.parse(userDetailsStr);
  // console.log(userDetailsObj);
  
  const token = userDetailsObj.access_token;
  // console.log(token);
  
  const companyId = userDetailsObj.data.company[0].id

      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: LINK_API+'/api/files/company/'+companyId,
        headers: {
          'Accept': 'application/json',
            'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json',

        },
      };

      // Appel de l'API avec axios
      const response = await axios(config);

      // Affichage des données pour débogage
      // console.log('Réponse de l\'API:', response.data);

      // Dispatch vers Redux pour mettre à jour le store
      dispatch({
        type: 'LOAD_FOR_FILE',
        payload: response.data.data,
      });
    } catch (error) {
      // Gestion des erreurs
      console.error('Erreur lors de la récupération des données:', error);
    }
  };
};
