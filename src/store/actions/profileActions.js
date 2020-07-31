import {
  registerRequest,
  loginRequest,
  fetchUserData,
  patchUser,
} from "../api/api";
import { SET_USER_DATA } from "./actionTypes";

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
      dispatch({ type: SET_USER_DATA, user: response.data });
    }
    return response?.data;
  };
};

export const getUserByIdAction = (id) => {
  return async (dispatch) => {
    const response = await fetchUserData(id);
    if (response?.data) {
      console.log("get user res ===", response?.data);
      dispatch({ type: SET_USER_DATA, user: response.data });
    }
  };
};

export const patchUserAction = (user, token) => {
  return async () => {
    const response = await patchUser(user, token);
    console.log("patch response", response.data);
  };
};
