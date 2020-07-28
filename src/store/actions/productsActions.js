import {
  fetchProducts,
  fetchProductsByPage,
  searchProductsRequest,
  fetchFilteredProducts,
  fetchCategories,
} from "../api/api";
import {
  SET_PRODUCTS,
  SET_RECOMMENDED,
  SET_NEW,
  SET_FILTERED_PRODUCTS,
  SET_SEARCH,
  SET_LOADING,
  SET_CATEGORIES,
  SET_SEARCH_VALUE,
} from "./actionTypes";
import _axios from "../api/_axios";

export const getProducts = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING, isLoading: true });
    const response = await fetchProducts();
    dispatch({ type: SET_LOADING, isLoading: false });

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

export const filterProductsAction = (categoryIdsArray, searchValue) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING, isLoading: true });
    const response = await fetchFilteredProducts(categoryIdsArray, searchValue);
    dispatch({ type: SET_LOADING, isLoading: false });
    console.log("response ===", response.data);
    dispatch({
      type: SET_FILTERED_PRODUCTS,
      products: response.data,
    });
  };
};

export const getProductsBySearch = (value) => {
  return async (dispatch) => {
    const response = await searchProductsRequest(value);
    console.log("search response ===", response.data);
    dispatch({ type: SET_SEARCH, products: response.data });
  };
};

export const getCategoriesAction = () => {
  return async (dispatch) => {
    const response = await fetchCategories();
    console.log("categories ===", response.data);
    dispatch({ type: SET_CATEGORIES, categories: response.data });
  };
};

export const setSearchValueAction = (searchValue) => {
  return {
    type: SET_SEARCH_VALUE,
    searchValue,
  };
};
