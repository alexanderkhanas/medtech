import React from "react";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

const ItemsCarousel = ({
  children,
  arrows = window.innerWidth > 500,
  dots = window.innerWidth < 500,
  slidesPerPage = Math.ceil(window.innerWidth / 350) || 1,
}) => {
  return (
    <Carousel {...{ arrows }} {...{ dots }} {...{ slidesPerPage }}>
      {children}
    </Carousel>
  );
};

export default ItemsCarousel;
