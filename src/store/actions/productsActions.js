import { fetchProducts } from "../api/api";
import { SET_PRODUCTS } from "./actionTypes";

export const getProducts = () => {
  return async (dispatch) => {
    const response = await fetchProducts();
    console.log(response.data);

    if (response.data) {
      return dispatch({
        type: SET_PRODUCTS,
        products: response.data,
      });
    }
  };
};
