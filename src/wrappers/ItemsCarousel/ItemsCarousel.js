import React from "react";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

const ItemsCarousel = ({
  children,
  arrows = true,
  dots = false,
  slidesPerPage = Math.floor(window.innerWidth / 350),
}) => {
  return (
    <Carousel
      {...{ arrows }}
      {...{ dots }}
      offset={10}
      {...{ slidesPerPage }}
      infinite
      lazyLoad={true}
    >
      {children}
    </Carousel>
  );
};

export default ItemsCarousel;
