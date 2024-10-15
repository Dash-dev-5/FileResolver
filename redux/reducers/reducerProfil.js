// reducerProfile.js
import {  LOGIN_ACCOUNT } from '../constantes';

const initialState = {};

const reducerProfile = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_ACCOUNT:
            return {...action.playload}
        default:
            return state;
    }
};

export default reducerProfile;

