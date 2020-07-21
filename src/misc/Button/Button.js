import React from "react";
import s from "./Button.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames";

const Button = ({
  onClick,
  className,
  title,
  isRound,
  children,
  size = "md",
  isUppercase,
  icon,
  isSecondary,
}) => {
  let classes = classnames(s.button, className, {
    [s.button__round]: isRound,
    [s.uppercase]: isUppercase,
    [s.secondary]: isSecondary,
  });
  return (
    <button {...{ onClick }} className={`${classes} ${s[`button__${size}`]}`}>
      {!!icon && <FontAwesomeIcon className={s.icon} {...{ icon }} />}
      {children}
      {!!title && <span>{title}</span>}
    </button>
  );
};

export default Button;
