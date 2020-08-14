import {
  createCategory,
  fetchUsers,
  createVendor,
  fetchVendors,
  fetchAttributes,
  deleteAttribute,
  deleteCategory,
  createAttribute,
  patchAttribute,
  createNews,
  uploadImageToNews,
  deleteNews,
  deleteVendor,
  patchVendor,
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
  SET_VENDORS,
} from "./actionTypes";

export const createCategoryAction = (category) => {
  return async (dispatch) => {
    const token = getAdminToken();

    const response = await createCategory(
      { ...category, desc: "", gallery: [""] },
      token
    );
    if (response?.data) {
      dispatch({ type: ADD_CATEGORY, category: response.data });
    }
    console.log("category response ===", response.data);
    return response.status === 200;
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
    return response.status === 200;
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
    return response.status === 200;
  };
};

export const createVendorAction = (vendor) => {
  return async (dispatch) => {
    const token = getAdminToken();
    const response = await createVendor(vendor, token);
    return response.status === 200;
  };
};

export const deleteVendorAction = (vendor) => {
  return async (dispatch) => {
    const token = getAdminToken();
    const response = deleteVendor(vendor._id, token);
    console.log("delete vendor ===", response?.data);
    return response.status === 200;
  };
};

export const editVendorAction = (vendor) => {
  return async (dispatch) => {
    const token = getAdminToken();
    const response = await patchVendor(vendor, vendor._id, token);
    console.log("patch vendor ===", response?.data);
    return response.status === 200;
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
    return response.status === 200;
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
    return response.status === 200;
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
    return response.status === 200;
  };
};

export const editAttributeAction = (attribute) => {
  return async (dispatch) => {
    const token = getAdminToken();
    const response = await patchAttribute(attribute, token);
    console.log("edit attribute ===", response?.data);
    return response.status === 200;
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
    if (response?.data) {
      dispatch({
        type: SET_VENDORS,
        vendors: response.data,
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
