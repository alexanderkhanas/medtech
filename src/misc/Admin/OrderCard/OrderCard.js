import React from "react";
import s from "./OrderCard.module.css";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const OrderCard = ({
  orderNumber,
  createDate,
  status,
  paymentType,
  delivery,
  orderSum,
}) => {
  return (
    <div className={s.card}>
      <div className={s.card__atrbutes}>
        <span>{orderNumber}</span>
        <span>{createDate}</span>
        <span className={s.status}>{status}</span>
        <span className={s.pay}>{paymentType}</span>
        <span className={s.delivery}>{delivery}</span>
        <span>{orderSum}</span>
      </div>
      {/* <FontAwesomeIcon icon={faPencilAlt} className={s.faPencil} /> */}
    </div>
  );
};

export default OrderCard;
