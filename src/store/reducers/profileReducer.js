import { SET_USER_DATA, LOGOUT } from "../actions/actionTypes";

const initialState = {
  email: "",
  fName: "",
  fatherName: "",
  gallery: [],
  lName: "",
  token: "",
  _id: "",
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
      };
    case LOGOUT:
      return {
        initialState,
      };
    default:
      return state;
  }
};
