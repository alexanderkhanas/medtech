import {
  fetchProducts,
  fetchProductsByPage,
  searchProductsRequest,
  fetchFilteredProducts,
  fetchCategories,
  fetchHighRatingProducts,
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
  SET_HIGHRATING_PRODUCTS,
} from "./actionTypes";
import _axios from "../api/_axios";

export const getProducts = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING, isLoading: true });
    const response = await fetchProducts();
    dispatch({ type: SET_LOADING, isLoading: false });
    if (!response.data) return;
    const { products, length } = response.data;
    dispatch({
      type: SET_PRODUCTS,
      products,
      quantity: length,
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
    const popularProducts = [];
    products.forEach((product, i) => {});
  };
};

export const getProductsByPage = (page) => {
  return async (dispatch) => {
    console.log("page ===", page);
    dispatch({ type: SET_LOADING, isLoading: true });

    const response = await fetchProductsByPage(page);
    console.log("page products ===", response);
    dispatch({ type: SET_LOADING, isLoading: false });

    if (!response.data) return;
    const { products, length } = response.data;
    dispatch({ type: SET_FILTERED_PRODUCTS, products, quantity: length });
  };
};

export const clearFilterAction = (products) => {
  return {
    type: SET_FILTERED_PRODUCTS,
    products,
    quantity: 0,
  };
};

export const filterProductsAction = (
  categoryIdsArray,
  searchValue,
  page = 1
) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING, isLoading: true });
    const response = await fetchFilteredProducts(
      categoryIdsArray,
      searchValue,
      page
    );
    dispatch({ type: SET_LOADING, isLoading: false });
    console.log("response ===", response?.data);
    if (response?.data?.products) {
      dispatch({
        type: SET_FILTERED_PRODUCTS,
        products: response.data.products,
        quantity: response.data.length,
      });
    } else {
      dispatch({
        type: SET_FILTERED_PRODUCTS,
        products: [],
        quantity: 0,
      });
    }
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
    dispatch({ type: SET_LOADING, isLoading: true });
    const response = await fetchCategories();
    console.log("categories ===", response.data);
    // if (response?.data) {
    dispatch({ type: SET_CATEGORIES, categories: response?.data || [] });
    dispatch({ type: SET_LOADING, isLoading: false });
    // }
  };
};

export const getHighRatingProductsAction = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING, isLoading: true });
    const response = await fetchHighRatingProducts();
    dispatch({ type: SET_LOADING, isLoading: false });
    if (response?.data) {
      dispatch({ type: SET_HIGHRATING_PRODUCTS, products: response.data });
    }
  };
};

export const setSearchValueAction = (searchValue) => {
  return {
    type: SET_SEARCH_VALUE,
    searchValue,
  };
};
