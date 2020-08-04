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
  setSelectedCityAction,
  setSelectedWarehouseAction,
} from "../../store/actions/orderActions";
import OrderProductCard from "../../misc/OrderProductCard/OrderProductCard";

const CreateOrder = ({
  cartProducts,
  fullPrice,
  setFullPrice,
  getCities,
  getWarehouses,
  cities,
  filterCities,
  setSelectedWarehouse,
  setSelectedCity,
  warehouses,
  filterWarehouses,
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

  const onCitiesScroll = ({ target }, searchValue) => {
    if (
      target.scrollHeight - target.scrollTop < 400 &&
      cities.length % 20 === 0
    ) {
      filterCities(searchValue, cities.length + 20);
    }
  };

  const onCitySearchChange = (value) => {
    console.log("value ===", value);
    console.log("cities length ===", cities.length);
    console.log("city description ===", cities[0]?.Description);
    console.log(
      "condition ===",
      cities.length === 1 && value === cities[0].Description
    );

    if (cities.length === 1 && value === cities[0].Description) {
      setSelectedCity(value);
      getWarehouses(value);
    }
    filterCities(value);
  };

  const onCitySelect = (option) => {
    setSelectedCity(option.label);
    getWarehouses(option.label);
  };

  const onWarehousesScroll = ({ target }, searchValue) => {
    if (
      target.scrollHeight - target.scrollTop < 400 &&
      warehouses.length % 20 === 0
    ) {
      filterWarehouses(searchValue, warehouses.length + 20);
    }
  };

  const onWarehouseSearchChange = (value) => {
    // setWarehouseSearchValue(value);
    // if (warehouses.length === 1 && value === warehouses[0].Description) {
    //   setSelectedWarehouse(value);
    // }
    // filterWarehouses(value);
  };

  const onWarehouseSelect = (option) => {
    setSelectedWarehouse(option.label);
  };

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
              <OrderProductCard isSmall {...{ product }} key={product._id} />
            ))}
            <div className={s.subtotal__container}>
              <div className={s.subtotal__title}>Ціна:</div>
              <div className={s.subtotal__price}>{`${fullPrice || 0} ₴`}</div>
            </div>
          </div>
          <div className={s.submit__container_all}>
            <div className={s.submit__container}>
              <div className={s.input__row}>
                <Input
                  name="fName"
                  label="Ім'я"
                  placeholder="John"
                  containerClass={s.input__container}
                />
                <Input
                  placeholder="Doe"
                  name="sName"
                  containerClass={s.input__container}
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
              <Select
                containerClass={s.section}
                withSearch
                noDefaultValue
                onMenuScroll={onCitiesScroll}
                menuClass={s.select__menu}
                options={cities.map((city) => ({
                  value: city.Description,
                  label: city.Description,
                }))}
                onSelect={onCitySelect}
                onSearchValueChange={onCitySearchChange}
                label="Місто"
              />
              <Select
                containerClass={s.section}
                withSearch
                noDefaultValue
                onMenuScroll={onWarehousesScroll}
                menuClass={s.select__menu}
                options={warehouses.map((warehouse) => ({
                  value: warehouse.Description,
                  label: warehouse.Description,
                }))}
                onSelect={onWarehouseSelect}
                onSearchValueChange={onWarehouseSearchChange}
                label="Номер відділення"
              />
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
    warehouses: state.order.warehouses,
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
    getWarehouses: (city) => dispatch(getWarehousesAction(city)),
    filterWarehouses: (filterValue) =>
      dispatch(getWarehousesAction(filterValue)),
    setSelectedCity: (city) => dispatch(setSelectedCityAction(city)),
    setSelectedWarehouse: (warehouse) =>
      dispatch(setSelectedWarehouseAction(warehouse)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrder);
