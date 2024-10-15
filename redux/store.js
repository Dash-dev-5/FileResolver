import { configureStore  } from '@reduxjs/toolkit';
import { combineReducers } from "redux"
import reducerType from './reducers/reducerType';
import reducerProfile from './reducers/reducerProfil';


const rootReducer = combineReducers({
    typeOfSubmit : reducerType,
    profile : reducerProfile,


})
const store = configureStore({
    reducer: rootReducer,
    devTools: true,
  });
export default store