import { LOAD_SERVICE } from "../constantes";

const initialState = []

  
  const reducerService = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SERVICE :
            return action.playload
      case 'ADD_SERVICE':
        return [...state, action.payload] ;
      case 'UPDATE_FOLDER':
        return state.map(folder =>
            folder.id === action.payload.id ? action.payload : folder
          )
      case 'DELETE_FOLDER':
        return state.data.filter(folder => folder.id !== action.payload) ;
      default:
        return state;
    }
  };
  
  export default reducerService;
  