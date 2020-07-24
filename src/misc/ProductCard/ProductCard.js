import React, { useState, useRef, useEffect } from "react";
import s from "./ProductCard.module.css";
import { connect } from "react-redux";
import {
  addToCartAction,
  removeFromCartAction,
} from "../../store/actions/cartActions";
import { useHistory } from "react-router-dom";
import classnames from "classnames";
import CartButton from "../CartButton/CartButton";
import WishlistButton from "../WishlistButton/WishlistButton";
import ImageUploader from "react-images-upload";

const ProductCard = ({
  product,
  className,
  addToCart,
  removeFromCart,
  cartProducts,
}) => {
  const { gallery, title, price, _id } = product;
  const history = useHistory();
  const [isAnimation, setAnimation] = useState(false);
  const [isAttributesAlert, setAttributesAlert] = useState(false);

  const showAttributesAlert = () => setAttributesAlert(true);

  const redirectToSingleProduct = () => history.push(`/product/${_id}`);

  const isBase64 = gallery[0]?.includes("base64");
  console.log("product ===", product);
  console.log("is base64 ===", isBase64);

  console.log(`data:image/png;base64, ${gallery[0]}`);

  return (
    <div className={classnames(s.card, className)}>
      <div className={s.wishlist__container}></div>
      <div className={s.card__main}>
        <img
          className={s.card__img}
          onClick={redirectToSingleProduct}
          src="https://i.ibb.co/27WPrWh/i1.png"
          alt=""
        />
      </div>
      <div className={s.card__footer}>
        <h4 className={s.card__title} onClick={redirectToSingleProduct}>
          {title}
        </h4>
        <div className={s.card__price__container}>
          <span className={s.card__price}>{`${price} ₴`}</span>
          <div>
            <WishlistButton {...{ product }} className={s.wishlist__button} />
            {/* <CartButton {...{ product }} {...{ showAttributesAlert }} /> */}
            {isAttributesAlert && <div className={s.attribute__alert}></div>}
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
