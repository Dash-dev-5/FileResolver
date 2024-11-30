// utils/alertParam.js
import store from "../redux/store";

export const alertParam = (message, type = 'success', duration = 3000) => {
  store.dispatch({
    type: 'VIEW_ALERT',
    payload: {
      visible: true,
      message,
      type,
      duration,
    },
  });
};
