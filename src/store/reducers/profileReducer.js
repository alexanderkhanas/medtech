import {
  SET_USER_DATA,
  LOGOUT,
  SET_LOGGED_IN,
  SET_ADMIN,
  SET_ORDER_HISTORY,
  SET_USER_ORDERS_PRODUCTS, ADD_HISTORY_ITEM,
} from "../actions/actionTypes";

const initialState = {
  email: "",
  fName: "",
  phone: "",
  fatherName: "",
  gallery: [],
  lName: "",
  token: "",
  _id: "",
  isLogged: false,
  orders: [],
  ordersProducts: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        email: action.user.email,
        fName: action.user.fName,
        phone: action.user.phone,
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

    case SET_ORDER_HISTORY:
      return {
        ...state,
        orders: action.orders,
      };

    case ADD_HISTORY_ITEM:
      return {
        ...state,
        orders: [...state.orders, action.order]
      }

    case SET_USER_ORDERS_PRODUCTS:
      return {
        ...state,
        ordersProducts: {
          ...state.ordersProducts,
          [action.orderId]: action.products,
        },
      };
    default:
      return state;
  }
};
