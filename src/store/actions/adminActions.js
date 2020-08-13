import {
  postCategory,
  fetchUsers,
  postVendor,
  fetchVendors,
  fetchAttributes,
  deleteAttribute,
  deleteCategory,
  createAttribute,
  patchAttribute,
  createNews,
  uploadImageToNews,
  deleteNews,
} from "../api/api";
import { getToken, getAdminToken } from "../../utils/utils";
import {
  SET_USERS,
  RESET_FILTERED_USERS,
  SET_FILTERED_USERS,
  ADD_CATEGORY,
  SET_ATTRIBUTES,
  DELETE_ATTRIBUTE,
  DELETE_CATEGORY,
  ADD_ATTRIBUTE,
  DELETE_NEWS,
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
    if (response?.status) {
      dispatch({ type: ADD_CATEGORY, category: response.data });
    }
    console.log("category response ===", response.status);
  };
};

export const deleteCategoryAction = (id) => {
  return async (dispatch) => {
    const token = getAdminToken();
    const response = await deleteCategory(id, token);
    if (response.status === 200) {
      dispatch({ type: DELETE_CATEGORY, id });
    }
    console.log("delete category ===", response?.data);
  };
};

export const createNewsAction = (body, gallery) => {
  return async (dispatch) => {
    const token = getAdminToken();
    const response = await createNews(body, token);
    console.log("news response ===", response.data);
    if (!gallery || !response?.data) {
      return false;
    }
    if (response?.data) {
      console.log("gallery ===", gallery);

      const imageResponse = await uploadImageToNews(
        gallery,
        response.data,
        token
      );

      return true;
    }
  };
};
export const deleteNewsAction = (id) => {
  return async (dispatch) => {
    const token = getAdminToken();
    const response = await deleteNews(id, token);
    console.log("delete news ===", response?.data);
    if (response.status === 200) {
      dispatch({
        type: DELETE_NEWS,
        id,
      });
    }
  };
};

export const createVendorAction = (vendor) => {
  return async (dispatch) => {
    const token = getAdminToken();
    const response = postVendor(vendor, token);
  };
};

export const getAttributesAction = () => {
  return async (dispatch) => {
    const token = getAdminToken();
    const response = await fetchAttributes(token);
    if (response?.data) {
      dispatch({
        type: SET_ATTRIBUTES,
        attributes: response.data,
      });
    }
    console.log("attributes ===", response?.data);
  };
};

export const deleteAttributeAction = (id) => {
  return async (dispatch) => {
    const token = getAdminToken();
    const response = await deleteAttribute(id, token);
    console.log("delete attribute ===", response?.data);
    if (response.status === 200) {
      dispatch({
        type: DELETE_ATTRIBUTE,
        id,
      });
    }
  };
};

export const createAttributeAction = (attribute) => {
  return async (dispatch) => {
    const token = getAdminToken();
    const response = await createAttribute(attribute, token);
    console.log("create response ===", response?.data);
    if (response?.data) {
      dispatch({
        type: ADD_ATTRIBUTE,
        attribute: response.data,
      });
    }
  };
};

export const editAttributeAction = (attribute) => {
  return async (dispatch) => {
    const token = getAdminToken();
    const response = await patchAttribute(attribute, token);
    console.log("edit attribute ===", response?.data);
  };
};

export const getUsersAction = () => {
  return async (dispatch) => {
    const token = getAdminToken();
    const response = await fetchUsers(token);
    if (response?.data) {
      dispatch({
        type: SET_USERS,
        users: response.data,
      });
    }
  };
};

export const getVendorsAction = () => {
  return async (dispatch) => {
    const token = getAdminToken();
    const response = await fetchVendors(token);
    console.log("response ===", response?.data);
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
