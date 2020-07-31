import React, { useState } from "react";
import s from "./ProfileInput.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Transition } from "react-transition-group";

const transitionStyles = {
  entering: { transform: "scale(1.2)" },
  entered: { transform: "scale(1.2)" },
  exiting: { transform: "scale(1)" },
  exited: { transform: "scale(1)" },
};

const Input = ({
  type,
  label,
  defaultValue,
  value,
  icon,
  onFocus = () => {},
  onBlur = () => {},
  style = {},
  inputStyle = {},
  onChange,
  placeholder = "",
  ...rest
}) => {
  const [isFocused, setFocused] = useState(false);
  const focusHandler = () => {
    setFocused(true);
    onFocus();
  };
  const blurHandler = () => {
    setFocused(false);
    onBlur();
  };
  return !icon ? (
    <div className={s.input__container}>
      <p className={s.label}>{label}</p>
      <input
        {...{ style }}
        type={type || "text"}
        className={s.input}
        onFocus={focusHandler}
        onBlur={blurHandler}
        {...{ defaultValue }}
        {...{ value }}
        {...rest}
        {...{ placeholder }}
      />
    </div>
  ) : (
    <div className={s.input__container}>
      <p className={s.label}>{label}</p>
      <div className={s.custom_input} style={inputStyle}>
        <Transition in={isFocused} timeout={100}>
          {(state) => (
            <div className={s.input__icon__container}>
              <FontAwesomeIcon
                {...{ icon }}
                style={transitionStyles[state]}
                className={s.input__icon}
                color="#6a6a6a"
                size="lg"
              />
            </div>
          )}
        </Transition>
        <input
          {...{ style }}
          type={type || "text"}
          alt="loading"
          {...{ placeholder }}
          onFocus={focusHandler}
          onBlur={blurHandler}
          {...{ onChange }}
          {...{ value }}
          className={`${s.input} ${s.input_with_icon}`}
          defaultValue={defaultValue}
          {...rest}
        />
      </div>
    </div>
  );
};

export default Input;
