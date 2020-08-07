import React, { useState, useEffect } from "react";
import s from "./Carousel.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faStoreAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Transition } from "react-transition-group";
import { Link } from "react-router-dom";
import Button from "../Button/Button";

const Carousel = ({ images, className }) => {
  const [activeImageId, setActiveImageId] = useState(0);
  const [isAnimation, setAnimation] = useState(false);

  const setNextImage = () => {
    setActiveImageId((prev) => (prev + 1 < images.length ? prev + 1 : 0));
  };
  const setPreviousImage = () => {
    setActiveImageId((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    setAnimation((prev) => !prev);
  }, [activeImageId]);

  return (
    <div className={`${s.container} ${className}`}>
      <Transition in={isAnimation} timeout={400}>
        {(state) => {
          const transitionStyle = {
            entering: { opacity: 0.7 },
            entered: { opacity: 1 },
            exiting: { opacity: 0.7 },
            exited: { opacity: 1 },
          };
          return (
            <img
              className={s.main__image}
              src={images[activeImageId]}
              alt="loading"
              style={transitionStyle[state]}
            />
          );
        }}
      </Transition>

      <FontAwesomeIcon
        onClick={setNextImage}
        icon={faChevronLeft}
        className={`${s.switch__button} ${s.switch__button__left}`}
      />
      <FontAwesomeIcon
        onClick={setPreviousImage}
        icon={faChevronRight}
        className={`${s.switch__button} ${s.switch__button__right}`}
      />
      <Link to="/catalog" className={s.catalog__btn__container}>
        <Button title="Перейти до покупок" className={s.catalog__btn} size="sm">
          <FontAwesomeIcon icon={faStoreAlt} className={s.catalog__btn__icon} />
        </Button>
      </Link>
    </div>
  );
};

export default Carousel;
