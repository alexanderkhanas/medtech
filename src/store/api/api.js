import _axios from "./_axios";

export const fetchProducts = async () => _axios.get("/products");

export const fetchProductsByPage = async (page) =>
  _axios.get(`/products?page=${page}`);

export const fetchSingleProduct = async (id) => _axios.get(`/product/${id}`);

export const searchProductsRequest = async (value) => {
  console.log("url ===", `/products?search=${value}`);

  return _axios.get(`/products?search=${value}`);
};

export const fetchFilteredProducts = (categoriesArray, searchValue) => {
  let baseUrl = "/products?";
  if (categoriesArray) {
    baseUrl += "category=";
    console.log("categoryIdsArray ===", categoriesArray);

    categoriesArray.forEach((category) => {
      baseUrl += `${category.id}&`;
    });
  }
  if (searchValue) {
    baseUrl += `search=${searchValue}`;
  }
  return _axios.get(baseUrl);
};

export const fetchCategories = () => _axios.get("/categories");

export const fetchAllNews = () => _axios.get("/news");

export const fetchSingleNews = (id) => _axios.get(`/new/${id}`);

export const registerRequest = (data) =>
  _axios.post(
    "/register",
    data
    // , {
    //   withCredentials: true,
    // }
  );

export const loginRequest = (data) =>
  _axios
    .post(
      "/login",
      data
      //  {
      //   withCredentials: true,
      // }
    )
    .catch((e) => console.log(e));
