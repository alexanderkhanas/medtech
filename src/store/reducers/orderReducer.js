import { SET_CITIES, SET_WAREHOUSES } from "../actions/actionTypes";

const initialState = {
  cities: [],
  warehouses: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CITIES:
      return {
        ...state,
        cities: action.cities,
      };
    case SET_WAREHOUSES:
      return {
        ...state,
        warehouses: action.warehouses,
      };
    default:
      return state;
  }
};
