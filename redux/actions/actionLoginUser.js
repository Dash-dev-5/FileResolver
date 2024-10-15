import { LOGIN_ACCOUNT } from '../constantes';
import axios from 'axios';
import { CLIENT_ID, CLIENT_SECRET, LINK_SERVER_API, LINK_SERVER_API_2 } from '../../configApp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

export const actionLoginUser = (username, password, callback) => {
    // const [dataToDispatch,setDataToDispatch] = useState({})
    return async (dispatch) => {
        try {
            const data = {
                grant_type: 'password',
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                username: username,
                password: password,
                scope: '*'
            };

            const config = {
                method: 'POST',
                maxBodyLength: Infinity,
                // url: `https://api-blf-cash.kollectifnumerique.tech/oauth/token`,
                url: `${LINK_SERVER_API_2}/oauth/token`,
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    "content-type": "application/json"
                },
                data: data
            };

            const response = await axios(config);
            // console.log(JSON.stringify(response.data));
            // console.log(JSON.stringify(response.status));
            const expiredInMilliseconde = parseInt(response.data.data.expires_in) * 1000
            const expireDate = new Date().getTime() + expiredInMilliseconde
            const dateTokenExpire = new Date(expireDate).toISOString()

            saveToAsyncStorage(response.data, dateTokenExpire);

            if (response.status == '200') {
                await callback('200', response.data.roles[0], response.data.data)
            }
            dispatch({
                type: LOGIN_ACCOUNT,
                payload: { ...response.data.user, typeUser: response.data.roles[0] }
            });


            // return response.data; // Renvoie les données de la réponse
        } catch (error) {
            // console.log(error.request);
            // console.log('Error', error.message);

            if (error.message == 'Network Error') {
                callback('300')
            } else
                if (error.response.status == '400') {
                    callback('400')
                }
            // throw error; // Lance l'erreur pour être gérée ailleurs si nécessaire
        }

        // senGettingOnSendingToken()
    };
};

const saveToAsyncStorage = async (data, dateExpired) => {
    await AsyncStorage.setItem('userDetails', JSON.stringify({ ...data, dateExpired: dateExpired }))
    // const essa = await AsyncStorage.getItem('userDetails')
    // console.log(essa);
}

