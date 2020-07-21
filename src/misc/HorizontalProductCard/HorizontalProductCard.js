import React from "react";
import s from "./HorizontalProductCard.module.css";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { addToCart, removeFromCart } from "../../store/actions/cartActions";
import Button from "../Button/Button";

const HorizontalProductCard = ({ product, removeFromCart, addToCart }) => {
  const { title, gallery, price, desc, _id } = product;
  const removeFromCartHandler = () => {
    removeFromCart(product);
  };

  const addToCartHandler = () => {
    addToCart(product);
  };
  return (
    <div className={s.container}>
      <img src={gallery[0]} alt="loading" className={s.img} />
      <div className={s.main__content}>
        <h3 className={s.title}>{title}</h3>
        <h2 className={s.price}>{price}</h2>
        <p className={s.desc}>{desc}</p>
        <div className={s.actions__container}>
          <Button />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HorizontalProductCard);
