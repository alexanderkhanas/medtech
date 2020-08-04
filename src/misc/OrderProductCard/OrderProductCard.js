import React, { useState, useEffect } from "react";
import s from "./OrderProductCard.module.css";
import { connect } from "react-redux";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Counter from "../Counter/Counter";
import {
  changeNumberInCartAction,
  removeFromCartAction,
} from "../../store/actions/cartActions";
import { Link } from "react-router-dom";

const OrderProductCard = ({
  product,
  changeNumberInCart,
  removeFromCart,
  allProductsInCart,
}) => {
  const {
    gallery,
    title,
    price,
    _id,
    desc,
    numberInCart = 1,
    selectedAttributesId,
    selectedAttributesPrice,
  } = product;

  const productPrice = selectedAttributesPrice || price;

  return (
    <div className={s.card}>
      <div className={s.main}>
        <Link to={`product/${_id}`} style={{ position: "relative" }}>
          <img
            className={s.img}
            src="https://i.ibb.co/27WPrWh/i1.png"
            alt="loading"
          />
          <div className={s.number__tag}>
            <span className={s.number}>{numberInCart}</span>
          </div>
        </Link>

        <div className={s.main__content}>
          <Link to={`product/${_id}`}>
            <span className={s.title}>{title.slice(0, 15)}</span>
          </Link>
          <p className={s.category}>{desc.slice(0, 20)}</p>
        </div>
      </div>
      <span className={s.fullprice}>{+numberInCart * +productPrice || 0}₴</span>
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
    changeNumberInCart: (value, id, allProducts) =>
      dispatch(changeNumberInCartAction(value, id, allProducts)),
    removeFromCart: (product) => dispatch(removeFromCartAction(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderProductCard);
