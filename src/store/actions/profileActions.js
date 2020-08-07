import {
  registerRequest,
  loginRequest,
  fetchUserData,
  patchUser,
} from "../api/api";
import { SET_USER_DATA, SET_LOADING, LOGOUT } from "./actionTypes";
import { getToken } from "../../utils/utils";

export const registerAction = (data) => {
  return async (dispatch) => {
    const response = await registerRequest(data);
    console.log("register response ===", response.data);
  };
};

export const loginAction = (data) => {
  return async (dispatch) => {
    const response = await loginRequest(data);
    // console.log("login response ===", response.data);
    if (response) {
      dispatch({ type: SET_USER_DATA, user: response.data.user });
    }
    return response?.data;
  };
};

export const getUserByIdAction = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING, isLoading: true });
    const response = await fetchUserData(id);
    if (response?.data) {
      dispatch({ type: SET_USER_DATA, user: response.data });
    }
    dispatch({ type: SET_LOADING, isLoading: false });
  };
};

export const patchUserAction = (user) => {
  return async () => {
    const token = getToken();
    const response = await patchUser(user, token);
  };
};

export const logoutAction = () => {
  document.cookie = "token=''; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
  return {
    type: LOGOUT,
  };
};
