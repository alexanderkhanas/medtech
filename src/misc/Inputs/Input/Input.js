import React from "react";
import s from "./Input.module.css";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Input = ({
  Icon,
  type = "text",
  placeholder,
  label,
  onChange,
  containerClass,
  inputClass,
  isError,
  children,
  isTextarea,
  ...rest
}) => {
  return (
    <div className={`${s.container} ${containerClass}`}>
      {!!label && <span className={s.label}>{label}</span>}
      <div className={s.container__input}>
        {!isTextarea ? (
          <input
            {...{ type }}
            {...{ onChange }}
            className={classnames(s.input, inputClass, {
              isError: s.error__input,
            })}
            {...{ placeholder }}
            {...rest}
          />
        ) : (
          <textarea
            {...{ type }}
            {...{ onChange }}
            className={classnames(s.input, inputClass, {
              isError: s.error__input,
            })}
            {...{ placeholder }}
            {...rest}
          />
        )}
        {children}
      </div>
    </div>
  );
};

export default Input;
