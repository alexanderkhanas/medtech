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
import { Link } from "react-router-dom";
import { getAllNewsAction } from "../../store/actions/newsActions";
import {
  getCategoriesAction,
  getProducts,
  getHighRatingProductsAction,
} from "../../store/actions/productsActions";

const Home = ({
  products,
  recentNews,
  windowWidth,
  getNews,
  getCategories,
  getHighRatingProducts,
}) => {
  const {
    highRatingProducts,
    recommendedProducts,
    popularProducts,
    newProducts,
    allProducts,
  } = products;

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  useEffect(() => {
    (async () => {
      if (!allProducts.length) {
        await getCategories();
        await getHighRatingProducts();
        await getNews();
      }
    })();
  }, []);

  let slidesPerPage = Math.floor(windowWidth / 350);

  if (slidesPerPage > 4) {
    slidesPerPage = 4;
  } else if (slidesPerPage < 1) {
    slidesPerPage = 1;
  }

  return (
    <div>
      <ImageCarousel
        images={[
          require("../../assets/home1.webp"),
          require("../../assets/home2.webp"),
          require("../../assets/home3.webp"),
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
              <ItemsCarousel arrows {...{ slidesPerPage }} infinite>
                {recommendedProducts.map((product, i) => (
                  <ProductCard key={product._id} {...{ product }} />
                ))}
              </ItemsCarousel>
            </TabPanel>
            <TabPanel className={s.tab__panel}>
              <ItemsCarousel arrows {...{ slidesPerPage }} infinite>
                {popularProducts.map((product, i) => (
                  <ProductCard key={product._id} {...{ product }} />
                ))}
              </ItemsCarousel>
            </TabPanel>

            <TabPanel className={s.tab__panel}>
              <ItemsCarousel arrows offset={10} {...{ slidesPerPage }} infinite>
                {highRatingProducts.map((product, i) => (
                  <ProductCard key={product._id} {...{ product }} />
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
              mainColor="#2bbd86"
            />
            <AdvantagesCard
              title="Час роботи"
              bodyText="Працюємо з 9-ої до 6-ої з понеділка до п'ятниці"
              imgSrc={require("../../assets/scheduleIcon.png")}
              mainColor="#2bbd86"
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
          <ItemsCarousel arrows {...{ slidesPerPage }} infinite>
            {newProducts.map((product, i) => (
              <ProductCard key={product._id} {...{ product }} />
            ))}
          </ItemsCarousel>
        </div>
        <div className={s.section}>
          <Link to="/news">
            <h3 className={s.section__title}>Новини</h3>
          </Link>
          <div className={s.news__container}>
            {recentNews.slice(0, 3).map((newsItem, i) => (
              <NewsCard {...{ newsItem }} key={newsItem._id} />
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
      highRatingProducts: state.products.highRating,
      newProducts: state.products.new,
      allProducts: state.products.all,
    },
    recentNews: state.news.recent,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getNews: () => dispatch(getAllNewsAction()),
    getCategories: () => dispatch(getCategoriesAction()),
    getHighRatingProducts: () => dispatch(getHighRatingProductsAction()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
