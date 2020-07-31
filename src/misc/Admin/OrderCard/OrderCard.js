import React from "react";
import s from "./OrderCard.module.css";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const OrderCard = () => {
  return (
    <div className={s.card}>
      <div className={s.card__atrbutes}>
        <span>Номер замовлення</span>
        <span>Дата створення</span>
        <span>Статус</span>
        <span>Спосіб оплати</span>
        <span>Спосіб доставки</span>
        <span>Загальна сума</span>
      </div>
      {/* <FontAwesomeIcon icon={faPencilAlt} className={s.faPencil} /> */}
    </div>
  );
};

export default OrderCard;
