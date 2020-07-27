import React from "react";
import s from "./Footer.module.css";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
import logo from "../../assets/logo.svg";
import Input from "../Inputs/Input/Input";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";
import {
  faPhone,
  faClock,
  faCopyright,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={s.footer}>
      <FixedWrapper>
        <div className={s.a}>
          <div className={s.contact}>
            <h4>Зв'язатися з нами</h4>
            <p className={s.phone}>
              <FontAwesomeIcon icon={faPhone} className={s.icon_ft} /> + 38
              (067) 208 81 45
            </p>
            <p className={s.social}>
              <FontAwesomeIcon icon={faInstagram} className={s.icon_ft} />{" "}
              Instagram
            </p>
            <p className={s.social}>
              <FontAwesomeIcon icon={faFacebook} className={s.icon_ft} />{" "}
              Facebook
            </p>
            <p className={s.hours}>
              <FontAwesomeIcon icon={faClock} className={s.icon_ft} /> Пн-Пт:
              09:00 - 19:00 <br />
              <span style={{ paddingLeft: "20px" }}> Сб-Нд: 10:00 -17:00</span>
            </p>
          </div>
          <div className={s.navigation}>
            <h4>Навігація по сайту</h4>
            <button>
              <Link to="/" className={s.btn_cl}>
                <p>Головна</p>
              </Link>
            </button>
            <button>
              <Link to="/public-offer" className={s.btn_cl}>
                <p>Про нас</p>
              </Link>
            </button>
            <button>
              <Link to="/news" className={s.btn_cl}>
                <p>Новини</p>
              </Link>
            </button>
            <button>
              <Link to="/public-offer" className={s.btn_cl}>
                <p>Контакти</p>
              </Link>
            </button>
          </div>
          {/* <div className={s.popular}>
            <h4>Популярні категорії</h4>
            <button>
              <Link to="/public-offer" className={s.btn_cl}>
                <p>Контакти</p>
              </Link>
            </button>
            <button>
              <Link to="/public-offer" className={s.btn_cl}>
                <p>Контакти</p>
              </Link>
            </button>
            <button>
              <Link to="/public-offer" className={s.btn_cl}>
                <p>Контакти</p>
              </Link>
            </button>
            <button>
              <Link to="/public-offer" className={s.btn_cl}>
                <p>Контакти</p>
              </Link>
            </button>
          </div> */}
          <div className={s.inf}>
            <h4>Корисна інформація</h4>
            <button>
              <Link to="/public-offer" className={s.btn_cl}>
                <p>Доставка і оплата</p>
              </Link>
            </button>
            <button>
              <Link to="/public-offer" className={s.btn_cl}>
                <p>Часті запитання</p>
              </Link>
            </button>
            <button>
              <Link to="/public-offer" className={s.btn_cl}>
                <p>Гарантія і повернення</p>
              </Link>
            </button>
            {/* <button>
              <Link to="/public-offer" className={s.btn_cl}>
                <p>Про бонус систему</p>
              </Link>
            </button> */}
            <button>
              <Link to="/politics" className={s.btn_cl}>
                <p>Політика конфіденційності </p>
              </Link>
            </button>
          </div>
        </div>
        <div className={s.copyright}>
          <FontAwesomeIcon icon={faCopyright} /> 1999-2020. Всі права захищені
        </div>
      </FixedWrapper>
    </footer>
  );
};

export default Footer;
