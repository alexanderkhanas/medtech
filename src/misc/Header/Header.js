import React, { useState, useEffect } from "react";
import s from "./Header.module.css";
import logo from "../../assets/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faMailBulk,
  faEnvelope,
  faLocationArrow,
  faSearch,
  faHamburger,
  faBars,
  faTimes,
  faShoppingCart,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
import { Link } from "react-router-dom";
import { stack as Menu } from "react-burger-menu";
import { CSSTransition } from "react-transition-group";

function Header() {
  const [isBarOpen, setBarOpen] = useState(null);
  const [isAnimation, setAnimation] = useState(false);
  const [sidebarIcon, setSidebarIcon] = useState(faBars);
  const openSidebar = () => setBarOpen(true);
  const closeSidebar = () => setBarOpen(false);
  const onStateMenuChange = (state) => setBarOpen(state.isOpen);
  useEffect(() => {
    if (typeof isBarOpen !== "boolean") return;
    setAnimation((prev) => !prev);
    setTimeout(() => {
      setSidebarIcon((prev) => (prev == faBars ? faTimes : faBars));
    }, 200);
  }, [isBarOpen]);
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
            <div>
              <Link to="/">
                <button>Home</button>
              </Link>
              <button>Collection</button>
              <Link to="/catalog">
                <button>Shop</button>
              </Link>
              <button>Biomedical</button>
              <button>Equipment</button>
              <button>Medic Tools</button>
              <button>Pages</button>
            </div>
            <div className={s.small_menu_item}>
              <div className={s.small_menu_button}>
                <Link to="/login">
                  <button>My Account</button>
                </Link>
                <Link to="/cart">
                  <button>Item</button>
                </Link>
              </div>
              <FontAwesomeIcon icon={faSearch} className={s.navbar__icon} />
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
        // noOverlay

        menuClassName={s.menu_color}
        // bodyClassName={isBarOpen ? "" : `${s.display_none}`}
        crossButtonClassName={s.exit_hidden}
        bmMenuWrap={s.menu_width}
        className={!isBarOpen && !isAnimation ? s.display_none : ""}
        disableAutoFocus
        itemListClassName={s.mobile__nav}
        itemClassName={s.mobile__nav__item}
        onStateChange={onStateMenuChange}
      >
        <Link to="/">Home</Link>
        <Link to="/">Collection</Link>
        <Link to="/catalog">Shop</Link>
        <Link to="/">Biomedical</Link>
        <Link to="/">Equipment</Link>
        <Link to="/">Medic Tools</Link>
        <Link to="/">Pages</Link>
      </Menu>
    </>
  );
}

export default Header;
