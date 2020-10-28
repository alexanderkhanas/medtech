import React from "react";
import s from "./Categories.module.css";
import Category from "../Category/Category";

const Categories = ({ categories }) => {
  return (
    <div className={s.categories}>
      {categories.map((category) => (
        <Category {...{ category }} />
        // <div className={s.category}>
        //   <h4 className={s.category__title}>{category.title}</h4>
        // </div>
      ))}
    </div>
  );
};

export default Categories;
