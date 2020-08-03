import { fetchCities, fetchWarehousesByCity } from "../api/api";
import {
  SET_CITIES,
  SET_SELECTED_CITY,
  SET_SELECTED_WAREHOUSE,
  SET_WAREHOUSES,
} from "./actionTypes";

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
    dispatch({
      type: SET_WAREHOUSES,
      warehouses: response.data.data,
    });
  };
};

export const setSelectedCityAction = (city) => {
  return {
    type: SET_SELECTED_CITY,
    city,
  };
};
export const setSelectedWarehouseAction = (warehouse) => {
  return {
    type: SET_SELECTED_WAREHOUSE,
    warehouse,
  };
};
