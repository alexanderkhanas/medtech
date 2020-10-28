import React, { useState } from "react";
import s from "./ProductCard.module.css";
import { connect } from "react-redux";
import {
  addToCartAction,
  removeFromCartAction,
} from "../../store/actions/cartActions";
import { useHistory } from "react-router-dom";
import classnames from "classnames";
import WishlistButton from "../WishlistButton/WishlistButton";
import Button from "../Button/Button";
import { ReactComponent as ShoppingCart } from "../../assets/shopping-cart.svg";
import ConvertImage from "react-convert-image";

const ProductCard = ({ product, className }) => {
  const { gallery, title, price, _id } = product;
  const history = useHistory();
  const [converted, setConverted] = useState("");

  const redirectToSingleProduct = () => history.push(`/product/${_id}`);
  const handleConvertedImage = (uri) => {
    console.log("uri ===", uri);
    setConverted(uri);
  };
  if (title?.includes("Шорты")) {
    console.log("product ===", product);
  }
  return (
    <div className={classnames(s.card__container, className)}>
      <div className={classnames(s.card)}>
        <WishlistButton {...{ product }} className={s.wishlist__button} />
        <div className={s.card__main}>
          {/*{!!gallery && gallery[0] && <ConvertImage*/}
          {/*    image={*/}
          {/*        gallery[0]*/}
          {/*    }*/}
          {/*    format="jpeg"*/}
          {/*    onConversion={handleConvertedImage}*/}
          {/*/>}*/}
          {/*{!!converted &&*/}
          <img
            src={
              gallery && gallery[0]
                ? gallery[0]
                : require("../../assets/image-placeholder.webp")
            }
            className={s.card__img}
            onClick={redirectToSingleProduct}
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
              <Button
                size="lg"
                title="Купити"
                onClick={redirectToSingleProduct}
              >
                <ShoppingCart className={s.cart__button__icon} />
              </Button>
            </div>
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
