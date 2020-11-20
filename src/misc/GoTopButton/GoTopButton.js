import React, { useEffect, useState } from "react";
import s from "./GoTopButton.module.css";
import { ReactComponent as ArrowUp } from "../../assets/arrow-up.svg";
import Button from "../Button/Button";
import ScrollListener from "react-scroll-listener";

const GoTopButton = () => {
  const [isTopButtonVisible, setTopButtonVisible] = useState(false);

  const scrollTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  const onScroll = () => {
    const scrollTopValue = window.pageYOffset;
    if (scrollTopValue >= 600) {
      setTopButtonVisible(true);
    } else if (scrollTopValue < 600) {
      setTopButtonVisible(false);
    }
  };

  useEffect(() => {
    const scrollListener = new ScrollListener();
    scrollListener.addScrollHandler("1", onScroll);
  }, []);
  return (
    !!isTopButtonVisible && (
      <Button className={s.arrow__button} onClick={scrollTop}>
        <ArrowUp className={s.arrow__button__icon} />
      </Button>
    )
  );
};

export default GoTopButton;
