import React, { useState, useRef, useEffect } from "react";
import s from "./ProductCard.module.css";
import { connect } from "react-redux";
import {
  addToCartAction,
  removeFromCartAction,
} from "../../store/actions/cartActions";
import { useHistory, Link } from "react-router-dom";
import classnames from "classnames";
import WishlistButton from "../WishlistButton/WishlistButton";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Image from "react-image-resizer";
import Resizer from "react-image-file-resizer";

const ProductCard = ({ product, className }) => {
  const { gallery, title, price, _id } = product;
  const [resizedPhoto, setResizedPhoto] = useState("");
  const history = useHistory();
  const redirectToSingleProduct = () => history.push(`/product/${_id}`);
  return (
    <div className={classnames(s.card, className)}>
      <WishlistButton {...{ product }} className={s.wishlist__button} />
      <div className={s.card__main}>
        <Image
          src={
            "https://www.silverdisc.co.uk/sites/default/files/sd_importer/lion_webp_10.webp"
            // gallery[0]
            //   ? gallery[0]
            //   : require("../../assets/image-placeholder.webp")
          }
          width={310}
          height={300}
          // style={style.image}
        />
        {/* <img
          className={s.card__img}
          onClick={redirectToSingleProduct}
          src={
            gallery[0]
              ? gallery[0]
              : require("../../assets/image-placeholder.webp")
          }
          alt="loading..."
        /> */}
      </div>
      <div className={s.card__footer}>
        <h4 className={s.card__title} onClick={redirectToSingleProduct}>
          {title.slice(0, 40)}
        </h4>
        <div className={s.card__price__container}>
          <span className={s.card__price}>{`${price} ₴`}</span>
          <div>
            <Button size="lg" title="Купити" onClick={redirectToSingleProduct}>
              <FontAwesomeIcon
                icon={faShoppingCart}
                className={s.cart__button__icon}
              />
            </Button>
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
