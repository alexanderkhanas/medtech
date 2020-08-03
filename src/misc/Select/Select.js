import React, { useState, useEffect } from "react";
import s from "./Select.module.css";

const Select = ({
  options = [],
  withSearch,
  label,
  containerClass = "",
  onMenuScroll = () => {},
  onSearchValueChange = () => {},
  onSelect = () => {},
  value = "Select value",
}) => {
  const [isMenuOpened, setMenuOpened] = useState(false);
  const [searchValue, setSearchValue] = useState(options[0].label);

  const switchMenuOpened = () => setMenuOpened((prev) => !prev);

  const selectHandler = (option) => {
    onSelect(option);
    setMenuOpened(false);
  };

  const onSearchInputChange = ({ target }) => {
    console.log("value ===", target.value);
    setSearchValue(target.value);
  };

  useEffect(() => {
    onSearchValueChange(searchValue);
  }, [searchValue]);
  return (
    <div className={containerClass}>
      {!!label && <p className={s.label}>{label}</p>}
      {!withSearch ? (
        <div className={s.container}>
          <div className={s.value__container} onClick={switchMenuOpened}>
            <span className={s.value__text}>{value}</span>
          </div>
          {isMenuOpened && (
            <div className={s.menu} onScroll={(e) => console.log("e ===", e)}>
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
      ) : (
        <div className={s.container}>
          {/* <div className={s.value__container} */}
          <input
            value={searchValue}
            className={s.search__input}
            onChange={onSearchInputChange}
            onClick={switchMenuOpened}
          />
          {/* </div> */}
          {isMenuOpened && (
            <div className={s.menu} onScroll={onMenuScroll}>
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
      )}
    </div>
  );
};

export default Select;
