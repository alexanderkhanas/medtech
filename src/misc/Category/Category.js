import React from "react";
import s from "./Category.module.css";

const Category = ({ category, onSelect, children, ...rest }) => {
  return (
    <div className={s.container}>
      <img
        src="https://www.ubertheme.com/wp-content/uploads/sites/3/edd/2014/06/jm-category.png"
        alt="loading"
        className={s.image}
      />
      <p className={s.title}>{category.title}</p>
      {/*{children}*/}
    </div>
  );
};

export default Category;
