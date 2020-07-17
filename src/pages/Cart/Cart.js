import React, { useEffect } from "react";
import s from "./Cart.module.css";
import { connect } from "react-redux";
import { addToCart, removeFromCart } from "../../store/actions/cartActions";
import CartProduct from "../../misc/CartProductCard/CartProduct";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";

const Cart = ({ cartProducts }) => {
  useEffect(() => {
    console.log(cartProducts);
  }, []);
  return (
    <div>
      <FixedWrapper>
        <div className={s.products__container}>
          <div className={s.products__header}>
            <span>Товар</span>
            <span>Ціна</span>
            <span>Кількість</span>
            <span>Загальна сума</span>
            <span>Видалити</span>
          </div>
          {cartProducts.map((product, i) => (
            <CartProduct {...{ product }} key={i} />
          ))}
        </div>
      </FixedWrapper>
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

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
