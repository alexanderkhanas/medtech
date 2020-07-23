import { SET_LOADING } from "./actionTypes";

export const setLoadingAction = (isLoading) => {
  return {
    type: SET_LOADING,
    isLoading,
  };
};
