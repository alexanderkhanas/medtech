import React from "react";
import s from "./Home.module.css";
import Carousel from "../../misc/Carousel/Carousel";

const Home = (props) => {
  return (
    <div>
      <Carousel
        images={[
          "//cdn.shopify.com/s/files/1/0023/8075/9140/files/slider-sm3_767x.jpg?v=1543380475",
          "//cdn.shopify.com/s/files/1/0023/8075/9140/files/slider03_2000x.jpg?v=1543380470",
          "https://vsetrts.ru/images/article/1568969241-3.jpg",
        ]}
      />
    </div>
  );
};

export default Home;
