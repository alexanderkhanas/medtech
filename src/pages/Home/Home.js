import React, { useState, useEffect } from "react";
import s from "./Home.module.css";
import ImageCarousel from "../../misc/Carousel/Carousel";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import { connect } from "react-redux";
import ProductCard from "../../misc/ProductCard/ProductCard";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
import AdvantagesCard from "../../misc/AdvantagesCard/AdvantagesCard";

import NewsCard from "../../misc/NewsCard/NewsCard";
import ItemsCarousel from "../../wrappers/ItemsCarousel/ItemsCarousel";

const Home = ({ products, recentNews }) => {
  const {
    bestRatingProducts,
    recommendedProducts,
    popularProducts,
    newProducts,
    allProducts,
  } = products;
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  useEffect(() => {
    console.log("recommendedProducts ===", recommendedProducts);
  }, [recommendedProducts]);

  return (
    <div>
      <ImageCarousel
        images={[
          "//cdn.shopify.com/s/files/1/0023/8075/9140/files/slider-sm3_767x.jpg?v=1543380475",
          "//cdn.shopify.com/s/files/1/0023/8075/9140/files/slider01_2000x.jpg?v=1543380436",
          "//cdn.shopify.com/s/files/1/0023/8075/9140/files/slider02_2000x.jpg?v=1543380453",
          "https://vsetrts.ru/images/article/1568969241-3.jpg",
        ]}
      />
      <FixedWrapper className={s.tabs__container}>
        <div className={s.section}>
          <h3 className={s.tabs__title}>Обрати по категорії</h3>
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
              <ItemsCarousel
                arrows={true}
                offset={10}
                slidesPerPage={Math.floor(window.innerWidth / 350)}
                infinite
                lazyLoad={true}
              >
                {recommendedProducts.map((product, i) => (
                  <ProductCard key={i} {...{ product }} />
                ))}
              </ItemsCarousel>
            </TabPanel>
            <TabPanel className={s.tab__panel}>
              <ItemsCarousel
                arrows={true}
                offset={10}
                slidesPerPage={Math.floor(window.innerWidth / 350)}
                infinite
                lazyLoad={true}
              >
                {popularProducts.map((product, i) => (
                  <ProductCard key={i} {...{ product }} />
                ))}
              </ItemsCarousel>
            </TabPanel>

            <TabPanel className={s.tab__panel}>
              <ItemsCarousel
                arrows={true}
                offset={10}
                slidesPerPage={Math.floor(window.innerWidth / 350)}
                infinite
                lazyLoad={true}
              >
                {bestRatingProducts.map((product, i) => (
                  <ProductCard key={i} {...{ product }} />
                ))}
              </ItemsCarousel>
            </TabPanel>
          </Tabs>
        </div>
        <div className={`${s.section} ${s.advantages}`}>
          <h3 className={s.section__title}>Переваги</h3>
          <div className={s.advantages__cards}>
            <AdvantagesCard
              title="Доставка по всій Україні"
              bodyText="Для доставки використано сервіс Нова Пошта з можливістю оформлення та відстеження замовлень"
              imgSrc={require("../../assets/deliveryIcon.png")}
              mainColor="#019682"
            />
            <AdvantagesCard
              title="Час роботи"
              bodyText="Працюємо з 9-ої до 6-ої з понеділка до п'ятниці"
              imgSrc={require("../../assets/scheduleIcon.png")}
              mainColor="#009d66"
            />
            <AdvantagesCard
              title="Час роботи"
              bodyText="Працюємо з 9-ої до 6-ої з понеділка до п'ятниці"
              imgSrc={require("../../assets/scheduleIcon.png")}
              mainColor="#009d66"
            />
            <AdvantagesCard
              title="Доставка по всій Україні"
              bodyText="Для доставки використано сервіс Нова Пошта з можливістю оформлення та відстеження замовлень"
              imgSrc={require("../../assets/deliveryIcon.png")}
              mainColor="#019682"
            />
          </div>
        </div>
        <div className={s.section}>
          <h3 className={s.section__title}>Останні товари</h3>
          <ItemsCarousel
            arrows={true}
            slidesPerPage={Math.floor(window.innerWidth / 350)}
            infinite
            lazyLoad={true}
          >
            {newProducts.map((product, i) => (
              <ProductCard key={i} {...{ product }} />
            ))}
          </ItemsCarousel>
        </div>
        <div className={s.section}>
          <h3 className={s.section__title}>Новини</h3>
          <div className={s.news__container}>
            {recentNews.map(({ title, subtitle, bodyText, imgSrc }, i) => (
              <NewsCard
                {...{ title }}
                {...{ imgSrc }}
                {...{ subtitle }}
                {...{ bodyText }}
                key={i}
              />
            ))}
          </div>
        </div>
      </FixedWrapper>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    products: {
      recommendedProducts: state.products.recommended,
      popularProducts: state.products.popular,
      bestRatingProducts: state.products.bestRating,
      newProducts: state.products.new,
      allProducts: state.products.all,
    },
    recentNews: state.news.recent,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
