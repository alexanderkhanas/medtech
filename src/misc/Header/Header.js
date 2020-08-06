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
import logo from "../../assets/logo.jpg";
import s from "./Header.module.css";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
import { Link, withRouter, useHistory } from "react-router-dom";
import { stack as Menu } from "react-burger-menu";
import { CSSTransition } from "react-transition-group";
import Input from "../Inputs/Input/Input";
import Button from "../Button/Button";
import {
  filterProductsAction,
  setSearchValueAction,
} from "../../store/actions/productsActions";
import { connect } from "react-redux";
import HorizontalProductCard from "../HorizontalProductCard/HorizontalProductCard";
import classnames from "classnames";
import ProfileModal from "../ProfileModal/ProfileModal";

const Header = ({
  searchProductsByValue,
  foundProducts,
  history,
  setSearchValue,
  searchValue,
  user,
}) => {
  const [isBarOpen, setBarOpen] = useState(null);
  const [isAnimation, setAnimation] = useState(false);
  const [sidebarIcon, setSidebarIcon] = useState(faBars);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isFirstLoad, setFirstLoad] = useState(false);

  const [isProfileModalVisible, setProfileModalVisible] = useState(false);
  const showProfileModal = () => setProfileModalVisible(true);
  const hideProfileModal = () => setProfileModalVisible(false);

  const openSidebar = () => {
    console.log("open");

    setBarOpen(true);
  };
  const closeSidebar = () => setBarOpen(false);
  const onStateMenuChange = (state) => {
    setBarOpen(state.isOpen);
  };

  const onSearchInputChange = ({ target }) => setSearchValue(target.value);
  const hideDropdown = () => setDropdownVisible(false);
  const onSearchInputFocus = () => setDropdownVisible(searchValue.length >= 3);

  useEffect(() => {
    if (searchValue.length >= 3) {
      setDropdownVisible(true);
      searchProductsByValue(searchValue);
    }
  }, [searchValue]);

  useEffect(() => {
    console.log("is bar open ===", isBarOpen);

    if (typeof isBarOpen !== "boolean") return;
    setAnimation((prev) => !prev);
    setTimeout(() => {
      setSidebarIcon((prev) => (prev === faBars ? faTimes : faBars));
    }, 200);
  }, [isBarOpen]);

  const { pathname } = history.location;

  useEffect(() => {
    window.scroll({ left: 0, top: 0 });
    if (!isFirstLoad) {
      setFirstLoad(true);
      return;
    }
    if (isBarOpen) {
      setBarOpen(false);
    }
  }, [pathname]);

  const isLogged = document.cookie.includes("token");

  console.log("isLogged ===", isLogged);

  return (
    <>
      <FixedWrapper>
        <div className={s.header__container} onMouseLeave={hideProfileModal}>
          <header className={s.header}>
            <Link to="/">
              <img src={logo} className={s.logo} alt="logo" />
            </Link>
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
                Розташування магазину
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
              <Link
                to="/news"
                className={
                  pathname === "/news"
                    ? `${s.nav__link} ${s.nav__link__active}`
                    : s.nav__link
                }
              >
                Новини
              </Link>
            </div>
            <div className={s.search__container}>
              {isDropdownVisible && pathname !== "/catalog" && (
                <div onClick={hideDropdown} className={s.search__overlay} />
              )}
              <Input
                placeholder="Введіть пошуковий запит"
                containerClass={s.search__input__container}
                onChange={onSearchInputChange}
                onFocus={onSearchInputFocus}
              />
              <Button className={s.search__button} title="Знайти" />
              {!!foundProducts.length &&
                isDropdownVisible &&
                pathname !== "/catalog" && (
                  <div className={s.search__dropdown}>
                    {foundProducts.slice(0, 5).map((foundProduct) => (
                      <Link
                        to={`product/${foundProduct._id}`}
                        onClick={hideDropdown}
                      >
                        <HorizontalProductCard
                          key={foundProduct._id}
                          isSmall
                          product={foundProduct}
                        />
                      </Link>
                    ))}
                    <Link
                      className={s.search__see__more}
                      onClick={hideDropdown}
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
                  to={user._id ? "/profile" : "/login"}
                  style={{ marginRight: 0 }}
                  onMouseOver={showProfileModal}
                  className={classnames(s.nav__link, s.profile__nav__link, {
                    [s.nav__link__active]: pathname.startsWith("/profile"),
                  })}
                >
                  {user._id ? "Мій профіль" : "Увійти"}
                </Link>
                <ProfileModal
                  isVisible={user._id && isProfileModalVisible}
                  hide={hideProfileModal}
                />
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
          <div className={s.search__container}>
            {isDropdownVisible && pathname !== "/catalog" && (
              <div onClick={hideDropdown} className={s.search__overlay} />
            )}
            <Input
              placeholder="Введіть пошуковий запит"
              containerClass={s.search__input__container}
              onChange={onSearchInputChange}
              onFocus={onSearchInputFocus}
            />
            <Button className={s.search__button}>
              <FontAwesomeIcon icon={faSearch} />
            </Button>
            {!!foundProducts.length &&
              isDropdownVisible &&
              pathname !== "/catalog" && (
                <div className={s.search__dropdown}>
                  {foundProducts.slice(0, 5).map((foundProduct) => (
                    <Link
                      to={`product/${foundProduct._id}`}
                      onClick={hideDropdown}
                    >
                      <HorizontalProductCard
                        key={foundProduct._id}
                        isSmall
                        className={s.mobile__search__product}
                        product={foundProduct}
                      />
                    </Link>
                  ))}
                  <Link
                    className={s.search__see__more}
                    onClick={hideDropdown}
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
          <Link to="/cart">
            <FontAwesomeIcon icon={faShoppingBag} className={s.cart__icon} />
          </Link>
        </div>
      </FixedWrapper>
      <Menu
        width="300px"
        isOpen={isBarOpen}
        burgerButtonClassName={s.menu_hidden}
        menuClassName={s.menu_color}
        crossButtonClassName={s.exit_hidden}
        bmMenuWrap={s.menu_width}
        className={isBarOpen === null ? s.display_none : ""}
        disableAutoFocus
        itemListClassName={s.mobile__nav}
        itemClassName={s.mobile__nav__item}
        onStateChange={onStateMenuChange}
      >
        <Link to="/">Головна</Link>
        <Link to="/catalog">Каталог</Link>
        <Link to="/wishlist">Улюблені</Link>
        <Link to="/cart">Кошик</Link>
        <Link to="/profile/2">Профіль</Link>
      </Menu>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    foundProducts: state.products.filtered,
    searchValue: state.products.searchValue,
    user: state.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchProductsByValue: (value) =>
      dispatch(filterProductsAction(null, value)),
    setSearchValue: (value) => dispatch(setSearchValueAction(value)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
