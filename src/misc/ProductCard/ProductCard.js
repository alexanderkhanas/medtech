import React, { useState, useRef, useEffect } from "react";
import s from "./ProductCard.module.css";
import { connect } from "react-redux";
import {
  addToCartAction,
  removeFromCartAction,
} from "../../store/actions/cartActions";
import { useHistory } from "react-router-dom";
import classnames from "classnames";
import WishlistButton from "../WishlistButton/WishlistButton";

const ProductCard = ({ product, className }) => {
  const { gallery, title, price, _id } = product;
  const history = useHistory();
  const redirectToSingleProduct = () => history.push(`/product/${_id}`);
  return (
    <div className={classnames(s.card, className)}>
      <div className={s.card__main}>
        <img
          className={s.card__img}
          onClick={redirectToSingleProduct}
          src={
            gallery[0]
              ? gallery[0]
              : require("../../assets/image-placeholder.webp")
          }
          alt="loading..."
        />
      </div>
      <div className={s.card__footer}>
        <h4 className={s.card__title} onClick={redirectToSingleProduct}>
          {title.slice(0, 40)}
        </h4>
        <div className={s.card__price__container}>
          <span className={s.card__price}>{`${price} ₴`}</span>
          <div>
            <WishlistButton {...{ product }} className={s.wishlist__button} />
            {/* <CartButton {...{ product }} {...{ showAttributesAlert }} /> */}
          </div>
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
    addToCart: (product) => dispatch(addToCartAction(product)),
    removeFromCart: (product) => dispatch(removeFromCartAction(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
