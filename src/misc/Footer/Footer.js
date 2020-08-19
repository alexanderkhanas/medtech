import React from "react";
import s from "./Footer.module.css";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
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
            <div className={s.row}>
              <FontAwesomeIcon icon={faPhone} className={s.icon_ft} />
              <span className={s.phone}>+ 38 (067) 208 81 45</span>
            </div>
            <div className={s.row}>
              <FontAwesomeIcon icon={faInstagram} className={s.icon_ft} />
              <span className={s.social}>Instagram</span>
            </div>
            <div className={s.row}>
              <FontAwesomeIcon icon={faFacebook} className={s.icon_ft} />
              <span className={s.social}>Facebook</span>
            </div>
            <div className={s.row}>
              <FontAwesomeIcon icon={faClock} className={s.icon_ft} />
              <div className={s.hours__container}>
                <p className={s.hours}>Пн-Пт: 09:00 - 19:00</p>
                <p className={s.hours}> Сб-Нд: 10:00 -17:00</p>
              </div>
            </div>
          </div>
          <div className={s.navigation}>
            <h4>Навігація по сайту</h4>
            <button>
              <Link to="/" className={s.btn_cl}>
                <p>Головна</p>
              </Link>
            </button>
            <button>
              <Link to="/about-us" className={s.btn_cl}>
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
            <button>
              <Link to="/public-offer" className={s.btn_cl}>
                <p>Про бонус систему</p>
              </Link>
            </button>
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
