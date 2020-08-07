import {
  SET_USERS,
  SET_FILTERED_USERS,
  RESET_FILTERED_USERS,
} from "../actions/actionTypes";

const initialState = {
  users: [],
  filteredUsers: [],
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
    default:
      return state;
  }
};
