import React from "react";
import s from "./NewsCard.module.css";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

const NewsCard = ({ newsItem }) => {
  const { title, desc, bodyText, gallery, _id, createdAt } = newsItem;
  return (
    <div className={s.card}>
      <Link to={`/single-news/${_id}`}>
        <div className={s.card__footer}>
          <h2 className={s.card__title}>{title}</h2>
          <img
            src={
              gallery ||
              "https://medtechnika.te.ua/assets/products/5f2d3348f267ed397417cb0e/i2.png"
            }
            alt="loading"
            className={s.card__img}
          />
          <p className={s.card__subtitle}>{desc.substr(0, 100)}...</p>
          <div className={s.createdAt}>
            {new Date(createdAt).toISOString().split("T")[0]}
          </div>
          <Button size="lg" title="Читати більше" />
        </div>
      </Link>
    </div>
  );
};

export default NewsCard;
