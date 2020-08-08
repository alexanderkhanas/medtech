import React, { useState, useEffect, useMemo } from "react";
import s from "./Admin.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BreadCrumbs from "../../misc/BreadCrumbs/BreadCrumbs";
import { faHome, faPencilAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
import { TabList, Tabs, Tab, TabPanel } from "react-tabs";
import OrderCard from "../../misc/Admin/OrderCard/OrderCard";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import NewsAdminCard from "../../misc/Admin/NewsAdminCard/NewsAdminCard";
import Button from "../../misc/Button/Button";
import UserCard from "../../misc/Admin/UserCard/UserCard";
import OrderProductCard from "../../misc/OrderProductCard/OrderProductCard";
import {
  addToCartAction,
  removeFromCartAction,
} from "../../store/actions/cartActions";
import Input from "../../misc/Inputs/Input/Input";
import { Formik } from "formik";
import Select from "../../misc/Select/Select";
import EditSeller from "../../misc/Admin/EditSeller/EditSeller";

const Admin = ({ recentNews, allProducts, categories, getUsers }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const breadCrumbsItems = [
    {
      name: "Головна",
      path: "/",
      icon: <FontAwesomeIcon icon={faHome} />,
    },
    { name: "Адмін", path: "/admin" },
  ];

  console.log("categories ===", categories);

  return (
    <div className={s.container}>
      <div className={s.title__container}>
        <h4 className={s.title}>Адмін</h4>
        <BreadCrumbs items={breadCrumbsItems} />
      </div>
      <FixedWrapper>
        <Tabs>
          <TabList className={s.tabs}>
            {[
              "Замовлення",
              "Товари",
              "Категорії",
              "Атрибути",
              "Продавці",
              "Користувачі",
              "Новини",
              "Контактна форма",
            ].map((item, i) => (
              <Tab
                onClick={() => setActiveTabIndex(i)}
                key={i}
                className={
                  activeTabIndex === i ? `${s.tab} ${s.tab__active}` : s.tab
                }
              >
                {item}
              </Tab>
            ))}
          </TabList>
          <TabPanel>
            <Link to="/admin/create-order">
              <Button className={s.add__button} title="Створити замовлення">
                <FontAwesomeIcon icon={faPlus} className={s.add__more__icon} />
              </Button>
            </Link>
            <div className={s.order__header}>
              <span>Номер замовлення</span>
              <span>Дата створення</span>
              <span>Статус</span>
              <span>Спосіб оплати</span>
              <span>Спосіб доставки</span>
              <span>Загальна сума</span>
            </div>
            <Link to="/admin/edit-order/:id">
              <OrderCard
                orderNumber="qweqweqw"
                createDate="14.123"
                status="asdads"
                delivery="asd"
                orderSum="asdasd"
                paymentType="65491"
              />
            </Link>
            <OrderCard />
            <OrderCard />
            <OrderCard />
            <OrderCard />
          </TabPanel>
          <TabPanel>
            <Link to="/admin/create-product">
              <Button title="Додати товар">
                <FontAwesomeIcon icon={faPlus} className={s.add__more__icon} />
              </Button>
            </Link>
            <div className={s.products__container}>
              {allProducts.map((product) => (
                <Link
                  key={product._id}
                  to={`/admin/edit-product/${product._id}`}
                >
                  <OrderProductCard
                    isSmall
                    {...{ product }}
                    key={product._id}
                    className={s.container__}
                  />
                </Link>
              ))}
              <div className={s.subtotal__container}>
                <div className={s.subtotal__title}>Ціна:</div>
                {/* <div className={s.subtotal__price}>{`${fullPrice || 0} ₴`}</div> */}
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <Formik
              initialValues={{
                name: "",
                parentCategory: null,
                parentCategoryLabel: null,
              }}
              onSubmit={({ name, parentCategory }) => {
                const categoryToSubmit = {
                  parent: [
                    {
                      title: parentCategory.title,
                      _id: parentCategory._id,
                    },
                  ],
                  sub: [],
                  title: name,
                };
                if (parentCategory.parent?.length) {
                  categoryToSubmit.parent = parentCategory.parent;
                  categoryToSubmit.sub = [
                    { title: parentCategory.title, _id: parentCategory._id },
                  ];
                }
                console.log("name ===", name);
                console.log("parentCategory ===", parentCategory);
                console.log("categoryToSubmit ===", categoryToSubmit);
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                setValues,
              }) => {
                console.log("example category ===", categories[1]);

                console.log("values ===", values);

                return (
                  <div>
                    <div className={s.add__category__container}>
                      <Input
                        name="name"
                        label="Назва категорії"
                        placeholder="Інгалятори"
                        value={values.name}
                        containerClass={s.add__category__input__container}
                        inputClass={s.add__category__input}
                        onChange={handleChange}
                        onBlur={handleSubmit}
                      />
                      <Select
                        label="Назва батьківської категорії"
                        containerClass={s.add__category__select__container}
                        // withSearch
                        // noDefaultValue
                        value={values.parentCategoryLabel}
                        onSelect={(selectedOption) => {
                          setValues({
                            ...values,
                            parentCategory: selectedOption.value,
                            parentCategoryLabel: selectedOption.label,
                          });
                          console.log("value ===", selectedOption);
                        }}
                        options={categories
                          .filter(({ sub }) => !sub.length)
                          .map(({ title, parent, _id }) => {
                            const isParentVisible = parent.length;
                            return {
                              label: `${title}${
                                isParentVisible
                                  ? `, батьківська категорія - ${parent[0].title}`
                                  : ""
                              }`,
                              value: {
                                title,
                                _id,
                                parent,
                              },
                            };
                          })}
                      />
                    </div>
                    <Button
                      onClick={handleSubmit}
                      type="submit"
                      className={s.add__button}
                      title="Додати категорію"
                    >
                      <FontAwesomeIcon
                        className={s.add__more__icon}
                        icon={faPlus}
                      />
                    </Button>
                  </div>
                );
              }}
            </Formik>
            <div className={s.order__header}>
              <span>Назва</span>
              <span>Назва батьківської категорії</span>
            </div>

            {categories.map &&
              categories.map((category) => (
                <div className={s.category__container} key={category._id}>
                  <p className={s.category}>{category.title}</p>
                  {!!category.parent.length && !category.sub.length && (
                    <p className={s.category}>{category.parent[0].title}</p>
                  )}
                  {!!category.sub.length && (
                    <p className={s.category}>{category.sub[0].title}</p>
                  )}
                </div>
              ))}
          </TabPanel>
          <TabPanel>123</TabPanel>
          <TabPanel>
            <Formik
              initialValues={{
                name: "",
              }}
              onSubmit={(values) => {}}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                setValues,
              }) => {
                return (
                  <div>
                    <div className={s.seller__container}>
                      <Input
                        name="name"
                        label="Добавити продавця"
                        placeholder="Germany"
                        value={values.name}
                        containerClass={s.add__category__input__container}
                        inputClass={s.add__category__input}
                        onChange={handleChange}
                        onBlur={handleSubmit}
                      />
                    </div>
                    <Button
                      onClick={handleSubmit}
                      className={s.add__button}
                      title="Додати категорію"
                    >
                      <FontAwesomeIcon
                        className={s.add__more__icon}
                        icon={faPlus}
                      />
                    </Button>
                  </div>
                );
              }}
            </Formik>
            <div className={s.order__header}>
              <span>Назва</span>
              <span>Кількість продуктів</span>
            </div>
            <EditSeller />
            <EditSeller />
            <EditSeller />
            <EditSeller />
            <EditSeller />
            <EditSeller />
          </TabPanel>
          <TabPanel>
            <div className={s.order__header}>
              <span>Ім'я</span>
              <span>Прізвище</span>
              <span>Пошта</span>
              <span>Номер телефону</span>
              <span>Кількість замовлень</span>
            </div>
            <div className={s.create__container}>
              <Link to="/admin/create-user">
                <Button title="Створити користувача" className={s.create__btn}>
                  <FontAwesomeIcon
                    icon={faPlus}
                    className={s.add__more__icon}
                  />
                </Button>
              </Link>
            </div>
            {/* {recentNews.map((newsItem, i) => (
              <NewsAdminCard {...{ newsItem }} key={newsItem._id} />
            ))} */}
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
          </TabPanel>
          {/* <TabPanel>123</TabPanel> */}
          <TabPanel>
            <div className={s.order__header}>
              <span>Заголовок</span>
              <span>Текст</span>
              <span>Дата створення</span>
            </div>
            <div className={s.create__container}>
              <Link to="/admin/create-news">
                <Button title="Створити новину" className={s.create__btn}>
                  <FontAwesomeIcon
                    icon={faPlus}
                    className={s.add__more__icon}
                  />
                </Button>
              </Link>
            </div>
            <div className={s.section}>
              {/* <h3 className={s.section__title}>Новини</h3> */}
              <div className={s.news__container}>
                {recentNews.map((newsItem, i) => (
                  <NewsAdminCard {...{ newsItem }} key={newsItem._id} />
                ))}
              </div>
            </div>
          </TabPanel>
          <TabPanel>123</TabPanel>
        </Tabs>
      </FixedWrapper>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    allProducts: state.products.all,
    recentNews: state.news.recent,
    cartProducts: state.cart.all,
    categories: state.products.categories,
    // fullPrice: state.cart.fullPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product) => dispatch(addToCartAction(product)),
    removeFromCart: (product) => dispatch(removeFromCartAction(product)),
    // setFullPrice: (fullPrice) => dispatch(setFullPriceAction(fullPrice)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
