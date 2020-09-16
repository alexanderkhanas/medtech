import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  SET_WISHLIST,
} from "./actionTypes";
import {getLocalWishlist} from "../../utils/utils";
import {fetchExactProducts} from "../api/api";

export const addToWishlistAction = (product) => {
  const wishlist = localStorage.getItem("_wishlist");
  const { _id } = product;
  localStorage.setItem("_wishlist", wishlist ? `${wishlist} ${_id}` : _id);
  return {
    type: ADD_TO_WISHLIST,
    product,
  };
};

export const removeFromWishlistAction = (product) => {
  const wishlist = localStorage.getItem("_wishlist");
  if (!wishlist) return {};
  const { _id } = product;
  localStorage.setItem("_wishlist", wishlist.replace(` ${_id}`, ""));
  localStorage.setItem("_wishlist", wishlist.replace(`${_id}`, ""));
  return {
    type: REMOVE_FROM_WISHLIST,
    product,
  };
};

export const setWishlist = (wishlist) => {
  return {
    type: SET_WISHLIST,
    wishlist,
  };
};

export const getWishlistAction = () => {
  return async dispatch => {
    const wishlistIds = getLocalWishlist();
    if (wishlistIds?.length) {
      const wishlist = await fetchExactProducts(wishlistIds.join(","));
      dispatch({
        type: SET_WISHLIST,
        wishlist,
      });
    }
  }

}
