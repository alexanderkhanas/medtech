import _axios from "./_axios";

export const fetchProducts = async () => await _axios.get("/products");

export const fetchProductsByPage = async (page) =>
  await _axios.get(`/products?page=${page}`);

export const fetchSingleProduct = async (id) =>
  await _axios.get(`/product/${id}`);
