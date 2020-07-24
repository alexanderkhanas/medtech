import React, { useState, useMemo } from "react";
import s from "./CartButton.module.css";
import Button from "../Button/Button";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import {
  addToCartAction,
  removeFromCartAction,
} from "../../store/actions/cartActions";
import { connect } from "react-redux";
import classnames from "classnames";

const CartButton = ({ product, cartProducts, removeFromCart, addToCart }) => {
  const { _id } = product;

  const isInCart = useMemo(
    () =>
      !!cartProducts.filter((cartProduct) => cartProduct._id === _id).length,
    [cartProducts, _id]
  );

  const [isAnimation, setAnimation] = useState(false);

  const animation = () => {
    setAnimation(true);
    setTimeout(() => {
      setAnimation(false);
      //   setActiveCartIcon((prev) =>
      //     prev === faShoppingBag ? faCheck : faShoppingBag
      //   );
    }, 500);
  };

  const removeFromCartHandler = () => {
    animation();
    removeFromCart(product);
  };

  const addToCartHandler = () => {
    animation();
    addToCart({ ...product, numberInCart: 1 });
  };

  let activeCartIcon = isInCart ? faCheck : faShoppingBag;
  if (isAnimation) activeCartIcon = isInCart ? faShoppingBag : faCheck;

  return (
    <Button
      className={classnames(s.card__button, {
        [s.active__card__button]: isInCart,
      })}
      isRound
      size="sm"
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
        <FontAwesomeIcon icon={activeCartIcon} className={s.card__cart__icon} />
      </CSSTransition>
    </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(CartButton);
