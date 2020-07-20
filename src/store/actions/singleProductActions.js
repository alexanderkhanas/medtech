import { fetchSingleProduct } from "../api/api";
import { SET_PRODUCT } from "./actionTypes";

export const getSingleProduct = (id) => {
  return async (dispatch) => {
    const response = await fetchSingleProduct(id);
    console.log(response.data);
    if (!response.data) return;
    return dispatch({
      type: SET_PRODUCT,
      product: response.data,
    });
  };
};
