import React, { useEffect, useState } from "react";
import s from "./SingleProduct.module.css";
import { connect } from "react-redux";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
import { getSingleProduct } from "../../store/actions/singleProductActions";
import ItemsCarousel from "../../wrappers/ItemsCarousel/ItemsCarousel";
import uuid from "react-uuid";

const SingleProduct = ({ match, getProduct, product = {} }) => {
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
  } = product || {};

  const [filteredAttributes, setFilteredAttributes] = useState({});

  useEffect(() => {
    getProduct(match.params.id);
  }, []);

  useEffect(() => {
    console.log(product);
    const tempObj = {
      color: "color",
      priceAttr: "priceAttr",
      розмір: "розмір",
    };

    if (attributes) {
      const filteredObject = {};
      Object.values(tempObj).forEach((possibleAttribute, i) => {
        const fil = attributes.map(
          (attributesObj, i) => attributesObj[possibleAttribute]
        );
        const map = Array.from(new Set(fil));
        filteredObject[possibleAttribute] = { all: map, active: null };
      });
      setFilteredAttributes(filteredObject);
    }
  }, [product]);

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
                {product.gallery.map((img, i) => (
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
              <h2 className={s.price}>{`${price} ₴`}</h2>
              <p className={s.desc}>{desc.slice(0, 400)}</p>
              <div className={s.attributes__wrapper}>
                {Object.entries(filteredAttributes).map((attributesObj) => {
                  console.log(attributesObj);

                  return (
                    // <div key={i}></div>
                    <div className={s.attribute__container} key={uuid()}>
                      <span className={s.attribute__label}>
                        {attributesObj[0]}
                      </span>
                      <div className={s.attribute__body}>
                        {attributesObj[1].all.map((attribute) => (
                          <span className={s.attribute} key={uuid()}>
                            {attribute}
                          </span>
                        ))}
                      </div>
                      {/* <p className={s.attribute}>{vendorID}</p> */}
                    </div>
                  );
                })}
                <div className={s.attribute__container}>
                  <span className={s.attribute__label}>Країна виробника:</span>
                  <p className={s.attribute}>{vendorID}</p>
                </div>
                <div className={s.attribute__container}>
                  <span className={s.attribute__label}>Категорія:</span>
                  <p className={s.attribute}>{categoryID}</p>
                </div>
                <div className={s.attribute__container}>
                  <span className={s.attribute__label}>Кількість:</span>
                  <p className={`${s.attribute} ${qtyClassName}`}>
                    {qtyMessage}
                  </p>
                </div>
              </div>
            </div>
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
