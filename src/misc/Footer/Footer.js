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

const Footer = () => {
  return (
    <footer className={s.footer}>
      <FixedWrapper>
        <div className={s.top_footer}>
          <div className={s.logo}>
            <img src={logo} alt="logo" />
          </div>
          <div className={s.input_footer}>
            <Input placeholder="example@gmail.com" />
            <Button title="Підписатись" className={s.submit_button} />
          </div>
          <div className={s.social}>
            <FontAwesomeIcon icon={faFacebook} />
            <FontAwesomeIcon icon={faFacebook} />
            <FontAwesomeIcon icon={faFacebook} />
          </div>
        </div>
        <div className={s.a}>
          <div className={s.contact}>
            <h4>Зв'язатися з нами</h4>
            <p className={s.phone}>
              <FontAwesomeIcon icon={faPhone} /> + 38 (067) 208 81 45
            </p>
            <button>
              <p className={s.social}>
                <FontAwesomeIcon icon={faInstagram} /> Instagram
              </p>
            </button>
            <button>
              <p className={s.social}>
                <FontAwesomeIcon icon={faFacebook} /> Facebook
              </p>
            </button>
            <p className={s.hours}>
              <FontAwesomeIcon icon={faClock} /> Пн-Пт: 09:00 - 19:00 <br />
              <span style={{ paddingLeft: "20px" }}> Сб-Нд: 10:00 -17:00</span>
            </p>
          </div>
          <div className={s.navigation}>
            <h4>Навігація по сайту</h4>
            <button>
              <p>Головна</p>
            </button>
            <button>
              <p>Про нас</p>
            </button>
            <button>
              <p>Новини та акції</p>
            </button>
            <button>
              <p>Контакти</p>
            </button>
          </div>
          <div className={s.popular}>
            <h4>Популярні категорії</h4>
            <button>
              <p>Малюки до року</p>
            </button>
            <button>
              <p>Іграшки</p>
            </button>
            <button>
              <p>Одяг</p>
            </button>
            <button>
              <p>Взуття</p>
            </button>
          </div>
          <div className={s.inf}>
            <h4>Корисна інформація</h4>
            <button>
              <p>Доставка і оплата</p>{" "}
            </button>
            <button>
              <p>Часті запитання</p>
            </button>
            <button>
              <p>Гарантія і повернення</p>
            </button>
            <button>
              <p>Про бонус систему</p>
            </button>
            <button>
              <p>Політика конфіденційності</p>
            </button>
          </div>
        </div>
        <div className={s.bottom__footer}>
          <div className={s.bottom__inf}>
            <button>
              <p>Пошук</p>
            </button>
            <button>
              <p>Підтримка</p>
            </button>
            <button>
              <p>Інформація</p>
            </button>
            <button>
              <p>Політика конфіденційності</p>
            </button>
            <button>
              <p>Політика конфіденційності</p>
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
