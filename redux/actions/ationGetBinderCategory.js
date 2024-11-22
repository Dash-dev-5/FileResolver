import axios from 'axios';
import { LINK_API } from '../../confiApp';
import {LOAD_CLASSEUR } from '../constantes';


export const ationGetBinderCategory =  () => {
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
            url: `${LINK_API}/api/binders/categories`,  
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
        };

        const response = await axios(config);
        console.log('red',JSON.stringify(response.data));
        
        dispatch({
            type: 'LOAD_BINDER_CATEGORY',
            payload: response.data.data,
          });
        // Appel du callback avec les données de la réponse
        // callBack(response.data);
    } catch (error) {

        console.log(error);
    }
}
};
