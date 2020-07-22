import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SET_CART,
  SET_NUMBER_CART,
  SET_FULL_PRICE,
} from "./actionTypes";

export const addToCart = (product) => {
  const cart = localStorage.getItem("_cart");
  localStorage.setItem("_cart", cart ? `${cart} ${product._id}` : product._id);
  return {
    type: ADD_TO_CART,
    product,
  };
};

export const removeFromCart = (product) => {
  const cart = localStorage.getItem("_cart");
  console.log(cart);

  if (!cart) return;
  localStorage.setItem("_cart", cart.replace(` ${product._id}`, ""));
  return {
    type: REMOVE_FROM_CART,
    productId: product._id,
  };
};

export const changeNumberInCart = (value, id, allCartProducts) => {
  let fullPrice = 0;
  const editedProducts = allCartProducts.map((product) => {
    const editedProduct =
      product._id === id ? { ...product, numberInCart: value } : product;
    fullPrice += product.price * editedProduct.numberInCart;
    return editedProduct;
  });

  return {
    type: SET_NUMBER_CART,
    editedProducts,
    fullPrice,
  };
};

export const setFullPrice = (fullPrice) => {
  return {
    type: SET_FULL_PRICE,
    fullPrice,
  };
};

export const setCart = (cart) => {
  return {
    type: SET_CART,
    cart,
  };
};
