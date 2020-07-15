import React from "react";
import s from "./AdvantagesCard.module.css";

const AdvantagesCard = ({ title, bodyText, imgSrc, mainColor }) => {
  return (
    <div className={s.card} style={{ background: mainColor }}>
      <div className={s.card__info}>
        <h2 className={s.card__title}>{title}</h2>
        <p className={s.card__text}>{bodyText}</p>
      </div>
      <img src={imgSrc} alt="loading" className={s.card__img} />
    </div>
  );
};

export default AdvantagesCard;
