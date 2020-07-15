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
          <button>Home</button>
          <button>Collection</button>
          <button>Shop</button>
          <button>Biomedical</button>
          <button>Equipment</button>
          <button>Medic Tools</button>
          <button>Pages</button>
        </div>
        <div className={s.small_menu_item}>
          <div className={s.small_menu_button}>
            <button>My Account</button>
            <button>Item</button>
          </div>
          <FontAwesomeIcon icon={faSearch} className={s.header_icon} />
        </div>
      </div>
    </>
  );
}

export default Header;
