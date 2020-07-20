import React from "react";
import s from "./Button.module.css";

const Button = ({
  onClick,
  className,
  title,
  isRound,
  children,
  size = "md",
  isUppercase,
}) => {
  let classes = `${s.button} ${className}`;
  if (isRound) classes = `${s.button__round} ${classes}`;
  if (isUppercase) classes = `${classes} ${s.uppercase}`;
  return (
    <button {...{ onClick }} className={`${classes} ${s[`button__${size}`]}`}>
      {children}
      {!!title && <span>{title}</span>}
    </button>
  );
};

export default Button;
