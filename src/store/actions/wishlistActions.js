import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  SET_WISHLIST,
} from "./actionTypes";

export const addToWishlist = (product) => {
  const wishlist = localStorage.getItem("_wishlist");
  localStorage.setItem(
    "_wishlist",
    wishlist ? `${wishlist} ${product._id}` : product._id
  );
  return {
    type: ADD_TO_WISHLIST,
    product,
  };
};

export const removeFromWishlist = (product) => {
  const wishlist = localStorage.getItem("_wishlist");
  if (!wishlist) return {};
  localStorage.setItem("_wishlist", wishlist.replace(` ${product._id}`, ""));
  localStorage.setItem("_wishlist", wishlist.replace(`${product._id}`, ""));
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
