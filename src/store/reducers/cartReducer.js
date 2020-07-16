import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SET_CART,
} from "../actions/actionTypes";

const initialState = {
  all: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        all: [...state.all, action.product],
      };
    case REMOVE_FROM_CART:
      console.log(state.all);

      return {
        ...state,
        all: state.all.filter((product) => product._id !== action.product._id),
      };
    case SET_CART:
      return {
        ...state,
        all: action.cart,
      };
    default:
      return state;
  }
};
