// reducerProfile.js
import { EDIT_PROFILE_ALL, EDIT_PROFILE_AVATAR, LOGIN_ACCOUNT,LOAD_USER_DETAILS } from '../constantes';

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

