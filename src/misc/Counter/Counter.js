import React, { useState, useEffect } from "react";
import s from "./Counter.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const Counter = ({ onChange }) => {
  const [value, setValue] = useState(1);

  const onPlusClick = () => setValue((prev) => prev + 1);
  const onMinusClick = () =>
    setValue((prev) => (prev - 1 > 0 ? prev - 1 : prev));

  useEffect(() => {
    onChange(value);
  }, [value]);

  return (
    <div className={s.container}>
      <div className={s.sign__icon__container}>
        <FontAwesomeIcon
          onClick={onMinusClick}
          className={s.icon}
          icon={faMinus}
        />
      </div>
      <input {...{ value }} className={s.input} />
      <div className={s.sign__icon__container}>
        <FontAwesomeIcon
          onClick={onPlusClick}
          className={s.icon}
          icon={faPlus}
        />
      </div>
    </div>
  );
};

export default Counter;
