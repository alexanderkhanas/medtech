import {
  registerRequest,
  loginRequest,
  fetchUserData,
  patchUser,
} from "../api/api";
import { SET_USER_DATA, SET_LOADING } from "./actionTypes";

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
    const response = await fetchUserData(id).catch((e) => {
      console.log("get user err", e.response);
    });
    if (response?.data) {
      console.log("get user res ===", response?.data);
      dispatch({ type: SET_USER_DATA, user: response.data });
    }
    dispatch({ type: SET_LOADING, isLoading: false });
  };
};

export const patchUserAction = (user, token) => {
  return async () => {
    const response = await patchUser(user, token);
    console.log("patch response", response.data);
  };
};
