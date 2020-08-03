import React, { useState, useEffect } from "react";
import s from "./CreateOrder.module.css";
import { connect } from "react-redux";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
import Select from "../../misc/Select/Select";
import Button from "../../misc/Button/Button";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import CartProduct from "../../misc/CartProductCard/CartProduct";
import {
  addToCartAction,
  removeFromCartAction,
  setFullPriceAction,
} from "../../store/actions/cartActions";
import BreadCrumbs from "../../misc/BreadCrumbs/BreadCrumbs";

const CreateOrder = ({ cartProducts, fullPrice, setFullPrice }) => {
  useEffect(() => {
    setFullPrice(
      cartProducts.reduce(
        (acc, { price, numberInCart = 1, selectedAttributesPrice }) => {
          const productPrice = +selectedAttributesPrice || price;
          return acc + productPrice * numberInCart;
        },
        0
      )
    );
  }, [cartProducts]);
  const deliveryOptions = [
    { value: "self-pickup", label: "Самовивіз" },
    { value: "np", label: "Нова пошта" },
    { value: "up", label: "Укр пошта" },
  ];
  const payOptions = [
    { value: "cash", label: "Наложений платіж" },
    { value: "card", label: "Картою" },
  ];
  const [sortType, setSortType] = useState(deliveryOptions[0]);
  const [sortPayType, setPayType] = useState(payOptions[0]);
  const onSortTypeChange = (value) => {
    setSortType(value);
  };
  const onSortPayChange = (value) => {
    setPayType(value);
  };
  const breadCrumbsItems = [
    {
      name: "Кошик",
      path: "/cart",
      icon: <FontAwesomeIcon icon={faShoppingCart} />,
    },
    { name: "Замовлення", path: "/create-order" },
  ];
  const h = useHistory();
  return (
    <div className={s.container}>
      <div className={s.title__container}>
        <h4 className={s.title}>Замовлення</h4>
        <BreadCrumbs items={breadCrumbsItems} />
      </div>
      <FixedWrapper>
        <div className={s.order__container}>
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
          <div className={s.submit__container_all}>
            <div className={s.submit__container}>
              <div className={s.select_container}></div>
              <div className={s.sort__container}>
                <span>Тип оплати</span>
                <Select
                  onSelect={onSortPayChange}
                  value={sortPayType.label}
                  options={payOptions}
                />
              </div>
              <div className={s.sort__container}>
                <span>Тип доставки</span>
                <Select
                  onSelect={onSortTypeChange}
                  value={sortType.label}
                  options={deliveryOptions}
                />
              </div>
              <span className={s.price}>Ціна: {`${fullPrice || 0} ₴`}</span>
              <span className={s.status}>Створений</span>
              <div className={s.submit__btn__container}>
                <Button
                  title="Підтвердити замовлення"
                  className={s.submit__btn}
                />
              </div>
              <button
                className={s.goBack__but}
                onClick={() => {
                  h.goBack();
                }}
              >
                <FontAwesomeIcon icon={faArrowLeft} className={s.goBack} />
                Повернутися
              </button>
            </div>
          </div>
        </div>
      </FixedWrapper>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { cartProducts: state.cart.all, fullPrice: state.cart.fullPrice };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product) => dispatch(addToCartAction(product)),
    removeFromCart: (product) => dispatch(removeFromCartAction(product)),
    setFullPrice: (fullPrice) => dispatch(setFullPriceAction(fullPrice)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrder);
