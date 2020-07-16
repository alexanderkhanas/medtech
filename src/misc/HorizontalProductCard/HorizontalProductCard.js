import React from "react";
import s from "./HorizontalProductCard.module.css";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { addToCart, removeFromCart } from "../../store/actions/cartActions";

const HorizontalProductCard = ({ product, removeFromCart, addToCart }) => {
  const removeFromCartHandler = () => {
    removeFromCart(product);
  };

  const addToCartHandler = () => {
    addToCart(product);
  };
  return <div></div>;
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
