import React, { useState, useRef, useEffect } from "react";
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

const CreateOrder = ({ products, filterProducts }) => {
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

  return (
    <div className={s.container}>
      <div className={s.title__container}>
        <h1 className={s.title}>Створення замовлення</h1>
        <BreadCrumbs items={breadCrumbsItems} />
      </div>
      <FixedWrapper>
        <Formik initialValues={{ price: "", products: [], user: {} }}>
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
                  options={products.map((product) => ({
                    label: product.title,
                    value: product,
                  }))}
                />
                <Select
                  noDefaultValue
                  withSearch
                  containerClass={s.input__container}
                  label="Оберіть користувача"
                  onSelect={(option) =>
                    onProductSelect(option, values, setValues)
                  }
                  onSearchValueChange={onProductSearchChange}
                  onMenuScroll={onProductsMenuScroll}
                  options={products.map((product) => ({
                    label: product.title,
                    value: product,
                  }))}
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
                  <Button title="Створити" size="lg" />
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
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getProductsByPage: (page) => dispatch(getProductsByPage(page)),
    filterProducts: (categoryId, searchValue) =>
      dispatch(filterProductsAction(categoryId, searchValue)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrder);
