import React, { useEffect, useState, useRef } from "react";
import s from "./SingleProduct.module.css";
import { connect } from "react-redux";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
import getSingleProductAction from "../../store/actions/singleProductActions";
import ItemsCarousel from "../../wrappers/ItemsCarousel/ItemsCarousel";
import ProductAttribute from "../../misc/ProductAttribute/ProductAttribute";
import lodash from "lodash";
import _axios from "../../store/api/_axios";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import Stars from "../../misc/Stars/Stars";
import Button from "../../misc/Button/Button";
import {
  addToCartAction,
  removeFromCartAction,
} from "../../store/actions/cartActions";
import classnames from "classnames";
import { scrollToRef } from "../../utils/utils";
import {
  showAlertAction,
  hideAlertAction,
} from "../../store/actions/alertActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import ScrollListener from "react-scroll-listener";

const SingleProduct = ({
  match,
  getProduct,
  product = {},
  cartProducts,
  addToCart,
  removeFromCart,
  showAlert,
  hideAlert,
}) => {
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
    _id,
    article,
    attrOptions: attributeOptions,
  } = product || {};

  const [filteredAttributes, setFilteredAttributes] = useState({});
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [priceInfo, setPriceInfo] = useState({ value: null, string: "" });
  const [isInCart, setInCart] = useState(false);
  const [isTopButtonVisible, setTopButtonVisible] = useState(false);
  const [foundAttributes, setFoundAttributes] = useState({});

  const mainContentRef = useRef();
  const attributesRef = useRef();

  //functions
  const scrollTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const selectAttribute = (name, value) => {
    setSelectedAttributes((prev) => ({ ...prev, [name]: value }));
  };

  const onCartButtonClick = () => {
    if (!foundAttributes._id) {
      showAlert("Перед додаванням у корзину оберіть атрибути");
      if (window.innerWidth <= 575) {
        scrollToRef(attributesRef, -120);
      }
      setTimeout(() => {
        hideAlert();
      }, 5000);
      return;
    }
    if (isInCart) {
      removeFromCart(product);
    } else {
      addToCart(product, foundAttributes);
    }
  };

  const scrollToDescription = () => {
    scrollToRef(mainContentRef);
    setActiveTabIndex(0);
  };

  const onScroll = () => {
    const scrollTopValue = window.pageYOffset;
    // itemTranslate = Math.min(0, scrollTop / 3 - 60);
    if (scrollTopValue >= 600) {
      setTopButtonVisible(true);
    } else if (scrollTopValue < 600) {
      setTopButtonVisible(false);
    }
  };

  useEffect(() => {
    console.log("price ===", priceInfo);
  }, [priceInfo]);

  //effects
  useEffect(() => {
    getProduct(match.params.id);
  }, []);

  useEffect(() => {
    const productFromCart = cartProducts.filter(
      (cartProduct) => cartProduct._id === _id
    )[0];

    console.log("iproductFromCart ===", productFromCart);

    setInCart(!!productFromCart);
  }, [cartProducts, _id]);

  useEffect(() => {
    if (attributes) {
      const filteredObject = {};
      let minimumPrice = 0;
      Object.values(attributes).forEach((possibleAttribute, index) => {
        const fil = attributeOptions.map((attributesObj, i) => {
          if (index === 0) {
            if (!minimumPrice || minimumPrice > attributesObj.priceAttr) {
              minimumPrice = attributesObj.priceAttr;
            }
          }
          return attributesObj[possibleAttribute];
        });
        const map = Array.from(new Set(fil));
        filteredObject[possibleAttribute] = { all: map, active: null };
      });
      setPriceInfo({
        string: `Від ${minimumPrice}₴`,
        value: null,
      });
      setFilteredAttributes(filteredObject);
    }
  }, [product]);

  useEffect(() => {
    if (attributeOptions) {
      const attributeFound = attributeOptions.find((attributeObj) =>
        lodash.isEqual(
          { ...attributeObj, priceAttr: null, _id: null },
          { ...selectedAttributes, priceAttr: null, _id: null }
        )
      );
      if (attributeFound) {
        setPriceInfo({
          value: attributeFound.priceAttr,
          string: `${attributeFound.priceAttr}₴`,
        });
      }
      setFoundAttributes(attributeFound || {});
    }
  }, [selectedAttributes]);

  console.log("product ===", product);

  useEffect(() => {
    const scrollListener = new ScrollListener();
    scrollListener.addScrollHandler("1", onScroll);
  }, []);

  //other
  let qtyMessage = "Залишилось мало";
  if (quantity >= 5) {
    qtyMessage = "В наявності";
  } else if (quantity === 0) {
    qtyMessage = "Немає в наявності";
  }

  let qtyClassName = s.lastInStock;
  if (quantity >= 5) {
    qtyClassName = s.inStock;
  } else if (quantity === 0) {
    qtyClassName = s.notInStock;
  }

  return product ? (
    <FixedWrapper>
      <div className={s.container}>
        <div className={s.desktop__container}>
          <div className={s.carousel__container}>
            <ItemsCarousel arrows={false} dots slidesPerPage={1}>
              {[
                "https://i.ibb.co/rxSTJfz/img2.png",
                "https://i.ibb.co/dMsk2PN/img1.png",
                "https://i.ibb.co/kgmN7bf/img3.png",
              ].map((img, i) => (
                <img
                  className={s.main__image}
                  key={img}
                  src={`${img}.png`}
                  alt="loading"
                />
              ))}
            </ItemsCarousel>
          </div>
          <div className={s.desktop__info__container}>
            <h1 className={s.title}>{title}</h1>
            <div className={s.price__container}>
              <h2 className={s.price}>{priceInfo.string || `${price}₴`}</h2>
              <div className={s.button__container}>
                <Button
                  title={isInCart ? "В кошику" : "Додати в кошик"}
                  className={classnames({
                    [s.active__cart__button]: isInCart,
                  })}
                  onClick={onCartButtonClick}
                />
              </div>
            </div>
            <p className={s.desc}>
              {desc.slice(0, 300)}
              <button onClick={scrollToDescription}>Більше</button>
            </p>
            <div className={s.attributes__wrapper} ref={attributesRef}>
              {Object.entries(filteredAttributes).map((attributesObj, i) => {
                const name = attributesObj[0];
                const values = attributesObj[1].all;
                return (
                  <ProductAttribute
                    key={name}
                    isClickable
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
              {!!categoryID && !!categoryID.desc && (
                <ProductAttribute name="Категорія" values={[categoryID.desc]} />
              )}
              <ProductAttribute
                name="Кількість"
                attributeClasses={qtyClassName}
                values={[qtyMessage]}
              />
            </div>
          </div>
        </div>
        <div className={s.full__content} ref={mainContentRef}>
          <Tabs>
            <div className={s.tabs__container}>
              <TabList className={s.tabs}>
                {["Опис товару", "Відгуки", "Доставка"].map((tab, i) => (
                  <Tab
                    onClick={() => setActiveTabIndex(i)}
                    className={
                      activeTabIndex === i ? `${s.tab} ${s.tab__active}` : s.tab
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
              {reviews.map(
                ({ userID, reviewTitle, reviewDesc, reviewrating }, i) => (
                  <div key={i} className={s.review}>
                    <div className={s.review__header}>
                      <h4 className={s.review__admin}>{userID.fName}</h4>

                      <Stars value={reviewrating} />
                    </div>
                    <h5 className={s.review__title}>{reviewTitle}</h5>

                    <p className={s.review__desc}>{reviewDesc}</p>
                  </div>
                )
              )}
            </TabPanel>
            <TabPanel className={s.tab__content}>
              <p className={s.desc}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </TabPanel>
          </Tabs>
        </div>
      </div>

      {isTopButtonVisible && (
        <Button className={s.arrow__button} onClick={scrollTop}>
          <FontAwesomeIcon icon={faArrowUp} className={s.arrow__button__icon} />
        </Button>
      )}
      <div>
        <div itemType="http://schema.org/Product" itemScope>
          <meta itemProp="name" content={title} />
          <link itemProp="image" href={gallery[0]} />
          <link itemProp="image" href={gallery[1]} />
          <link itemProp="image" href={gallery[2]} />
          <meta itemProp="description" content={desc} />
          <div itemProp="offers" itemType="http://schema.org/Offer" itemScope>
            <link itemProp="url" href={window.location.href} />
            <meta itemProp="priceCurrency" content="UAH" />
            <meta itemProp="price" content={price} />
            <div
              itemProp="seller"
              itemType="http://schema.org/Organization"
              itemScope
            >
              <meta itemProp="name" content={vendorID.title} />
            </div>
          </div>
          <div
            itemProp="aggregateRating"
            itemType="http://schema.org/AggregateRating"
            itemScope
          >
            <meta itemProp="reviewCount" content="89" />
            <meta
              itemProp="ratingValue"
              content={
                reviews.reduce((prev, curr) => prev + curr.rating, 0) /
                reviews.length
              }
            />
          </div>
          <div itemProp="review" itemType="http://schema.org/Review" itemScope>
            <div
              itemProp="author"
              itemType="http://schema.org/Person"
              itemScope
            >
              <meta itemProp="name" content={reviews[0].userID.fName} />
            </div>
            <div
              itemProp="reviewRating"
              itemType="http://schema.org/Rating"
              itemScope
            >
              <meta itemProp="ratingValue" content={reviews[0].rating} />
              <meta
                itemProp="bestRating"
                content={Math.max(reviews.map((review) => review.rating))}
              />
            </div>
          </div>
          <meta itemProp="sku" content={article} />
        </div>
      </div>
    </FixedWrapper>
  ) : (
    <div className={s.container} />
  );
};

const mapStateToProps = (state) => {
  return {
    product: state.single.product,
    cartProducts: state.cart.all,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getProduct: (id) => dispatch(getSingleProductAction(id)),
    addToCart: (product, attributes) =>
      dispatch(addToCartAction(product, attributes)),
    removeFromCart: (product) => dispatch(removeFromCartAction(product)),
    showAlert: (text) => dispatch(showAlertAction(text)),
    hideAlert: () => dispatch(hideAlertAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
