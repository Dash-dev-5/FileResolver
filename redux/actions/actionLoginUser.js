import { LOGIN_ACCOUNT } from '../constantes';
import axios from 'axios';
import { CLIENT_ID, CLIENT_SECRET, LINK_API } from '../../confiApp';

export const actionLoginUser = (username, password, callback) => {
    return async (dispatch) => {
        try {
            const data = JSON.stringify({
                grant_type: 'password',
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                username: username,
                password: password,
                scope: '*'
            });

            const config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${LINK_API}/oauth/token`,
                headers: {
                    'Content-Type': 'application/json',
                },
                data: data
            };

            const response = await axios(config);

            const expiredInMilliseconds = parseInt(response.data.expires_in) * 1000;
            const expireDate = new Date().getTime() + expiredInMilliseconds;
            const dateTokenExpire = new Date(expireDate).toISOString();

            saveToLocalStorage(response.data, dateTokenExpire);

            if (response.status === 200) {
                await callback('200', response.data.roles[0], response.data);
            }

            dispatch({
                type: LOGIN_ACCOUNT,
                payload: { ...response.data.user, typeUser: response.data.roles[0] }
            });

        } catch (error) {
            if (error.message === 'Network Error') {
                callback('300');
            } else if (error.response && error.response.status === 400) {
                callback('400');
            } else {
                console.error('Error:', error.message);
            }
        }
    };
};

const saveToLocalStorage = (data, dateExpired) => {
    localStorage.setItem('userDetails', JSON.stringify({ ...data, dateExpired }));
};
