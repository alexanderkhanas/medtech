import React, { useState, useEffect } from "react";
import s from "./AdminOrderProduct.module.css";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Counter from "../../Counter/Counter";
import { Link } from "react-router-dom";
import classnames from "classnames";

const CartProduct = ({
  product,
  selectedAttributeIndex,
  onAttributeSelect,
  onQuantityChange,
  selectedAttributeObj = {},
}) => {
  const { gallery, title, price, _id, desc, attrOptions } = product;
  const { quantity = 1 } = selectedAttributeObj;
  const [selectedAttributePrice, setSelectedAttributePrice] = useState(price);

  const onCounterChange = (value) => {
    onQuantityChange(_id, value);
  };

  useEffect(() => {}, []);

  return (
    <div>
      <div className={classnames(s.card, s.small)}>
        <div className={s.main}>
          <img
            className={s.img}
            src={
              gallery[0] || require("../../../assets/image-placeholder.webp")
            }
            alt="loading"
          />
          <div className={s.main__content}>
            <h4 className={s.title}>{title.slice(0, 15)}</h4>
            <p className={s.category}>{desc.slice(0, 20)}</p>
          </div>
        </div>
        <div className={s.qty__counter__wrapper}>
          <div className={s.qty__counter}>
            <Counter onChange={onCounterChange} initialValue={+quantity} />
          </div>
        </div>
        <div className={s.fullprice__container}>
          <span className={s.fullprice}>
            {+quantity * +selectedAttributePrice || 0}₴
          </span>
        </div>
        <div className={s.mobile}>
          <div className={s.fullprice__container}>
            <span className={s.fullprice}>{+quantity * price || 0}₴</span>
          </div>
          <div className={s.qty__counter}>
            <Counter
              onChange={onCounterChange}
              initialValue={selectedAttributeObj?.quantity}
            />
          </div>
        </div>
      </div>
      <div className={s.attributes}>
        {attrOptions?.map((option, i) => {
          console.log("option ===", option);

          return Object.keys(option).map((key) => {
            return (
              key !== "_id" && (
                <div
                  className={classnames(s.attribute, {
                    [s.active__attribute]: selectedAttributeIndex === `${i}`,
                  })}
                  onClick={() => {
                    onAttributeSelect(product._id, i);
                    if (option.priceAttr) {
                      setSelectedAttributePrice(option.priceAttr);
                    }
                  }}
                >
                  <span>{key}:</span>
                  <p>{option[key]}</p>
                </div>
              )
            );
          });
        })}
      </div>
    </div>
  );
};

export default CartProduct;
