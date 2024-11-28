

const initialState = []


export const reducerFileForService = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_FILE_SERVICE':
      return action.payload
    default:
      return state;
  }
};
