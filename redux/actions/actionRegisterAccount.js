import { REGISTER_ACCOUNT } from '../constantes';
import { LINK_SERVER_API } from '../../configApp';
import axios from 'axios';

export const actionRegisterAccount = (datas,callback) => {
    // const [dataToDispatch,setDataToDispatch] = useState({})
    return  (dispatch) => {
            var dataSend = {
                mail_or_phone: datas.mail_or_phone,
                name: datas.name,
                password: datas.password,
                password_confirmation: datas.password_confirmation
            };
            // var data = '{\r\n    "mail_or_phone":"+243896545342",\r\n    "name":"MOISETTE",\r\n    "password":"+243904712224",\r\n    "password_confirmation":"+243904712224"\r\n}';
                const data = JSON.stringify(dataSend)

                // console.log(data);
                // console.log();
            const config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ LINK_SERVER_API }/register`,
                headers: { 
                    'Accept': 'application/json',
                    "content-type": "application/json"
                },
                data: data
            };

            axios(config)
            .then(function (response) {
                dispatch({
                    type: REGISTER_ACCOUNT,
                    payload: response.data.data
                });
            // setDataToDispatch(response.data.data)
                // if (response)
                callback(null, response.data.data);
                // console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error.response);
                if (error.response.status === 400){
                    callback('Utilisateur existe déja',null);
                }
                // console.log(error.response.data,'errorici');
                if (error.message == 'Network Error'){
                    callback('Verifier votre connexion Internet',null);
                }else{
                    callback(error.response.data.message,null);
                }
            });
     
    };
};
