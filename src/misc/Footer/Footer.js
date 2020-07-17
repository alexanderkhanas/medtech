import React from "react";
import s from "./Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";
import {
  faPhone,
  faClock,
  faCopyright,
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className={s.footer}>
      <div className={s.a}>
        <div className={s.contact}>
          <p className={s.phone}>
            <FontAwesomeIcon icon={faPhone} /> + 38 (067) 208 81 45
          </p>
          <p className={s.social}>
            <FontAwesomeIcon icon={faInstagram} /> Instagram
          </p>
          <p className={s.social}>
            <FontAwesomeIcon icon={faFacebook} /> Facebook
          </p>
          <p className={s.hours}>
            <FontAwesomeIcon icon={faClock} /> Пн-Пт: 09:00 - 19:00 <br />
            <span style={{ paddingLeft: "20px" }}> Сб-Нд: 10:00 -17:00</span>
          </p>
        </div>
        <div className={s.navigation}>
          <h4>Навігація по сайту</h4>
          <p>Головна</p>
          <p>Про нас</p>
          <p>Новини та акції</p>
          <p>Контакти</p>
        </div>
        <div className={s.popular}>
          <h4>Популярні категорії</h4>
          <p>Малюки до року</p>
          <p>Іграшки</p>
          <p>Одяг</p>
          <p>Взуття</p>
        </div>
        <div className={s.inf}>
          <h4>Корисна інформація</h4>
          <p>Доставка і оплата</p>
          <p>Часті запитання</p>
          <p>Гарантія і повернення</p>
          <p>Про бонус систему</p>
          <p>Політика конфіденційності</p>
        </div>
      </div>
      <div className={s.bottom__footer}>
        <FontAwesomeIcon icon={faCopyright} /> 1999-2020. Всі права захищені
      </div>
    </footer>
  );
};

export default Footer;
