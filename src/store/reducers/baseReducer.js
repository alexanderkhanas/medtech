import { SET_LOADING } from "../actions/actionTypes";

const initialState = {
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };

    default:
      return state;
  }
};
