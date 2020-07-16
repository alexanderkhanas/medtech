import { ADD_TO_CART, REMOVE_FROM_CART, SET_CART } from "./actionTypes";

export const addToCart = (product) => {
  const cart = localStorage.getItem("_cart");
  localStorage.setItem(
    "_cart",
    !!cart ? `${cart} ${product._id}` : product._id
  );
  return {
    type: ADD_TO_CART,
    product,
  };
};

export const removeFromCart = (product) => {
  const cart = localStorage.getItem("_cart");
  if (!cart) return;
  localStorage.setItem("_cart", cart.replace(` ${product._id}`, ""));
  return {
    type: REMOVE_FROM_CART,
    product: product._id,
  };
};

export const setCart = (cart) => {
  return {
    type: SET_CART,
    cart,
  };
};
