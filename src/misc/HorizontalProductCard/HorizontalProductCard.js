import React from "react";
import s from "./HorizontalProductCard.module.css";
import { connect } from "react-redux";
import {
  addToCartAction,
  removeFromCartAction,
} from "../../store/actions/cartActions";
import Button from "../Button/Button";
import { useHistory } from "react-router-dom";
import WishlistButton from "../WishlistButton/WishlistButton";

const HorizontalProductCard = ({ product, isSmall, className }) => {
  const history = useHistory();
  const { title, gallery, price, desc, _id } = product;

  const redirectToSingle = () => history.push(`/product/${_id}`);

  return (
    <div className={`${s.container} ${className}`}>
      {!isSmall && (
        <img
          onClick={redirectToSingle}
          src={
            (gallery && gallery[0]) ||
            require("../../assets/image-placeholder.webp")
          }
          alt="loading"
          className={s.img}
        />
      )}
      <div
        className={
          isSmall
            ? `${s.main__content} ${s.main__content__sm}`
            : s.main__content
        }
      >
        <div className={s.info__container}>
          <h3 className={s.title} onClick={redirectToSingle}>
            {isSmall ? title?.slice(0, 40) : title}
          </h3>
          <h2 className={s.price}>{price}₴</h2>
          {!isSmall && <p className={s.desc}>{desc.slice(0, 40)}</p>}
        </div>
        <div className={s.actions__container}>
          <WishlistButton {...{ product }} />
          <div>
            <Button
              title="Купити"
              onClick={redirectToSingle}
              size={isSmall ? "md" : "lg"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product) => dispatch(addToCartAction(product)),
    removeFromCart: (product) => dispatch(removeFromCartAction(product)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HorizontalProductCard);
