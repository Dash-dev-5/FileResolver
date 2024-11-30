// reducers/alertReducer.js
const initialState = {
    visible: false,
    message: '',
    type: 'success', // Types possibles : success, failed, warning
    duration: 3000, // Durée par défaut en millisecondes
  };
  
  const alertReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'VIEW_ALERT':
        return {
          ...state,
          visible: action.payload.visible,
          message: action.payload.message,
          type: action.payload.type || 'success',
          duration: action.payload.duration || 3000,
        };
      case 'HIDE_ALERT':
        return { ...state, visible: false };
      default:
        return state;
    }
  };
  
  export default alertReducer;
  