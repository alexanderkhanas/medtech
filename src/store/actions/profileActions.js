import {
  registerRequest,
  loginRequest,
  fetchUserData,
  patchUser,
} from "../api/api";
import { SET_USER_DATA, SET_LOADING, LOGOUT, SET_ADMIN } from "./actionTypes";
import { getToken } from "../../utils/utils";

export const registerAction = (data) => {
  return async (dispatch) => {
    const response = await registerRequest(data);
    console.log("register response ===", response.data);
    if (response?.data) {
      dispatch({ type: SET_USER_DATA, user: response.data.user });
      const { token, aToken } = response.data;
      if (aToken) {
        document.cookie = `aToken=${aToken}`;
      }
      if (token) {
        document.cookie = `token=${token}`;
      }
    }
    return response?.data?.user?._id;
  };
};

export const loginAction = (data, isRemember) => {
  return async (dispatch) => {
    const response = await loginRequest(data);
    // console.log("login response ===", response.data);
    if (response?.data) {
      console.log("is remember ===", isRemember);

      if (isRemember) {
        localStorage.setItem("_login", JSON.stringify(data));
      }
      const { token, aToken, isAdmin } = response.data;
      if (aToken && isAdmin) {
        document.cookie = `aToken=${aToken}`;
        dispatch({ type: SET_ADMIN });
        return "admin";
      }
      dispatch({ type: SET_USER_DATA, user: response.data.user });

      if (token) {
        document.cookie = `token=${token}`;
      }
    }
    return response?.data?.user?._id;
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

export const patchUserAction = (user, userToken) => {
  return async (dispatch) => {
    let token = userToken;
    if (!userToken) {
      token = getToken();
    }
    const response = await patchUser(user, token);
  };
};

export const logoutAction = () => {
  document.cookie = "token=''; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
  localStorage.removeItem("_login");
  return {
    type: LOGOUT,
  };
};
