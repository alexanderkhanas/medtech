import _axios from "./_axios";
import axios from "axios";

export const fetchProducts = () => _axios.get("/products");

export const fetchProductsByPage = (page) =>
  _axios.get(`/products?page=${page}`);

export const fetchSingleProduct = (id) => _axios.get(`/product/${id}`);

export const searchProductsRequest = async (value) => {
  console.log("url ===", `/products?search=${value}`);

  return _axios.get(`/products?search=${value}`);
};

export const fetchFilteredProducts = (categoriesArray, searchValue) => {
  let baseUrl = "/products?";
  if (categoriesArray) {
    baseUrl += "category=";
    console.log("categoryIdsArray ===", categoriesArray);

    baseUrl += categoriesArray.map((category) => category.id).join(",");
    // categoriesArray.forEach((category) => {
    //   baseUrl += `${category.id}&`;
    // });
  }
  if (searchValue) {
    console.log("api search ===", searchValue);
    baseUrl += `search=${searchValue}`;
    console.log("baseUrl ===", baseUrl);
  }
  return _axios.get(baseUrl);
};

export const fetchHighRatingProducts = () => _axios.get("/products/highRating");

export const fetchCategories = () => _axios.get("/categories");

export const fetchAllNews = () => _axios.get("/news");

export const fetchSingleNews = (id) => _axios.get(`/new/${id}`);

export const fetchUserData = (token) => {
  return _axios.get(`/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const registerRequest = (data) => {
  return _axios.post("/register", data, {});
};
export const loginRequest = (data) => {
  return _axios
    .post("/login", data, {
      // withCredentials: true,
    })
    .catch((e) => console.error(e));
};

export const patchUser = (user, token) => {
  return _axios.patch("/user", user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchUsers = (token) => {
  return _axios.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchAttributes = (token) => {};

export const postCategory = (category, token) => {
  console.log("token ===", token);

  return _axios.post("/category", category, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchCities = (filterValue, limit = 20) => {
  return axios.post("https://api.novaposhta.ua/v2.0/json/", {
    modelName: "AddressGeneral",
    calledMethod: "getCities",
    methodProperties: {
      FindByString: filterValue,
      Limit: limit,
    },
    apiKey: "17b3c01a45f21ae7d45c3bc91e7f9fa6",
  });
};

export const fetchWarehousesByCity = (CityName) => {
  return axios.post("https://api.novaposhta.ua/v2.0/json/", {
    modelName: "AddressGeneral",
    calledMethod: "getWarehouses",
    methodProperties: {
      CityName,
    },
    apiKey: "17b3c01a45f21ae7d45c3bc91e7f9fa6",
  });
};
