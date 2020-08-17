import React, { useState, useRef, useEffect, useMemo } from "react";
import s from "./CreateOrder.module.css";
import { connect } from "react-redux";
import Select from "../../../../misc/Select/Select";
import Input from "../../../../misc/Inputs/Input/Input";
import FixedWrapper from "../../../../wrappers/FixedWrapper/FixedWrapper";
import Button from "../../../../misc/Button/Button";
import {
  getProductsByPage,
  filterProductsAction,
  getProducts,
} from "../../../../store/actions/productsActions";
import BreadCrumbs from "../../../../misc/BreadCrumbs/BreadCrumbs";
import { Formik, withFormik } from "formik";
import CartProduct from "../../../../misc/CartProductCard/CartProduct";
import {
  getUsersAction,
  filterUsersAction,
} from "../../../../store/actions/adminActions";
import { getUserByIdAction } from "../../../../store/actions/profileActions";
import {
  getCitiesAction,
  getWarehousesAction,
  setSelectedCityAction,
  setSelectedWarehouseAction,
} from "../../../../store/actions/orderActions";

const CreateOrder = ({
  values,
  handleChange,
  setValues,
  products,
  filterProducts,
  getUsers,
  users,
  filterUsers,
  getCities,
  getWarehouses,
  cities,
  filterCities,
  setSelectedWarehouse,
  setSelectedCity,
  warehouses,
  filterWarehouses,
  selectedWarehouse,
  selectedCity,
  filteredUsers,
  getProducts,
}) => {
  const [activePage, setActivePage] = useState(1);

  const payOptions = [
    { value: "cash", label: "Наложений платіж" },
    { value: "card", label: "Картою" },
  ];

  const deliveryOptions = [
    { value: "self-pickup", label: "Самовивіз" },
    { value: "np", label: "Нова пошта" },
    { value: "up", label: "Укр пошта" },
  ];

  const breadCrumbsItems = [
    {
      name: "Адмін",
      path: "/admin",
    },
    { name: "Створити замовлення", path: "/admin/create-order" },
  ];

  console.log("products ===", products);

  const onProductsMenuScroll = ({ target }) => {
    console.log("target ===", target);
  };

  const onProductSearchChange = (searchValue) => {
    console.log("search ===", searchValue);
    if (searchValue) {
      filterProducts(null, searchValue);
    }
  };

  const onProductSelect = (option, formValues, setFormValues) => {
    setFormValues({
      ...formValues,
      products: [...formValues.products, option.value],
    });
  };

  const onUserSelect = (option, formValues, setFormValues) => {
    setFormValues({ ...formValues, user: option.value });
  };

  const onUsersSearchChange = (searchValue) => {
    filterUsers(searchValue, users);
  };

  const onCitiesScroll = ({ target }, searchValue) => {
    if (
      target.scrollHeight - target.scrollTop < 400 &&
      cities.length % 20 === 0
    ) {
      filterCities(searchValue, cities.length + 20);
    }
  };

  const onCitySearchChange = (value) => {
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

  const usersOptions = useMemo(() => {
    return filteredUsers.map((user) => ({
      label: `${user.fName} ${user.lName} ${user.phone}`,
      value: user,
    }));
  }, [filteredUsers]);

  const productsOptions = useMemo(() => {
    return products.map((product) => ({
      label: product.title,
      value: product,
    }));
  }, [products]);

  console.log("users ===", users);

  useEffect(() => {
    getUsers();
    getProducts();
  }, []);

  return (
    <div className={s.container}>
      <div className={s.title__container}>
        <h1 className={s.title}>Створення замовлення</h1>
        <BreadCrumbs items={breadCrumbsItems} />
      </div>
      <FixedWrapper>
        {values.products.map((product) => (
          <CartProduct
            className={s.product}
            {...{ product }}
            key={product._id}
            isSmall
          />
        ))}
        <div className={s.body}>
          <Select
            noDefaultValue
            withSearch
            label="Додати товар"
            onSelect={(option) => {
              return onProductSelect(option, values, setValues);
            }}
            onSearchValueChange={onProductSearchChange}
            onMenuScroll={onProductsMenuScroll}
            options={productsOptions}
          />
          <Select
            noDefaultValue
            withSearch
            containerClass={s.input__container}
            label="Оберіть користувача"
            onSelect={(option) => onUserSelect(option, values, setValues)}
            onSearchValueChange={onUsersSearchChange}
            onMenuScroll={onProductsMenuScroll}
            options={usersOptions}
          />
          <div className={s.input__row}>
            <Input
              name="fName"
              inputClass={s.input}
              containerClass={s.input__container}
              value={values.user.fName}
              onChange={({ target }) => {
                return setValues({
                  ...values,
                  user: { ...values.user, fName: target.value },
                });
              }}
              label="Ім'я"
              placeholder="John"
            />
            <Input
              placeholder="Doe"
              name="lName"
              inputClass={s.input}
              containerClass={s.input__container}
              value={values.user.lName}
              onChange={({ target }) => {
                return setValues({
                  ...values,
                  user: { ...values.user, lName: target.value },
                });
              }}
              label="Прізвище"
            />
          </div>
          <div className={s.input__row}>
            <Input
              name="phone"
              inputClass={s.input}
              containerClass={s.input__container}
              value={values.user.phone}
              onChange={({ target }) => {
                return setValues({
                  ...values,
                  user: { ...values.user, phone: target.value },
                });
              }}
              label="Номер телефону"
              placeholder="0681231231"
            />
            <Input
              placeholder="example@gmail.com"
              name="email"
              inputClass={s.input}
              containerClass={s.input__container}
              value={values.user.email}
              onChange={({ target }) => {
                return setValues({
                  ...values,
                  user: { ...values.user, email: target.value },
                });
              }}
              label="Електронна пошта"
            />
          </div>
          <Select
            noDefaultValue
            containerClass={s.input__container}
            options={payOptions}
            onSelect={(option) => {
              return setValues({ ...values, paymentType: option });
            }}
            label="Тип оплати"
            value={values.paymentType.label}
          />
          <Select
            noDefaultValue
            containerClass={s.input__container}
            options={deliveryOptions}
            onSelect={(option) => {
              return setValues({ ...values, deliveryType: option });
            }}
            label="Тип доставки"
            value={values.deliveryType.label}
          />
          <Select
            containerClass={s.input__container}
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
            containerClass={s.input__container}
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
          <Input
            name="price"
            placeholder="10"
            label="Ціна"
            value={values.price}
            containerClass={s.input__container}
            onChange={handleChange}
          />
          <div className={s.submit__container}>
            <Button
              isDisabled={!values.user || !values.products.length}
              title="Створити"
              size="lg"
            />
          </div>
        </div>
      </FixedWrapper>
    </div>
  );
};

const formikHOC = withFormik({
  mapPropsToValues: () => ({
    price: "",
    products: [],
    user: {},
    paymentType: {},
    deliveryType: {},
    fName: "",
    sName: "",
  }),
})(CreateOrder);

const mapStateToProps = (state) => {
  return {
    products: state.products.filtered,
    users: state.admin.users,
    filteredUsers: state.admin.filteredUsers,
    cities: state.order.cities,
    warehouses: state.order.warehouses,
    selectedWarehouse: state.order.selectedWarehouse,
    selectedCity: state.order.selectedCity,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductsByPage: (page) => dispatch(getProductsByPage(page)),
    filterProducts: (categoryId, searchValue) =>
      dispatch(filterProductsAction(categoryId, searchValue)),
    getUser: (id, redirect) => dispatch(getUserByIdAction(id, redirect)),
    getUsers: () => dispatch(getUsersAction()),

    filterUsers: (searchValue, users) =>
      dispatch(filterUsersAction(searchValue, users)),
    getCities: () => dispatch(getCitiesAction()),
    filterCities: (filterValue, limit) =>
      dispatch(getCitiesAction(filterValue, limit)),
    getWarehouses: (city) => dispatch(getWarehousesAction(city)),
    filterWarehouses: (filterValue) =>
      dispatch(getWarehousesAction(filterValue)),
    setSelectedCity: (city) => dispatch(setSelectedCityAction(city)),
    setSelectedWarehouse: (warehouse) =>
      dispatch(setSelectedWarehouseAction(warehouse)),
    getProducts: () => dispatch(getProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
