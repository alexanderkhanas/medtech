import React, { useState } from "react";
import s from "./CartProduct.module.css";
import { connect } from "react-redux";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Counter from "../Counter/Counter";

const CartProduct = ({ product }) => {
  const { gallery, title, price, _id, desc, quantity = 1 } = product;
  const [qty, setQty] = useState(quantity);
  return (
    <div className={s.card}>
      <div className={s.main}>
        <img className={s.img} src={gallery[0]} alt="loading" />
        <div className={s.main__content}>
          <h4 className={s.title}>{title.slice(0, 15)}</h4>
          <p className={s.category}>{desc.slice(0, 10)}</p>
        </div>
      </div>
      <div className={s.price__wrapper}>
        <span className={s.price}>{price}₴</span>
      </div>
      <div className={s.qty__counter__wrapper}>
        <div className={s.qty__counter}>
          <Counter onChange={setQty} />
        </div>
      </div>
      <div className={s.fullprice__container}>
        <span className={s.fullprice}>{qty * price}₴</span>
      </div>
      <div className={s.remove__icon__wrapper}>
        <FontAwesomeIcon icon={faTimes} className={s.remove__icon} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CartProduct);
