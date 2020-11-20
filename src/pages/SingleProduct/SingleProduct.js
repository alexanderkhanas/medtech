import React, { useEffect, useState, useRef, useMemo } from "react";
import s from "./SingleProduct.module.css";
import { connect } from "react-redux";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
import {
  getSingleProductAction,
  clearSingleProductAction,
} from "../../store/actions/singleProductActions";
import ItemsCarousel from "../../wrappers/ItemsCarousel/ItemsCarousel";
import ProductAttribute from "../../misc/ProductAttribute/ProductAttribute";
import WishlistButton from "../../misc/WishlistButton/WishlistButton";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import Stars from "../../misc/Stars/Stars";
import Button from "../../misc/Button/Button";
import {
  addToCartAction,
  removeFromCartAction,
} from "../../store/actions/cartActions";
import classnames from "classnames";
import { scrollToRef, isEqual } from "../../utils/utils";
import {
  showAlertAction,
  hideAlertAction,
} from "../../store/actions/alertActions";
import { Formik } from "formik";
import Input from "../../misc/Inputs/Input/Input";
import { createReviewAction } from "../../store/actions/productsActions";
import { ReactComponent as PencilAlt } from "../../assets/pencil-alt.svg";
import GoTopButton from "../../misc/GoTopButton/GoTopButton";

const SingleProduct = ({
  match,
  getProduct,
  product = {},
  cartProducts,
  addToCart,
  removeFromCart,
  showAlert,
  clearProduct,
  user,
  createReview,
}) => {
  //state
  const {
    price,
    title,
    gallery,
    desc,
    vendorID,
    categoryID,
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
  const [foundAttributes, setFoundAttributes] = useState({});

  const mainContentRef = useRef();
  const attributesRef = useRef();

  const isPriceChanges = useMemo(() => {
    return !!attributeOptions?.filter((option) => !!option.priceAttr).length;
  }, [attributeOptions]);

  const productAlreadyOrdered = useMemo(() => {
    let isOrdered = false;
    user.orders.forEach((order) => {
      order.products.forEach((product) => {
        if (product.id === _id) {
          isOrdered = true;
        }
      });
    });
    return isOrdered;
  }, [user.orders, product]);

  //functions

  const selectAttribute = (name, value) => {
    setSelectedAttributes((prev) => ({ ...prev, [name]: value }));
  };

  const onCartButtonClick = () => {
    if (!foundAttributes._id && attributes.length) {
      showAlert("Перед додаванням у корзину оберіть атрибути");
      if (window.innerWidth <= 575) {
        scrollToRef(attributesRef, -120);
      }
      return;
    }
    if (isInCart) {
      removeFromCart(product);
    } else if (quantity >= 1) {
      addToCart(product, foundAttributes);
    }
    if (quantity === 0) {
      showAlert("Немає в наявності");
    }
  };

  const scrollToDescription = () => {
    scrollToRef(mainContentRef);
    setActiveTabIndex(0);
  };

  //effects
  useEffect(() => {
    getProduct(match.params.id);
    return () => {
      document.title = "Медтехніка";
      clearProduct();
    };
  }, []);

  useEffect(() => {
    const productFromCart = cartProducts.filter(
      (cartProduct) => cartProduct._id === _id
    )[0];

    setInCart(!!productFromCart);
  }, [cartProducts, _id]);

  useEffect(() => {
    if (attributes?.length) {
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
      if (isPriceChanges) {
        setPriceInfo({
          string: `Від ${minimumPrice || price}₴`,
          value: null,
        });
      }
      setFilteredAttributes(filteredObject);
    }
    if (_id) {
      document.title = title;
    }
  }, [product]);

  useEffect(() => {
    if (attributeOptions?.length) {
      const attributeFound = attributeOptions.find((attributeObj) =>
        isEqual(
          { ...attributeObj, priceAttr: null, _id: null },
          { ...selectedAttributes, priceAttr: null, _id: null }
        )
      );

      if (attributeFound && isPriceChanges) {
        setPriceInfo({
          value: attributeFound.priceAttr,
          string: `${attributeFound.priceAttr}₴`,
        });
      }
      setFoundAttributes(attributeFound || {});
    }
  }, [selectedAttributes]);

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
            <WishlistButton {...{ product }} className={s.wishlist__button} />
            <ItemsCarousel arrows={false} dots slidesPerPage={1}>
              {gallery?.length ? (
                gallery.map((img, i) => (
                  <img
                    className={s.main__image}
                    key={img + i}
                    src={img || require("../../assets/image-placeholder.webp")}
                    alt="loading"
                  />
                ))
              ) : (
                <img
                  src={require("../../assets/image-placeholder.webp")}
                  className={s.main__image}
                  alt="loading"
                />
              )}
            </ItemsCarousel>
          </div>
          <div className={s.desktop__info__container}>
            <h1 className={s.title}>{title}</h1>
            <div className={s.price__container}>
              <h2 className={s.price}>{priceInfo.string || `${price}₴`}</h2>
              <div className={s.button__container}>
                <Button
                  title={
                    isInCart && quantity > 0 ? "В кошику" : "Додати в кошик"
                  }
                  isDisabled={quantity === 0}
                  className={classnames({
                    [s.active__cart__button]: isInCart,
                  })}
                  onClick={onCartButtonClick}
                />
              </div>
            </div>
            <p className={s.desc}>
              {desc && desc.slice(0, 300)}
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
              {!!vendorID?.title && (
                <ProductAttribute
                  name="Країна виробника"
                  values={[vendorID?.title]}
                />
              )}
              {!!categoryID?.title && (
                <ProductAttribute
                  name="Категорія"
                  values={[categoryID?.title]}
                />
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
                    className={classnames(s.tab, {
                      [s.active__tab]: activeTabIndex === i,
                    })}
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
              {reviews &&
                reviews.map(
                  (
                    {
                      userID: reviewUserID,
                      _id: reviewId,
                      title: reviewTitle,
                      desc: reviewDesc,
                      rating,
                    },
                    i
                  ) => (
                    <div key={reviewId} className={s.review}>
                      <div className={s.review__header}>
                        <h4 className={s.review__admin}>
                          {reviewUserID.fName}
                        </h4>

                        <Stars value={rating} />
                      </div>
                      <h5 className={s.review__title}>{reviewTitle}</h5>

                      <p className={s.review__desc}>{reviewDesc}</p>
                    </div>
                  )
                )}
              {productAlreadyOrdered && (
                <Formik
                  initialValues={{
                    desc: "",
                    title: "",
                    rating: 5,
                  }}
                  onSubmit={async (values, { resetForm }) => {
                    const reviewToSubmit = {
                      ...values,
                      productID: _id,
                      userID: user._id,
                    };
                    const isSuccess = await createReview(reviewToSubmit);
                    if (isSuccess) {
                      showAlert("Відгук створено успішно!", "success");
                      resetForm({ desc: "", title: "", rating: 5 });
                    } else {
                      showAlert("Сталась помилка при створенні відгука.");
                    }
                  }}
                >
                  {({ handleChange, handleSubmit, values, setValues }) => (
                    <form className={s.review__form}>
                      <div className={s.review__form__inner}>
                        <h1 className={s.review__form__title}>
                          Залишіть відгук
                        </h1>
                        <Input
                          label="Заголовок"
                          name="title"
                          placeholder="Інгалятором задоволений"
                          containerClass={s.review__input__container}
                          onChange={handleChange}
                        />
                        <Input
                          label="Опишіть ваші враження"
                          name="desc"
                          isTextarea
                          placeholder="Все сподобалось, інгалятор підійшов чудово!"
                          containerClass={s.review__input__container}
                          inputClass={s.review__textarea}
                          onChange={handleChange}
                        />
                        <Stars
                          value={values.rating}
                          isStatic={false}
                          setValue={(rating) => {
                            setValues({ ...values, rating });
                          }}
                        />
                        {/* <Button size="lg" title="Залишити відгук" /> */}
                        <button
                          className={s.save__profile__btn}
                          onClick={handleSubmit}
                        >
                          Залишити
                          <span className={s.profile__btn__overlay}>
                            <PencilAlt
                              className={s.profile__btn__overlay__icon}
                            />
                          </span>
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              )}
            </TabPanel>
            <TabPanel className={s.tab__content}>
              <p className={s.desc}>
                Замовлення товарів: Для Вашої зручності інтернет-магазин
                "Медтехніка" передбачив два способи замовлення товарів: на САЙТІ
                – 24 години на добу, 7 днів на тиждень знайдіть виріб, який Вас
                цікавить, додайте його в кошик своїх покупок і пройдіть за
                посиланням Кошик для оформлення замовлення; за ТЕЛЕФОНОМ, 7 днів
                на тиждень із 8.00 до 20.00 знайдіть виріб, який Вас цікавить, і
                обов'язково зв'яжіться з нами за номерам: +380 (96) 915 61 45
                для оформлення замовлення. Оплата замовлення Для Вашої зручності
                інтернет-магазин "Рідні Медтехніка" передбачив кілька способів
                оплати виробу, який Ви вибрали: У нашому магазині "Медтехніка" -
                У Тернополі (вулиця Гуго Коллонтая 2) Банківським переказом (за
                фактом оформлення замовлення) під час оформлення замовлення з
                будь-якого міста України Ви можете оплатити товар, який Ви
                замовили, через LiqPay або банківським переказом. Квитанцію з
                нашими реквізитами можна роздрукувати після оформлення
                замовлення на сайті.
              </p>
            </TabPanel>
          </Tabs>
        </div>
      </div>

      <GoTopButton />
      <div>
        <div itemType="http://schema.org/Product" itemScope>
          <meta itemProp="name" content={title} />
          <link itemProp="image" href={!!gallery && gallery[0]} />
          <link itemProp="image" href={!!gallery && gallery[1]} />
          <link itemProp="image" href={!!gallery && gallery[2]} />
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
              <meta itemProp="name" content={vendorID?.title} />
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
                (reviews &&
                  reviews.reduce((prev, curr) => prev + curr.rating, 0) /
                    reviews.length) ||
                5
              }
            />
          </div>
          <div itemProp="review" itemType="http://schema.org/Review" itemScope>
            <div
              itemProp="author"
              itemType="http://schema.org/Person"
              itemScope
            >
              <meta
                itemProp="name"
                content={reviews && reviews[0]?.userID?.fName}
              />
            </div>
            <div
              itemProp="reviewRating"
              itemType="http://schema.org/Rating"
              itemScope
            >
              <meta
                itemProp="ratingValue"
                content={reviews && reviews[0]?.rating}
              />
              <meta
                itemProp="bestRating"
                content={Math.max(
                  reviews && reviews.map((review) => review.rating)
                )}
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
    popularProducts: state.products.popular,
    user: state.profile,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getProduct: (id) => dispatch(getSingleProductAction(id)),
    clearProduct: () => dispatch(clearSingleProductAction()),
    addToCart: (product, attributes) =>
      dispatch(addToCartAction(product, attributes)),
    removeFromCart: (product) => dispatch(removeFromCartAction(product)),
    showAlert: (content, type) => dispatch(showAlertAction(content, type)),
    hideAlert: () => dispatch(hideAlertAction()),
    createReview: (review) => dispatch(createReviewAction(review)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
