import { postCategory, fetchUsers } from "../api/api";
import { getToken, getAdminToken } from "../../utils/utils";
import {
  SET_USERS,
  RESET_FILTERED_USERS,
  SET_FILTERED_USERS,
} from "./actionTypes";

export const createCategoryAction = (category) => {
  return async (dispatch) => {
    const token = getAdminToken();
    console.log("token ===", token);
    console.log("category ===", { ...category, desc: "", gallery: [""] });

    const response = await postCategory(
      { ...category, desc: "", gallery: [""] },
      token
    );
    console.log("category response ===", response.data);
  };
};

export const getUsersAction = () => {
  return async (dispatch) => {
    const token = getAdminToken();
    const response = await fetchUsers(token);
    if (response.data) {
      dispatch({
        type: SET_USERS,
        users: response.data,
      });
    }
  };
};

export const filterUsersAction = (searchValue, users) => {
  if (!searchValue) {
    return {
      type: RESET_FILTERED_USERS,
    };
  }
  const filteredUsers = users.filter(
    ({ fName = "", lName = "", phone = "" }) => {
      return (
        fName.toLowerCase().startsWith(searchValue) ||
        lName.toLowerCase().startsWith(searchValue) ||
        `${phone}`.toLowerCase().startsWith(searchValue)
      );
    }
  );
  return {
    type: SET_FILTERED_USERS,
    users: filteredUsers,
  };
};
