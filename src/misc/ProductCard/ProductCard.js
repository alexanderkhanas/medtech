import React from "react";
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
      <div className={s.wishlist__container}>
        <WishlistButton {...{ product }} className={s.wishlist__button} />
      </div>
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
          <span className={s.card__price}>{`${price} ₴`}</span>
          <div>
            <CartButton {...{ product }} />
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
