import React from "react";
import s from "./Header.module.css";
import logo from "../../assets/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faMailBulk,
  faEnvelope,
  faLocationArrow,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

function Header() {
  return (
    <>
      <header className={s.header}>
        <div className={s.logo}>
          <img src={logo} alt="logo" />
        </div>
        <div className={s.contact}>
          <button className={s.ph_number}>
            <FontAwesomeIcon icon={faPhone} className={s.header_icon} />
            +380-68-6358-298
          </button>
          <button className={s.mail}>
            <FontAwesomeIcon icon={faEnvelope} className={s.header_icon} />
            info@somedomain.com
          </button>
          <button className={s.location}>
            <FontAwesomeIcon icon={faLocationArrow} className={s.header_icon} />
            Store Location
          </button>
        </div>
      </header>
      <div className={s.menu_main_wrapper}>
        <div>
          <li className={s.site_nav}>
            <ul>Home</ul>
            <ul>Collection</ul>
            <ul>Shop</ul>
            <ul>Biomedical</ul>
            <ul>Equipment</ul>
            <ul>Medic Tools</ul>
            <ul>Pages</ul>
          </li>
        </div>
        <div className={s.small_menu_item}>
          <li>
            <ul>My Account</ul>
            <ul>Item</ul>
            <ul>
              <FontAwesomeIcon icon={faSearch} className={s.header_icon} />
            </ul>
          </li>
        </div>
      </div>
    </>
  );
}

export default Header;
