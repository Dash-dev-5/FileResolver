const initialState = []
  
  const reducerBinderCategory = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_BINDER_CATEGORY':
            return action.payload
      default:
        return state;
    }
  };
  
  export default reducerBinderCategory;
  