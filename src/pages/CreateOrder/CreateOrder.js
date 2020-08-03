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
import { Formik } from "formik";
import Input from "../../misc/Inputs/Input/Input";
import {
  getCitiesAction,
  getWarehousesAction,
} from "../../store/actions/orderActions";

const CreateOrder = ({
  cartProducts,
  fullPrice,
  setFullPrice,
  getCities,
  getWarehouses,
  cities,
  filterCities,
}) => {
  const deliveryOptions = [
    { value: "self-pickup", label: "Самовивіз" },
    { value: "np", label: "Нова пошта" },
    { value: "up", label: "Укр пошта" },
  ];

  const payOptions = [
    { value: "cash", label: "Наложений платіж" },
    { value: "card", label: "Картою" },
  ];

  const breadCrumbsItems = [
    {
      name: "Кошик",
      path: "/cart",
      icon: <FontAwesomeIcon icon={faShoppingCart} />,
    },
    { name: "Замовлення", path: "/create-order" },
  ];

  const [deliveryType, setDeliveryType] = useState(deliveryOptions[0]);
  const [paymentType, setPaymentType] = useState(payOptions[0]);
  const [citiesSearchValue, setCitiesSearchValue] = useState("");

  const onCitiesScroll = ({ target }) => {
    console.log("e ===", target.scrollHeight, target.scrollTop);
    if (
      target.scrollHeight - target.scrollTop < 400 &&
      cities.length % 20 === 0
    ) {
      filterCities(citiesSearchValue, cities.length + 20);
    }
  };
  const onWarehousesScroll = ({ target }) => {};

  const h = useHistory();

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

  useEffect(() => {
    getWarehouses();
    getCities();
  }, []);

  console.log("cities ===", cities);

  return (
    <div className={s.container}>
      <div className={s.title__container}>
        <h4 className={s.title}>Замовлення</h4>
        <BreadCrumbs items={breadCrumbsItems} />
      </div>
      <FixedWrapper>
        <div className={s.order__container}>
          <div className={s.products__container}>
            {cartProducts.map((product, i) => (
              <CartProduct isSmall {...{ product }} key={product._id} />
            ))}
            <div className={s.subtotal__container}>
              <div className={s.subtotal__title}>Ціна:</div>
              <div className={s.subtotal__price}>5438 грн.</div>
            </div>
          </div>
          <div className={s.submit__container_all}>
            <Formik
              initialValues={{
                fName: "",
                sName: "",
                city: "",
                street: "",
                house: "",
              }}
              validate={(values) => {
                const errors = "";
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                const { deliveryType, city, street, house } = values;
              }}
            >
              {({ handleChange }) => (
                <div className={s.submit__container}>
                  <div className={s.input__row}>
                    <Input
                      name="fName"
                      onChange={handleChange}
                      label="Ім'я"
                      placeholder="John"
                      containerClass={s.input__container}
                    />
                    <Input
                      placeholder="Doe"
                      name="sName"
                      containerClass={s.input__container}
                      onChange={handleChange}
                      label="Прізвище"
                    />
                  </div>
                  <Select
                    containerClass={s.section}
                    options={payOptions}
                    onSelect={setPaymentType}
                    label="Тип оплати"
                    value={paymentType.label}
                  />
                  <Select
                    containerClass={s.section}
                    options={deliveryOptions}
                    onSelect={setDeliveryType}
                    label="Тип доставки"
                    value={deliveryType.label}
                  />
                  {cities.length && (
                    <Select
                      containerClass={s.section}
                      withSearch
                      onMenuScroll={onCitiesScroll}
                      options={cities.map((city) => ({
                        value: city.Description,
                        label: city.Description,
                      }))}
                      onSearchValueChange={(value) => {
                        filterCities(value);
                      }}
                      label="Місто"
                    />
                  )}
                  <span className={s.price}>Ціна: {`${fullPrice || 0} ₴`}</span>
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
              )}
            </Formik>
          </div>
        </div>
      </FixedWrapper>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cartProducts: state.cart.all,
    fullPrice: state.cart.fullPrice,
    cities: state.order.cities,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product) => dispatch(addToCartAction(product)),
    removeFromCart: (product) => dispatch(removeFromCartAction(product)),
    setFullPrice: (fullPrice) => dispatch(setFullPriceAction(fullPrice)),
    getCities: () => dispatch(getCitiesAction()),
    filterCities: (filterValue, limit) =>
      dispatch(getCitiesAction(filterValue, limit)),
    getWarehouses: () => dispatch(getWarehousesAction()),
    filterWarehouses: (filterValue) =>
      dispatch(getWarehousesAction(filterValue)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrder);
