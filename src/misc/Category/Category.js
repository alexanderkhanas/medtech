import React from "react";
import s from "./Category.module.css";

const Category = ({ category, onSelect }) => {
  return (
    <div className={s.container}>
      <span>{category}</span>
    </div>
  );
};

export default Category;
