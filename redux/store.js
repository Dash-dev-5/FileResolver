import { configureStore  } from '@reduxjs/toolkit';
import { combineReducers } from "redux"
import reducerType from './reducers/reducerType';
import reducerProfile from './reducers/reducerProfil';
import reducerService from './reducers/reducerService';
import reducerBinder from './reducers/reducerBinder';
import reducerBinderCategory from './reducers/reducerBinderCategory';
import reducerUsersForCompagnie from './reducers/reducerUsersForCompagnie';
import { reducerFileForBnder } from './reducers/reducerFileForBnder';
import reducerServiceSelect from './reducers/reducerServiceSelected';


const rootReducer = combineReducers({
    typeOfSubmit : reducerType,
    profile : reducerProfile,
    services : reducerService,
    classeurs : reducerBinder,
    classeursCategories : reducerBinderCategory,
    usersForCompany : reducerUsersForCompagnie,
    fileForBinder : reducerFileForBnder,
    serviceSelected : reducerServiceSelect


})
const store = configureStore({
    reducer: rootReducer,
    devTools: true,
  });
export default store