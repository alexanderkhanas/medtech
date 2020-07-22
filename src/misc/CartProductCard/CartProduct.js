import React, { useState, useEffect } from "react";
import s from "./CartProduct.module.css";
import { connect } from "react-redux";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Counter from "../Counter/Counter";
import {
  changeNumberInCart,
  removeFromCart,
} from "../../store/actions/cartActions";

const CartProduct = ({
  product,
  changeNumberInCart,
  removeFromCart,
  allProductsInCart,
}) => {
  const { gallery, title, price, _id, desc, numberInCart = 1 } = product;
  const onCounterChange = (value) =>
    changeNumberInCart(value, _id, allProductsInCart);

  const removeFromCartHandler = () => removeFromCart(product);
  return (
    <div className={s.card}>
      <div className={s.main}>
        <img className={s.img} src={gallery[0]} alt="loading" />
        <div className={s.main__content}>
          <h4 className={s.title}>{title.slice(0, 15)}</h4>
          <p className={s.category}>{desc.slice(0, 20)}</p>
        </div>
      </div>
      <div className={s.price__wrapper}>
        <span className={s.price}>{price}₴</span>
      </div>
      <div className={s.qty__counter__wrapper}>
        <div className={s.qty__counter}>
          <Counter onChange={onCounterChange} initialValue={numberInCart} />
        </div>
      </div>
      <div className={s.fullprice__container}>
        <span className={s.fullprice}>{numberInCart * price}₴</span>
      </div>
      <div className={s.remove__icon__wrapper}>
        <FontAwesomeIcon
          icon={faTimes}
          onClick={removeFromCartHandler}
          className={s.remove__icon}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    allProductsInCart: state.cart.all,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    changeNumberInCart: (value, id) => dispatch(changeNumberInCart(value, id)),
    removeFromCart: (product) => dispatch(removeFromCart(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartProduct);
