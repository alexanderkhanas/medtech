import { HIDE_ALERT, SHOW_ALERT } from "./actionTypes";

export const showAlertAction = (content) => {
  return {
    type: SHOW_ALERT,
    content,
  };
};

export const hideAlertAction = () => {
  return {
    type: HIDE_ALERT,
  };
};
