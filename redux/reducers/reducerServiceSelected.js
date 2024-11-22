const initialState = []

  
  const reducerServiceSelect = (state = initialState, action) => {
    switch (action.type) {
        
        case 'LOAD_SERVICE_SELECTED' :
            console.log('payload :',action.playload);
            return action.playload
      default:
        return state;
    }
  };
  
  export default reducerServiceSelect;
  