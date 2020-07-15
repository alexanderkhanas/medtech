import React from "react";
import s from "./NewsCard.module.css";
import Button from "../Button/Button";

const NewsCard = ({ title, subtitle, bodyText, imgSrc }) => {
  return (
    <div className={s.card}>
      <img src={imgSrc} alt="loading" className={s.card__img} />
      <div className={s.card__footer}>
        <h2 className={s.card__title}>{title}</h2>
        <p className={s.card__subtitle}>{subtitle}</p>
        <Button size="lg" title="Читати більше" />
      </div>
    </div>
  );
};

export default NewsCard;
