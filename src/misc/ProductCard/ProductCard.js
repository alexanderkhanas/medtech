import React from "react";
import s from "./ProductCard.module.css";

const ProductCard = ({ product }) => {
  const { gallery, title, price } = product;
  return (
    <div className={s.card}>
      <img className={s.card__img} src={gallery[0]} alt="" />
      <div className={s.card__footer}>
        <h3 className={s.card__title}>{title}</h3>
        <p className={s.card__price}>{price + " "} ₴</p>
      </div>
    </div>
  );
};

export default ProductCard;
