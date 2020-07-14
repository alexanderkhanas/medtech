import React, { useState, useEffect } from "react";
import s from "./Carousel.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { ReactComponent as ArrowIcon } from "../../assets/next.svg";

const Carousel = ({ images, className }) => {
  const [activeImageId, setActiveImageId] = useState(0);
  const setNextImage = () => {
    setActiveImageId((prev) => (prev + 1 < images.length ? prev + 1 : 0));
  };
  const setPreviousImage = () => {
    setActiveImageId((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    console.log(activeImageId);
  }, [activeImageId]);

  return (
    <div className={`${s.container} ${className}`}>
      <img
        className={s.main__image}
        src={images[activeImageId]}
        alt="loading"
      />
      <div className={s.secondary__images}>
        {images[activeImageId + 1] ? (
          <>
            <img
              className={`${s.secondary__image} ${s.secondary__image__active}`}
              src={images[activeImageId]}
              alt="loading"
            />
            <img
              className={s.secondary__image}
              src={images[activeImageId + 1]}
              onClick={setNextImage}
              alt="loading"
            />
          </>
        ) : (
          <>
            <img
              className={s.secondary__image}
              src={images[activeImageId - 1]}
              onClick={setPreviousImage}
              alt="loading"
            />
            <img
              className={`${s.secondary__image} ${s.secondary__image__active}`}
              src={images[activeImageId]}
              alt="loading"
            />
          </>
        )}
        <div className={s.switch__buttons}>
          <button onClick={setNextImage} className={s.switch__button}>
            <ArrowIcon
              //   onClick={setNextImage}
              className={s.switch__button__icon}
            />
            {/* <FontAwesomeIcon
              icon={faArrowUp}
              className={s.switch__button__icon}
            /> */}
          </button>
          <button onClick={setPreviousImage} className={s.switch__button}>
            <ArrowIcon
              //   onClick={setPreviousImage}
              className={`${s.switch__button__icon} ${s.switch__button__icon__last}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
