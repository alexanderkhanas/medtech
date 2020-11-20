import React from "react";
import s from "./Category.module.css";

const Category = ({ category, onSelect, children, ...rest }) => {
  const { _id, title, gallery } = category;
  return (
    <div className={s.container} onClick={() => onSelect(_id)} {...rest}>
      <img
        src={gallery[0] || require("../../assets/category-placeholder.png")}
        alt="loading"
        className={s.image}
      />
      <p className={s.title}>{title}</p>
      {/*{children}*/}
    </div>
  );
};

export default Category;
