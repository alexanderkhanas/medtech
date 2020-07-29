import React, { useState } from "react";
import s from "./Admin.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BreadCrumbs from "../../misc/BreadCrumbs/BreadCrumbs";
import { faHome, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
import { TabList, Tabs, Tab, TabPanel } from "react-tabs";
import OrderCart from "../../misc/OrderCart/OrderCart";
import { Link } from "react-router-dom";
import Cart from "../Cart/Cart";
import NewsCard from "../../misc/NewsCard/NewsCard";
import { connect } from "react-redux";

const Admin = ({ recentNews }) => {
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
    <div>
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
              "Купони",
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
            <Link to="/edit-order/:id">
              <OrderCart />
            </Link>
            <OrderCart />
            <OrderCart />
            <OrderCart />
            <OrderCart />
          </TabPanel>
          <TabPanel>123</TabPanel>
          <TabPanel>123</TabPanel>
          <TabPanel>123</TabPanel>
          <TabPanel>123</TabPanel>
          <TabPanel>123</TabPanel>
          <TabPanel>123</TabPanel>
          <TabPanel>
            <div className={s.section}>
              <div className={s.news__container}>
                {recentNews.map((newsItem, i) => (
                  <NewsCard {...{ newsItem }} key={newsItem._id} />
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
    recentNews: state.news.recent,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
