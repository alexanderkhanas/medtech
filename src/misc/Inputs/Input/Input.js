import React from "react";
import s from "./Input.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Input = ({
  Icon,
  type = "text",
  placeholder,
  label,
  containerClass,
  isError,
  ...rest
}) => {
  return (
    <div className={`${s.container} ${containerClass}`}>
      {!!label && <span className={s.label}>{label}</span>}
      <div className={s.container__input}>
        <input
          {...{ type }}
          className={isError ? `${s.input} ${s.error__input}` : s.input}
          {...{ placeholder }}
          {...rest}
        />
        {!!Icon && <Icon className={s.eye} />}
      </div>
    </div>
  );
};

export default Input;
