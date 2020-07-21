import React, { useState } from "react";
import s from "./Select.module.css";

const Select = ({
  options = [],
  onSelect = () => {},
  value = "Select value",
}) => {
  const [isMenuOpened, setMenuOpened] = useState(false);
  const switchMenuOpened = () => setMenuOpened((prev) => !prev);
  const selectHandler = (option) => {
    onSelect(option);
    setMenuOpened(false);
  };
  return (
    <div className={s.container}>
      <div className={s.value__container} onClick={switchMenuOpened}>
        <span className={s.value__text}>{value}</span>
      </div>
      {isMenuOpened && (
        <div className={s.menu}>
          {options.map((option, i) => (
            <div
              key={i}
              className={s.option}
              onClick={() => selectHandler(option)}
            >
              <span className={s.option__text}>{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
