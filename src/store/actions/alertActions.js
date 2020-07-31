import { HIDE_ALERT, SHOW_ALERT } from "./actionTypes";

export const showAlertAction = (content, timeoutToHide) => {
  return (dispatch) => {
    dispatch({ type: SHOW_ALERT, content });
    if (timeoutToHide) {
      setTimeout(() => {
        dispatch({ type: HIDE_ALERT });
      }, timeoutToHide);
    }
  };
};

export const hideAlertAction = () => {
  return {
    type: HIDE_ALERT,
  };
};
