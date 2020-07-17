import _axios from "./_axios";

export const fetchProducts = async () => {
  return await _axios.get("/products");
};
