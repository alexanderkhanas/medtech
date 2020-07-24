import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faLocationArrow,
  faSearch,
  faBars,
  faTimes,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/logo.svg";
import s from "./Header.module.css";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
import { Link, withRouter, useHistory } from "react-router-dom";
import { stack as Menu } from "react-burger-menu";
import { CSSTransition } from "react-transition-group";
import Input from "../Inputs/Input/Input";
import Button from "../Button/Button";
import { filterProductsAction } from "../../store/actions/productsActions";
import { connect } from "react-redux";
import HorizontalProductCard from "../HorizontalProductCard/HorizontalProductCard";
// import CartButton from "../CartButton/CartButton";
// import WishlistButton from "../WishlistButton/WishlistButton";

const Header = ({ searchProductsByValue, foundProducts, history }) => {
  const [isBarOpen, setBarOpen] = useState(null);
  const [isAnimation, setAnimation] = useState(false);
  const [sidebarIcon, setSidebarIcon] = useState(faBars);
  const [searchValue, setSearchValue] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isCatalogPage, setCatalogPage] = useState(false);
  const [activePath, setActivePath] = useState();
  const openSidebar = () => setBarOpen(true);
  const closeSidebar = () => setBarOpen(false);
  const onStateMenuChange = (state) => setBarOpen(state.isOpen);

  const onSearchInputChange = ({ target }) => setSearchValue(target.value);
  const onSearchInputBlur = () => setDropdownVisible(false);
  const onSearchInputFocus = () => setDropdownVisible(searchValue.length >= 3);

  useEffect(() => {
    if (searchValue.length >= 3) {
      setDropdownVisible(true);
      searchProductsByValue(searchValue);
    }
  }, [searchValue]);

  useEffect(() => {
    if (typeof isBarOpen !== "boolean") return;
    setAnimation((prev) => !prev);
    setTimeout(() => {
      setSidebarIcon((prev) => (prev === faBars ? faTimes : faBars));
    }, 200);
  }, [isBarOpen]);

  const { pathname } = history.location;

  useEffect(() => {
    window.scroll({ left: 0, top: 0 });
  }, [pathname]);

  return (
    <>
      <FixedWrapper>
        <div className={s.header__container}>
          <header className={s.header}>
            <div className={s.logo}>
              <img src={logo} alt="logo" />
            </div>
            <div className={s.contact}>
              <button className={s.header__info__tag}>
                <FontAwesomeIcon icon={faPhone} className={s.header_icon} />
                +380-68-6358-298
              </button>
              <button className={s.header__info__tag}>
                <FontAwesomeIcon icon={faEnvelope} className={s.header_icon} />
                info@somedomain.com
              </button>
              <button className={s.header__info__tag}>
                <FontAwesomeIcon
                  icon={faLocationArrow}
                  className={s.header_icon}
                />
                Store Location
              </button>
            </div>
          </header>
          <div className={s.menu_main_wrapper}>
            <div className={s.main__nav}>
              <Link
                to="/"
                className={
                  pathname === "/"
                    ? `${s.nav__link} ${s.nav__link__active}`
                    : s.nav__link
                }
              >
                Головна
              </Link>
              <Link
                to="/catalog"
                className={
                  pathname === "/catalog"
                    ? `${s.nav__link} ${s.nav__link__active}`
                    : s.nav__link
                }
              >
                Каталог
              </Link>
              <Link
                to="/wishlist"
                className={
                  pathname === "/wishlist"
                    ? `${s.nav__link} ${s.nav__link__active}`
                    : s.nav__link
                }
              >
                Улюблені
              </Link>
              <Link
                to="/cart"
                className={
                  pathname === "/cart"
                    ? `${s.nav__link} ${s.nav__link__active}`
                    : s.nav__link
                }
              >
                Кошик
              </Link>
            </div>
            <div className={s.search__container}>
              <div className={s.search__overlay} />
              <Input
                placeholder="Введіть пошуковий запит"
                containerClass={s.search__input__container}
                onChange={onSearchInputChange}
                onBlur={onSearchInputBlur}
                onFocus={onSearchInputFocus}
              />
              <Button title="Знайти" />
              {!!foundProducts.length &&
                isDropdownVisible &&
                pathname !== "/catalog" && (
                  <div className={s.search__dropdown}>
                    {foundProducts.slice(0, 5).map((foundProduct, i) => {
                      const { title, gallery, _id } = foundProduct;
                      return (
                        <HorizontalProductCard
                          key={_id}
                          isSmall
                          product={foundProduct}
                        />
                      );
                    })}
                    <Link
                      className={s.search__see__more}
                      to={{
                        pathname: "/catalog",
                        state: { query: searchValue },
                      }}
                    >
                      Показати ще
                    </Link>
                  </div>
                )}
            </div>
            <div className={s.small_menu_item}>
              <div className={s.small_menu_button}>
                <Link
                  to="/login"
                  className={
                    pathname === "/catalog"
                      ? `${s.nav__link} ${s.nav__link__active}`
                      : s.nav__link
                  }
                >
                  Мій профіль
                </Link>
              </div>
              {/* <FontAwesomeIcon icon={faSearch} className={s.navbar__icon} /> */}
            </div>
          </div>
        </div>

        <div className={s.mobile__header}>
          <CSSTransition
            in={isAnimation}
            timeout={400}
            classNames={{
              enterActive: s.burger__icon__entering,
              enterDone: s.burger__icon__entered,
              exitActive: s.burger__icon__exiting,
              exitDone: s.burger__icon__exited,
            }}
          >
            <FontAwesomeIcon
              icon={sidebarIcon}
              className={s.burger__icon}
              onClick={isBarOpen ? closeSidebar : openSidebar}
            />
          </CSSTransition>
          <Link to="/cart">
            <FontAwesomeIcon icon={faShoppingBag} className={s.cart__icon} />
          </Link>
        </div>
      </FixedWrapper>
      <Menu
        width="70%"
        isOpen={isBarOpen}
        burgerButtonClassName={s.menu_hidden}
        menuClassName={s.menu_color}
        crossButtonClassName={s.exit_hidden}
        bmMenuWrap={s.menu_width}
        className={!isBarOpen && !isAnimation ? s.display_none : ""}
        disableAutoFocus
        itemListClassName={s.mobile__nav}
        itemClassName={s.mobile__nav__item}
        onStateChange={onStateMenuChange}
      >
        <Link to="/">Головна</Link>
        <Link to="/catalog">Каталог</Link>
        <Link to="/wishlist">Улюблені</Link>
        <Link to="/cart">Кошик</Link>
      </Menu>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    foundProducts: state.products.filtered,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchProductsByValue: (value) =>
      dispatch(filterProductsAction(null, value)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
