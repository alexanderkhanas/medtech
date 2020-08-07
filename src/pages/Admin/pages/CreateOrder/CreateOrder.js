import React, { useState, useRef, useEffect, useMemo } from "react";
import s from "./CreateOrder.module.css";
import { connect } from "react-redux";
import Select from "../../../../misc/Select/Select";
import Input from "../../../../misc/Inputs/Input/Input";
import FixedWrapper from "../../../../wrappers/FixedWrapper/FixedWrapper";
import ProfileInput from "../../../../misc/Inputs/ProfileInput/ProfileInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../../misc/Button/Button";
import {
  getProductsByPage,
  filterProductsAction,
} from "../../../../store/actions/productsActions";
import BreadCrumbs from "../../../../misc/BreadCrumbs/BreadCrumbs";
import { Formik } from "formik";
import OrderProductCard from "../../../../misc/OrderProductCard/OrderProductCard";
import CartProduct from "../../../../misc/CartProductCard/CartProduct";
import {
  getUsersAction,
  filterUsersAction,
} from "../../../../store/actions/adminActions";
import { getUserByIdAction } from "../../../../store/actions/profileActions";

const CreateOrder = ({
  products,
  filterProducts,
  getUsers,
  users,
  filterUsers,
  filteredUsers,
}) => {
  const [activePage, setActivePage] = useState(1);

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
  }, []);

  return (
    <div className={s.container}>
      <div className={s.title__container}>
        <h1 className={s.title}>Створення замовлення</h1>
        <BreadCrumbs items={breadCrumbsItems} />
      </div>
      <FixedWrapper>
        <Formik initialValues={{ price: "", products: [], user: null }}>
          {({ values, handleChange, setValues }) => (
            <>
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
                  onSelect={(option) =>
                    onProductSelect(option, values, setValues)
                  }
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
            </>
          )}
        </Formik>
      </FixedWrapper>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products.filtered,
    users: state.admin.users,
    filteredUsers: state.admin.filteredUsers,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrder);
