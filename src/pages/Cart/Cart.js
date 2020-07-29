import React, { useEffect, useState } from "react";
import s from "./Cart.module.css";
import { connect } from "react-redux";
import {
  addToCartAction,
  removeFromCartAction,
  setFullPriceAction,
} from "../../store/actions/cartActions";
import CartProduct from "../../misc/CartProductCard/CartProduct";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
import Button from "../../misc/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import BreadCrumbs from "../../misc/BreadCrumbs/BreadCrumbs";

const Cart = ({ cartProducts, fullPrice, setFullPrice }) => {
  useEffect(() => {
    setFullPrice(
      cartProducts.reduce(
        (acc, { price, numberInCart = 1, selectedAttributesPrice }) => {
          const productPrice = +selectedAttributesPrice || price;
          return acc + productPrice * numberInCart;
        }
      )
    );
  }, [cartProducts]);

  const breadCrumbsItems = [
    {
      name: "Головна",
      path: "/",
      icon: <FontAwesomeIcon icon={faHome} />,
    },
    { name: "Кошик", path: "/cart" },
  ];

  return (
    <div className={s.container}>
      <div className={s.title__container}>
        <h1 className={s.title}>Кошик</h1>
        <BreadCrumbs items={breadCrumbsItems} />
      </div>
      <FixedWrapper>
        {cartProducts.length ? (
          <>
            <div className={s.products__container}>
              <div className={s.products__header}>
                <span>Товар</span>
                <span>Ціна</span>
                <span>Кількість</span>
                <span>Загальна сума</span>
                <span>Видалити</span>
              </div>
              {cartProducts.map((product, i) => (
                <CartProduct {...{ product }} key={product._id} />
              ))}
            </div>
            <div className={s.actions__container}>
              <h2 className={s.actions__price}>{`${fullPrice || 0} ₴`}</h2>
              <div>
                <Button title="Купити" size="xl" isUppercase />
              </div>
            </div>
          </>
        ) : (
          <div className={s.empty__cart__msg__container}>
            <h1 className={s.empty__cart__msg}>Поки що ваш кошик порожній</h1>
          </div>
        )}
      </FixedWrapper>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cartProducts: state.cart.all,
    fullPrice: state.cart.fullPrice,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product) => dispatch(addToCartAction(product)),
    removeFromCart: (product) => dispatch(removeFromCartAction(product)),
    setFullPrice: (fullPrice) => dispatch(setFullPriceAction(fullPrice)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
