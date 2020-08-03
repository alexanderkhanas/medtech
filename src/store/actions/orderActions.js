import { fetchCities, fetchWarehousesByCity } from "../api/api";
import { SET_CITIES } from "./actionTypes";

export const getCitiesAction = (filterValue, limit) => {
  return async (dispatch) => {
    const response = await fetchCities(filterValue, limit);
    dispatch({
      type: SET_CITIES,
      cities: response.data.data,
    });
    console.log("cities ===", response.data.data);
  };
};

export const getWarehousesAction = (city) => {
  return async (dispatch) => {
    const response = await fetchWarehousesByCity(city);
    console.log("warehouses ===", response.data);
  };
};
