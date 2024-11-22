import axios from 'axios';
import { LINK_API } from '../../confiApp';
import { LOAD_SERVICE, LOGIN_ACCOUNT } from '../constantes';


export const actionLoadUser =  (data) => {
    return async (dispatch)  => {
        
        dispatch({
            type: LOGIN_ACCOUNT ,
            playload: data,
          });
  
}
};
