import React, { useEffect, useState } from "react";
import s from "./SingleProduct.module.css";
import { connect } from "react-redux";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
import { getSingleProduct } from "../../store/actions/singleProductActions";
import ItemsCarousel from "../../wrappers/ItemsCarousel/ItemsCarousel";
import ProductAttribute from "../../misc/ProductAttribute/ProductAttribute";
import uuid from "react-uuid";
import lodash from "lodash";
import _axios from "../../store/api/_axios";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import Stars from "../../misc/Stars/Stars";

const SingleProduct = ({ match, getProduct, product = {} }) => {
  //state
  const {
    price,
    title,
    gallery,
    desc,
    vendorID,
    categoryID,
    categories,
    quantity,
    attr: attributes,
    reviews,
    attrOptions: attributeOptions,
  } = product || {};

  const [filteredAttributes, setFilteredAttributes] = useState({});
  const [selectedAttributes, setSelectedAttributes] = useState({});

  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [priceInfo, setPriceInfo] = useState({ value: null, string: "" });

  //functions
  const selectAttribute = (name, value) =>
    setSelectedAttributes((prev) => ({ ...prev, [name]: value }));

  //effects
  useEffect(() => {
    getProduct(match.params.id);
  }, []);

  useEffect(() => {
    if (attributes) {
      const filteredObject = {};
      let minimumPrice = 0;
      let maximumPrice = 0;
      Object.values(attributes).forEach((possibleAttribute, index) => {
        const fil = attributeOptions.map((attributesObj, i) => {
          if (index === 0) {
            if (!minimumPrice || minimumPrice > attributesObj.priceAttr) {
              minimumPrice = attributesObj.priceAttr;
            }
            if (!maximumPrice || maximumPrice < attributesObj.priceAttr) {
              maximumPrice = attributesObj.priceAttr;
            }
          }
          return attributesObj[possibleAttribute];
        });
        const map = Array.from(new Set(fil));
        filteredObject[possibleAttribute] = { all: map, active: null };
      });
      setPriceInfo({
        string: `Від ${minimumPrice}₴ до ${maximumPrice}₴`,
        value: null,
      });
      setFilteredAttributes(filteredObject);
    }
  }, [product]);

  useEffect(() => {
    if (attributeOptions) {
      const attributeFound = attributeOptions.find((attributeObj) =>
        lodash.isEqual(
          { ...attributeObj, priceAttr: null },
          { ...selectedAttributes, priceAttr: null }
        )
      );
      if (attributeFound) {
        setPriceInfo({
          value: attributeFound.priceAttr,
          string: `${attributeFound.priceAttr}₴`,
        });
      }
    }
  }, [selectedAttributes]);

  //other
  const qtyMessage =
    quantity >= 5
      ? "В наявності"
      : quantity === 0
      ? "Немає в наявності"
      : "Залишилось мало";
  const qtyClassName =
    quantity >= 5 ? s.inStock : quantity === 0 ? s.notInStock : s.lastInStock;

  return (
    !!product && (
      <FixedWrapper>
        <div className={s.container}>
          <div className={s.desktop__container}>
            <div className={s.carousel__container}>
              <ItemsCarousel arrows={false} dots={true} slidesPerPage={1}>
                {gallery.map((img, i) => (
                  <img
                    className={s.main__image}
                    key={i}
                    src={img}
                    alt="loading"
                  />
                ))}
              </ItemsCarousel>
            </div>
            <div className={s.desktop__info__container}>
              <h1 className={s.title}>{title}</h1>
              <h2 className={s.price}>{priceInfo.string}</h2>
              <p className={s.desc}>{desc.slice(0, 400)}</p>
              <div className={s.attributes__wrapper}>
                {Object.entries(filteredAttributes).map((attributesObj, i) => {
                  const name = attributesObj[0];
                  const values = attributesObj[1].all;
                  return (
                    <ProductAttribute
                      key={i}
                      isClickable={true}
                      {...{ name }}
                      {...{ values }}
                      {...{ selectAttribute }}
                    />
                  );
                })}
                <ProductAttribute
                  name="Країна виробника"
                  values={[vendorID.title]}
                />
                <ProductAttribute name="Категорія" values={[categoryID.desc]} />
                <ProductAttribute
                  name="Кількість"
                  attributeClasses={qtyClassName}
                  values={[qtyMessage]}
                />
              </div>
            </div>
          </div>
          <div className={s.full__content}>
            <Tabs>
              <div className={s.tabs__container}>
                <TabList className={s.tabs}>
                  {["Опис товару", "Відгуки", "Доставка"].map((tab, i) => (
                    <Tab
                      onClick={() => setActiveTabIndex(i)}
                      className={
                        activeTabIndex === i
                          ? `${s.tab} ${s.tab__active}`
                          : s.tab
                      }
                      key={i}
                    >
                      {tab}
                    </Tab>
                  ))}
                </TabList>
              </div>
              <TabPanel className={s.tab__content}>
                <p className={s.desc}>{desc}</p>
              </TabPanel>
              <TabPanel className={s.tab__content}>
                {reviews.map(({ userID, title, desc, rating }, i) => (
                  <div key={i} className={s.review}>
                    <div className={s.review__header}>
                      <h4 className={s.review__admin}>{userID.fName}</h4>

                      <Stars value={rating} />
                    </div>
                    <h5 className={s.review__title}>{title}</h5>

                    <p className={s.review__desc}>{desc}</p>
                  </div>
                ))}
              </TabPanel>
              <TabPanel className={s.tab__content}>
                <p className={s.desc}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </FixedWrapper>
    )
  );
};

const mapStateToProps = (state) => {
  return {
    product: state.single.product,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getProduct: (id) => dispatch(getSingleProduct(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
