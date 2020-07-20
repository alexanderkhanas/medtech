import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SET_CART,
  SET_NUMBER_CART,
  SET_FULL_PRICE,
} from "../actions/actionTypes";

const initialState = {
  all: [],
  fullPrice: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        all: [...state.all, action.product],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        all: state.all.filter((product) => product._id !== action.productId),
      };
    case SET_CART:
      return {
        ...state,
        all: action.cart,
      };

    case SET_NUMBER_CART:
      let fullPrice = 0;
      const editedProducts = state.all.map((product) => {
        const editedProduct =
          product._id == action.productId
            ? { ...product, numberInCart: action.value }
            : product;
        fullPrice += product.price * editedProduct.numberInCart;
        return editedProduct;
      });
      return {
        ...state,
        all: editedProducts,
        fullPrice,
      };
    case SET_FULL_PRICE:
      return {
        ...state,
        fullPrice: action.fullPrice,
      };
    default:
      return state;
  }
};
