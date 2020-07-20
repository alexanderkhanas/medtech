import _axios from "./_axios";

export const fetchProducts = async () => await _axios.get("/products");

export const fetchSingleProduct = async (id) =>
  await _axios.get(`/product/${id}`);
