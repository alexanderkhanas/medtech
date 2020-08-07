import React, { useState, useEffect } from "react";
import s from "./Counter.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import InputMask from "react-input-mask";

const Counter = ({ onChange, initialValue }) => {
  const [value, setValue] = useState(initialValue);

  const onInputChange = ({ target }) => setValue(target.value);

  const onPlusClick = () => setValue((prev) => +prev + 1);
  const onMinusClick = () =>
    setValue((prev) => (prev - 1 > 0 ? prev - 1 : prev));

  useEffect(() => {
    onChange(value);
  }, [value]);

  return (
    <div className={s.container}>
      <div onClick={onMinusClick} className={s.sign__icon__container}>
        <FontAwesomeIcon className={s.icon} icon={faMinus} />
      </div>
      <InputMask
        maskChar=""
        mask="9999"
        {...{ value }}
        onChange={onInputChange}
      >
        {(rest) => <input {...rest} className={s.input} disableUnderline />}
      </InputMask>
      <div onClick={onPlusClick} className={s.sign__icon__container}>
        <FontAwesomeIcon className={s.icon} icon={faPlus} />
      </div>
    </div>
  );
};

export default Counter;
