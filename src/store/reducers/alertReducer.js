import { SHOW_ALERT, HIDE_ALERT } from "../actions/actionTypes";

const initialState = {
  isVisible: false,
  content: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        ...state,
        isVisible: true,
        content: action.content,
      };

    case HIDE_ALERT:
      return {
        ...state,
        isVisible: false,
      };

    default:
      return state;
  }
};
