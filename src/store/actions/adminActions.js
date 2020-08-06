import { postCategory } from "../api/api";

export const submitCategory = (category) => {
  return async (dispatch) => {
    const response = await postCategory(category);
    console.log("response ===", response.data);
  };
};
