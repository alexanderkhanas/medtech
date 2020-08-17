import {
  SET_USER_DATA,
  LOGOUT,
  SET_LOGGED_IN,
  SET_ADMIN,
} from "../actions/actionTypes";

const initialState = {
  email: "",
  fName: "",
  fatherName: "",
  gallery: [],
  lName: "",
  token: "",
  _id: "",
  isLogged: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        email: action.user.email,
        fName: action.user.fName,
        fatherName: action.user.fatherName,
        gallery: action.user.gallery,
        lName: action.user.lName,
        _id: action.user._id,
        isLogged: true,
      };
    case LOGOUT:
      return {
        initialState,
      };
    case SET_LOGGED_IN:
      return {
        ...state,
        isLogged: true,
      };
    case SET_ADMIN:
      return {
        ...state,
        isLogged: true,
        isAdmin: true,
      };
    default:
      return state;
  }
};
