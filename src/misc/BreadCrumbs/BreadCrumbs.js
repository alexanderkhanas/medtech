import React from "react";
import s from "./BreadCrumbs.module.css";
import { Link } from "react-router-dom";

const BreadCrumbs = ({ items }) => {
  return (
    <div className={s.container}>
      {items.map(({ name, path, icon }, i) => {
        const text = i === 0 ? `${name} ` : `/ ${name} `;
        const className = i === items.length - 1 ? s.last__crumb : s.crumb;
        return (
          <Link to={path} key={i} className={s.link}>
            {!!icon && icon}
            <span {...{ className }} key={i}>
              {text}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default BreadCrumbs;
