import { fetchProducts, fetchProductsByPage } from "../api/api";
import {
  SET_PRODUCTS,
  SET_RECOMMENDED,
  SET_NEW,
  SET_FILTERED_PRODUCTS,
} from "./actionTypes";

export const getProducts = () => {
  return async (dispatch) => {
    const response = await fetchProducts();

    if (!response.data) return;
    const { products } = response.data;
    dispatch({
      type: SET_PRODUCTS,
      products,
      quantity: response.data.length,
    });
    dispatch({
      type: SET_RECOMMENDED,
      recommendedProducts: products.filter((product) => product.recommended),
    });
    dispatch({
      type: SET_NEW,
      newProducts: products.sort(
        (product, nextProduct) =>
          new Date(product.createdAt) - new Date(nextProduct.createdAt)
      ),
    });
  };
};

export const getProductsByPage = (page) => {
  return async (dispatch) => {
    console.log("page ===", page);

    const response = await fetchProductsByPage(page);
    console.log("page products ===", response);
    if (!response.data) return;
    const { products, length } = response.data;
    dispatch({ type: SET_FILTERED_PRODUCTS, products, quantity: length });
  };
};
