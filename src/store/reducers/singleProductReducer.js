import { SET_PRODUCT } from "../actions/actionTypes";

const initialState = {
  product: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT:
      // console.log();

      return {
        ...state,
        product: action.product,
      };

    default:
      return state;
  }
};
