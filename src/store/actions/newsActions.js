import { fetchAllNews, fetchSingleNews } from "../api/api";
import { SET_NEWS, SET_SINGLE_NEWS } from "./actionTypes";

export const getAllNewsAction = () => {
  return async (dispatch) => {
    const response = await fetchAllNews();
    console.log("response ===", response.data);
    dispatch({ type: SET_NEWS, news: response.data, recent: response.data });
  };
};

export const getSingleNewsAction = (id) => {
  return async (dispatch) => {
    const response = await fetchSingleNews(id);
    console.log("single response ===", response.data);
    dispatch({ type: SET_SINGLE_NEWS, singleNews: response.data });
  };
};
