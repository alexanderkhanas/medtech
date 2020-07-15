import React from "react";
import s from "./Button.module.css";

const Button = ({
  onClick,
  className,
  title,
  isRound = false,
  children,
  size = "md",
}) => {
  let classes = `${s.button} ${className}`;
  console.log(`button__${size}`, title);

  if (isRound) classes = `${s.button__round} ${classes}`;

  return (
    <button {...{ onClick }} className={`${classes} ${s[`button__${size}`]}`}>
      {children}
      {!!title && <span>{title}</span>}
    </button>
  );
};

export default Button;
