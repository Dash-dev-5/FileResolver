import { LOAD_CLASSEUR } from '../constantes';

const initialState = []


export const reducerFileForBnder = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_FOR_FILE':
      return action.payload
    default:
      return state;
  }
};
