import React, { useState, useEffect } from "react";
import s from "./Admin.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BreadCrumbs from "../../misc/BreadCrumbs/BreadCrumbs";
import { faHome, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
import { TabList, Tabs, Tab, TabPanel } from "react-tabs";
import OrderCard from "../../misc/Admin/OrderCard/OrderCard";
import { Link } from "react-router-dom";
import Cart from "../Cart/Cart";
import { connect } from "react-redux";
import NewsAdminCard from "../../misc/Admin/NewsAdminCard/NewsAdminCard";
import ProductCardAdmin from "../../misc/Admin/ProductCardAdmin/ProductCardAdmin";
import Button from "../../misc/Button/Button";
import {
  getProductsByPage,
  filterProductsAction,
} from "../../store/actions/productsActions";
import ProductCard from "../../misc/ProductCard/ProductCard";
import UserCard from "../../misc/Admin/UserCard/UserCard";
import OrderProductCard from "../../misc/OrderProductCard/OrderProductCard";
import {
  addToCartAction,
  removeFromCartAction,
  setFullPriceAction,
} from "../../store/actions/cartActions";
import { getUserByIdAction } from "../../store/actions/profileActions";

const Admin = ({ recentNews, cartProducts, allProducts, _id, getUser }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const breadCrumbsItems = [
    {
      name: "Головна",
      path: "/",
      icon: <FontAwesomeIcon icon={faHome} />,
    },
    { name: "Адмін", path: "/admin" },
  ];
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
            <div className={s.order__header}>
              <span>Номер замовлення</span>
              <span>Дата створення</span>
              <span>Статус</span>
              <span>Спосіб оплати</span>
              <span>Спосіб доставки</span>
              <span>Загальна сума</span>
            </div>
            <Link to="/admin/edit-order/:id">
              <OrderCard />
            </Link>
            <OrderCard />
            <OrderCard />
            <OrderCard />
            <OrderCard />
          </TabPanel>
          <TabPanel>
            {/* <div className={s.order__header}>
              <span>Назва</span>
              <span>Опис</span>
              <span>Артикул</span>
              <span>Категорія</span>
              <span>Кількість</span>
              <span>Ціна</span>
            </div> */}
            <div className={s.products__container}>
              {allProducts.map((product, i) => (
                <Link to={`/admin/edit-product/${_id}`}>
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
          <TabPanel></TabPanel>
          <TabPanel>1231</TabPanel>
          <TabPanel>123</TabPanel>
          <TabPanel>
            <div className={s.order__header}>
              <span>Ім'я</span>
              <span>Прізвище</span>
              <span>Пошта</span>
              <span>Номер телефону</span>
              <span>Кількість замовлень</span>
            </div>
            <div className={s.create__container}>
              <Link to="/admin/edit-user">
                <Button
                  title="Створити користувача"
                  className={s.create__btn}
                />
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
              <Link to="/admin/edit-news/:id">
                <Button title="Створити новину" className={s.create__btn} />
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
    // fullPrice: state.cart.fullPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product) => dispatch(addToCartAction(product)),
    removeFromCart: (product) => dispatch(removeFromCartAction(product)),
    getUser: (id, redirect) => dispatch(getUserByIdAction(id, redirect)),
    // setFullPrice: (fullPrice) => dispatch(setFullPriceAction(fullPrice)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
