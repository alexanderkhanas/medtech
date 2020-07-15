import React, { useState } from "react";
import s from "./Home.module.css";
import Carousel from "../../misc/Carousel/Carousel";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import { connect } from "react-redux";
import ProductCard from "../../misc/ProductCard/ProductCard";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
const Home = ({ bestRatingProducts, featuredProducts, popularProducts }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  return (
    <div>
      <Carousel
        images={[
          "//cdn.shopify.com/s/files/1/0023/8075/9140/files/slider-sm3_767x.jpg?v=1543380475",
          "//cdn.shopify.com/s/files/1/0023/8075/9140/files/slider01_2000x.jpg?v=1543380436",
          "//cdn.shopify.com/s/files/1/0023/8075/9140/files/slider02_2000x.jpg?v=1543380453",
          "https://vsetrts.ru/images/article/1568969241-3.jpg",
        ]}
      />
      <FixedWrapper className={s.tabs__container}>
        <h1 className={s.tabs__title}>Обрати по категорії</h1>
        <Tabs>
          <TabList className={s.tabs}>
            {["Рекомендовані", "Найпопулярніші", "Найвища оцінка"].map(
              (item, i) => (
                <Tab
                  onClick={() => setActiveTabIndex(i)}
                  key={i}
                  className={
                    activeTabIndex === i ? `${s.tab} ${s.tab__active}` : s.tab
                  }
                >
                  {item}
                </Tab>
              )
            )}
          </TabList>
          <TabPanel className={s.tab__panel}>
            {featuredProducts.map((product, i) => (
              <ProductCard key={i} {...{ product }} />
            ))}
          </TabPanel>
          <TabPanel className={s.tab__panel}>
            {popularProducts.map((product, i) => (
              <ProductCard key={i} {...{ product }} />
            ))}
          </TabPanel>
          <TabPanel className={s.tab__panel}>
            {bestRatingProducts.map((product, i) => (
              <ProductCard key={i} {...{ product }} />
            ))}
          </TabPanel>
        </Tabs>
      </FixedWrapper>
      <FixedWrapper>
        <div className={s.advantages}>
          <h2 className={s.advantages__title}>Переваги</h2>
        </div>
      </FixedWrapper>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    featuredProducts: state.products.featured,
    popularProducts: state.products.popular,
    bestRatingProducts: state.products.bestRating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
