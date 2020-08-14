import {
  SET_USERS,
  SET_FILTERED_USERS,
  RESET_FILTERED_USERS,
  SET_ATTRIBUTES,
  DELETE_ATTRIBUTE,
  DELETE_CATEGORY,
  ADD_ATTRIBUTE,
  SET_VENDORS,
} from "../actions/actionTypes";

const initialState = {
  users: [],
  filteredUsers: [],
  attributes: [],
  vendors: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.users,
        filteredUsers: action.users,
      };
    case SET_FILTERED_USERS:
      return {
        ...state,
        filteredUsers: action.users,
      };
    case RESET_FILTERED_USERS:
      return {
        ...state,
        filteredUsers: state.users,
      };
    case SET_ATTRIBUTES:
      return {
        ...state,
        attributes: action.attributes,
      };
    case DELETE_ATTRIBUTE:
      return {
        ...state,
        attributes: state.attributes.filter((attr) => attr._id !== action.id),
      };
    case ADD_ATTRIBUTE:
      return {
        ...state,
        attributes: [...state.attributes, action.attribute],
      };
    case SET_VENDORS:
      return {
        ...state,
        vendors: action.vendors,
      };
    default:
      return state;
  }
};
