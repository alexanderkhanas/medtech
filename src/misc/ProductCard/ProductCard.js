import React, { useState, useEffect } from "react";
import s from "./ProductCard.module.css";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag, faCheck } from "@fortawesome/free-solid-svg-icons";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
import { addToCart, removeFromCart } from "../../store/actions/cartActions";

const ProductCard = ({ product, addToCart, removeFromCart, cartProducts }) => {
  const { gallery, title, price, _id } = product;
  const [isAnimation, setAnimation] = useState(false);
  const isInCart = !!cartProducts.filter((product) => product._id === _id)
    .length;
  const [activeCartIcon, setActiveCartIcon] = useState(
    isInCart ? faCheck : faShoppingBag
  );

  const animation = () => {
    setAnimation(true);
    setTimeout(() => {
      setAnimation(false);
      setActiveCartIcon((prev) =>
        prev === faShoppingBag ? faCheck : faShoppingBag
      );
    }, 500);
  };

  const removeFromCartHandler = () => {
    animation();
    removeFromCart(product);
  };

  const addToCartHandler = () => {
    animation();
    addToCart({ ...product, quantity: 1 });
  };

  return (
    <div className={s.card}>
      <div className={s.card__main}>
        <img className={s.card__img} src={gallery[0]} alt="" />
      </div>
      <div className={s.card__footer}>
        <h4 className={s.card__title}>{title}</h4>
        <div className={s.card__price__container}>
          <span className={s.card__price}>{price + " "} ₴</span>
          <Button
            className={
              isInCart
                ? `${s.card__button} ${s.active__card__button} `
                : s.card__button
            }
            isRound={true}
            onClick={isInCart ? removeFromCartHandler : addToCartHandler}
          >
            <CSSTransition
              in={isAnimation}
              timeout={200}
              classNames={{
                enterActive: s.cart__icon__entering,
                enterDone: s.cart__icon__entered,
                exitActive: s.cart__icon__exiting,
                exitDone: s.cart__icon__exited,
              }}
            >
              <FontAwesomeIcon
                icon={activeCartIcon}
                className={s.card__cart__icon}
              />
            </CSSTransition>
          </Button>
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
