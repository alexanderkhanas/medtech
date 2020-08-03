import React, { useState, useEffect } from "react";
import s from "./Select.module.css";

const Select = ({
  options = [],
  withSearch,
  label,
  noDefaultValue = false,
  containerClass = "",
  menuClass = "",
  onMenuScroll = () => {},
  onSearchValueChange = () => {},
  onSelect = () => {},
  value = "Оберіть значення",
}) => {
  const [isMenuOpened, setMenuOpened] = useState(false);
  const [searchValue, setSearchValue] = useState(
    noDefaultValue ? "" : options[0].label
  );

  const switchMenuOpened = () => setMenuOpened((prev) => !prev);
  const closeMenu = () => setMenuOpened(false);

  const selectHandler = (option) => {
    onSelect(option);
    setMenuOpened(false);
  };

  const selectSearchHandler = (option) => {
    setSearchValue(option.label);
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
        <div className={s.container} onBlur={switchMenuOpened}>
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
      ) : (
        <div className={s.container}>
          {/* <div className={s.value__container} */}
          <input
            value={searchValue}
            placeholder="Оберіть значення"
            className={s.search__input}
            onChange={onSearchInputChange}
            onClick={switchMenuOpened}
          />
          {/* </div> */}
          {isMenuOpened && (
            <div
              className={`${s.menu} ${menuClass}`}
              onScroll={(e) => onMenuScroll(e, searchValue)}
            >
              {options.map((option, i) => (
                <div
                  key={i}
                  className={s.option}
                  onClick={() => selectSearchHandler(option)}
                >
                  <span className={s.option__text}>{option.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {isMenuOpened && <div className={s.overlay} onClick={closeMenu} />}
    </div>
  );
};

export default Select;
