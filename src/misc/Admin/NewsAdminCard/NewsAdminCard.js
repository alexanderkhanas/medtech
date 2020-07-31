import React, { useState } from "react";
import s from "./NewsAdminCard.module.css";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Moment from "react-moment";
import Button from "../../Button/Button";
import Modal from "../../Modal/Modal";
import _axios from "../../../store/api/_axios";

const NewsAdminCard = ({ newsItem }) => {
  const { title, desc, bodyText, _id, createdAt } = newsItem;
  const [show, setShow] = useState(false);
  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);

  return (
    <div className={s.card}>
      <div className={s.card__atrbutes}>
        <p className={s.card__title}>{title}</p>
        <p className={s.card__subtitle}>{desc.substr(0, 20)}...</p>
        <div className={s.table__container}>
          <div className={s.createdAt}>
            <Moment format="DD/MM/YYYY">{createdAt}</Moment>
          </div>
          <div className={s.buttons}>
            <Button className={s.edit__btn} size="sm" title="Редагувати" />
            <div className={s.delete__container}>
              <Button
                size="sm"
                title="Видалити"
                className={s.delete__btn}
                onClick={openModal}
              />
            </div>
          </div>
        </div>
      </div>
      {show && <Modal closeModal={closeModal} show={show} />}
    </div>
  );
};

export default NewsAdminCard;
