import axios from 'axios';
import { LINK_API } from '../../confiApp';
import { LOAD_SERVICE } from '../constantes';


export const actionGetService =  () => {
    return async (dispatch)  => {
        try {
            const userDetailsStr = localStorage.getItem('userDetails');
            const userDetailsObj = JSON.parse(userDetailsStr);
        // console.log(userDetailsObj);
        
        const token = userDetailsObj.access_token;
        // console.log(token);
        
        const companyId = userDetailsObj.data.company[0].id

        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${LINK_API}/api/services/company/${companyId}`,  
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
        };

        const response = await axios(config);
        // console.log(JSON.stringify(response.data));
        
        dispatch({
            type: LOAD_SERVICE,
            playload: response.data.data,
          });
        // Appel du callback avec les données de la réponse
        // callBack(response.data);
    } catch (error) {

        console.log(error);
    }
}
};
