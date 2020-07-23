import React from "react";
import s from "./NewsCard.module.css";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const NewsCard = ({ newsItem }) => {
  const { title, desc, bodyText, gallery, _id, createdAt } = newsItem;
  return (
    <div className={s.card}>
      <Link to={`/single-news/${_id}`}>
        <div className={s.card__footer}>
          <h2 className={s.card__title}>{title}</h2>
          <img src={gallery[0]} alt="loading" className={s.card__img} />
          <p className={s.card__subtitle}>{desc.substr(0, 100)}...</p>
          <div className={s.createdAt}>
            <Moment format="DD/MM/YYYY">{createdAt}</Moment>
          </div>
          <Button size="lg" title="Читати більше" />
        </div>
      </Link>
    </div>
  );
};

export default NewsCard;
