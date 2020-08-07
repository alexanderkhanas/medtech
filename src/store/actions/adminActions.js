import { postCategory, fetchUsers } from "../api/api";
import { getToken } from "../../utils/utils";

export const submitCategoryAction = (category) => {
  return async (dispatch) => {
    const response = await postCategory(category);
  };
};

export const getUsersAction = () => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchUsers(token);
    console.log("users ===", response.data);
  };
};
