import React, { useRef, useEffect } from "react";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

import "./ItemsCarousel.css";

const ItemsCarousel = ({ children }) => {
  return (
    <Carousel
      arrows={true}
      offset={10}
      slidesPerPage={Math.floor(window.innerWidth / 350)}
      infinite
      lazyLoad={true}
    >
      {children}
    </Carousel>
  );
};

export default ItemsCarousel;
