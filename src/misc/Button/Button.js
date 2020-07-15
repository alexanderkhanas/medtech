import React from "react";
import s from "./Button.module.css";

const Button = ({ onClick, className, title, isRound = false, children }) => {
  let classes = `${s.button} ${className}`;
  if (isRound) classes = `${s.button__round} ${classes}`;

  return (
    <button {...{ onClick }} className={classes}>
      {children}
      {!!title && <span>{title}</span>}
    </button>
  );
};

export default Button;
