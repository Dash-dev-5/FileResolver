import { LOGIN_ACCOUNT } from '../constantes';
import axios from 'axios';
import { CLIENT_ID, CLIENT_SECRET } from '../../confiApp';
import { LINK_API } from '../../confiApp';

export const actionLoginUser = (username, password, callback) => {
  return async (dispatch) => {
    try {
      const data = JSON.stringify({
        grant_type: 'password',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        username: username,
        password: password,
        scope: '*',
      });
      // console.log(data);
      
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${LINK_API}/oauth/token`,
        headers: {
           'Accept': 'application/json',
        "content-type": "application/json",
        'X-Requested-With': 'XMLHttpRequest',
        },
        data: data,
      };

      const response = await axios(config);

      if (response.status === 200) {
        const responseData = response.data;
        // console.log(responseData);

        const createdAtDate = new Date(responseData.data.created_at);
          // Ajouter 1 mois à la date `created_at`
          const expirationDate = new Date(createdAtDate);
          expirationDate.setMonth(expirationDate.getMonth() + 1);
  
          // console.log('Date d\'expiration:', expirationDate.toISOString());
        // const expiredInMilliseconds = parseInt(responseData.data.creat_at) * 1000;
        // const expireDate = new Date().getTime() + expiredInMilliseconds;
        // console.log(expireDate);
        
        const dateTokenExpire = expirationDate.toISOString();
        
        await saveToLocalStorage(responseData, dateTokenExpire);
        
        
        dispatch({
          type: LOGIN_ACCOUNT,
          payload: responseData.data,
        });
        callback('200', responseData.data.roles[0].name, responseData.data);
      }
    } catch (error) {
      if (error.message === 'Network Error') {
        callback('300');
      } else if (error.response && error.response.status === 400) {
        callback('400');
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };
};

const saveToLocalStorage = async (data, dateExpired) => {
  await localStorage.setItem('userDetails', JSON.stringify({ ...data, dateExpired: dateExpired }));
};
