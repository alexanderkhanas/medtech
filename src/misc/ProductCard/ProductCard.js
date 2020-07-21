import React, { useState, useEffect, useMemo } from "react";
import s from "./ProductCard.module.css";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag, faCheck } from "@fortawesome/free-solid-svg-icons";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
import { addToCart, removeFromCart } from "../../store/actions/cartActions";
import { useHistory } from "react-router-dom";
import classnames from "classnames";
import CartButton from "../CartButton/CartButton";

const ProductCard = ({
  product,
  className,
  addToCart,
  removeFromCart,
  cartProducts,
}) => {
  const { gallery, title, price, _id } = product;
  const history = useHistory();

  const redirectToSingleProduct = () => history.push(`/product/${_id}`);

  return (
    <div className={classnames(s.card, className)}>
      <div className={s.card__main}>
        <img
          className={s.card__img}
          onClick={redirectToSingleProduct}
          src={gallery[0]}
          alt=""
        />
      </div>
      <div className={s.card__footer}>
        <h4 className={s.card__title} onClick={redirectToSingleProduct}>
          {title}
        </h4>
        <div className={s.card__price__container}>
          <span className={s.card__price}>{price + " "} ₴</span>
          <CartButton
            {...{ addToCart }}
            {...{ removeFromCart }}
            {...{ cartProducts }}
            {...{ product }}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cartProducts: state.cart.all,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product) => dispatch(addToCart(product)),
    removeFromCart: (product) => dispatch(removeFromCart(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
