import React from "react";
import s from "./HorizontalProductCard.module.css";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { addToCart, removeFromCart } from "../../store/actions/cartActions";
import Button from "../Button/Button";
import CartButton from "../CartButton/CartButton";
import { useHistory } from "react-router-dom";
import WishlistButton from "../WishlistButton/WishlistButton";

const HorizontalProductCard = ({ product }) => {
  const history = useHistory();
  const { title, gallery, price, desc, _id } = product;

  const redirectToSingle = () => history.push(`/product/${_id}`);

  return (
    <div className={s.container}>
      <img
        onClick={redirectToSingle}
        src={gallery[0]}
        alt="loading"
        className={s.img}
      />
      <div className={s.main__content}>
        <div className={s.info__container}>
          <h3 className={s.title} onClick={redirectToSingle}>
            {title}
          </h3>
          <h2 className={s.price}>{price}₴</h2>
          <p className={s.desc}>{desc}</p>
        </div>
        <div className={s.actions__container}>
          <WishlistButton {...{ product }} />
          {/* <CartButton
            {...{ product }}
            {...{ removeFromCart }}
            {...{ addToCart }}
            {...{ cartProducts }}
          /> */}
          <Button title="Додати в кошик" size="lg" />
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
    addToCart: (product) => dispatch(addToCart(product)),
    removeFromCart: (product) => dispatch(removeFromCart(product)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HorizontalProductCard);
