const initialState = []
  
  const reducerBinder = (state = initialState, action) => {
    switch (action.type) {
      
      case 'LOAD_CLASSEUR':
          // console.log(action.payload );
            return action.payload
      case 'ADD_FOLDER':
        return  [...state, action.payload] 

      case 'UPDATE_FOLDER':
        return state.map(folder =>
            folder.id === action.payload.id ? action.payload : folder
          )
    
      case 'DELETE_FOLDER':
        return state.data.filter(folder => folder.id !== action.payload)
      default:
        return state;
    }
  };
  
  export default reducerBinder;
  