import React, { useState, useRef, useEffect } from "react";
import s from "./Catalog.module.css";
import { connect } from "react-redux";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
import ReactPaginate from "react-paginate";
import HorizontalProductCard from "../../misc/HorizontalProductCard/HorizontalProductCard";
import {
  getProductsByPage,
  filterProductsAction,
  getCategoriesAction,
} from "../../store/actions/productsActions";
import ProductCard from "../../misc/ProductCard/ProductCard";
import Category from "../../misc/Category/Category";
import { scrollToRef } from "../../utils/utils";
import Button from "../../misc/Button/Button";
import { faTh, faList } from "@fortawesome/free-solid-svg-icons";
import Select from "../../misc/Select/Select";
import ItemsCarousel from "../../wrappers/ItemsCarousel/ItemsCarousel";
import { setLoadingAction } from "../../store/actions/baseActions";
import { SET_FILTERED_PRODUCTS } from "../../store/actions/actionTypes";
import CategoryAccordion from "../../misc/CategoryAccordion/CategoryAccordion";

const sortSelectOption = [
  { value: "recommended", label: "Рекомендовані" },
  { value: "price to low", label: "За ціною, від меншої до більшої" },
  { value: "price to high", label: "За ціною, від більшої до меншої" },
];

const Catalog = ({
  filteredProducts,
  filteredProductsQuantity,
  getProductsByPage,
  recommendedProducts,
  filterProducts,
  isLoading,
  getCategories,
  categories,
}) => {
  const [productViewType, setProductViewType] = useState("row");
  const [sortType, setSortType] = useState(sortSelectOption[0]);
  const containerRef = useRef();
  const [sortedCategories, setSortedCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const onPageChange = ({ selected }) => {
    getProductsByPage(selected + 1);
    scrollToRef(containerRef);
  };

  const onSortTypeChange = (value) => {
    setSortType(value);
  };

  const selectCategory = (categoryTitle) => {
    setSelectedCategories((prev) => [...prev, categoryTitle]);
  };

  const removeCategory = (categoryTitle) => {
    setSelectedCategories((prev) =>
      prev.filter((selectedCategory) => selectedCategory !== categoryTitle)
    );
  };

  const switchProductViewType = () =>
    setProductViewType((prev) => (prev === "row" ? "column" : "row"));

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    let filtered = categories.map((category) => {
      const categoryCopy = { ...category };
      return !category.parent.length && !category.sub.length
        ? { ...categoryCopy, subchilds: [], childs: {} }
        : null;
    });

    filtered = filtered.filter((el) => !!el);

    categories.forEach((category) => {
      if (category.parent.length && !category.sub.length) {
        Object.keys(filtered).forEach((key) => {
          if (filtered[key]._id === category.parent[0]._id) {
            filtered[key].subchilds = [...filtered[key].subchilds, category];
          }
        });
      }
    });
    Object.keys(filtered).forEach((key) => {
      const parent = filtered[key];
      parent.subchilds.forEach((subchild) => {
        categories.forEach((category, i) => {
          if (category.sub.length) {
            if (subchild._id === category.sub[0]._id) {
              let childKey = parent.childs[subchild._id];
              childKey = parent.childs[subchild._id] || [];
              parent.childs = {
                ...parent.childs,
                [subchild._id]: [...childKey, category],
              };
            }
          }
        });
      });
    });
    setSortedCategories(filtered);
  }, [categories]);

  const isEmptyResults = !filteredProducts.length && !isLoading;

  useEffect(() => {
    console.log("selectedCategories ===", selectedCategories);
  }, [selectedCategories]);

  /*
  array.map((el) => (
    <div className = {el.id === "x" ? "lyaps" : "chinanen"}>
    </div>
  ))
  */

  return (
    <div>
      <div className={s.title__container}>
        <h1 className={s.title}>Products</h1>
      </div>
      <FixedWrapper>
        <div className={s.container} ref={containerRef}>
          <div className={s.filter__container}>
            <div className={s.filter__body}>
              <h3 className={s.filter__title}>Фільтр</h3>
              <div className={s.filter__categories}>
                {sortedCategories.map((parent) => (
                  <CategoryAccordion
                    {...{ selectCategory }}
                    {...{ removeCategory }}
                    {...{ selectedCategories }}
                    {...{ parent }}
                    key={parent._id}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className={s.main__content}>
            <div className={s.actions__container}>
              <div className={s.change__view__container}>
                <div>
                  <Button
                    onClick={switchProductViewType}
                    icon={faTh}
                    isSecondary={productViewType === "column"}
                  />
                </div>
                <div>
                  <Button
                    onClick={switchProductViewType}
                    icon={faList}
                    isSecondary={productViewType === "row"}
                  />
                </div>
              </div>
              <div className={s.sort__container}>
                <span>Тип сортування</span>
                <Select
                  onSelect={onSortTypeChange}
                  value={sortType.label}
                  options={sortSelectOption}
                />
              </div>
            </div>
            <div className={s.products}>
              {filteredProducts.map((product, i) =>
                productViewType === "row" ? (
                  <ProductCard
                    className={s.product__card}
                    key={product._id}
                    {...{ product }}
                  />
                ) : (
                  <HorizontalProductCard {...{ product }} key={product._id} />
                )
              )}
            </div>
            {isEmptyResults && (
              <h2 className={s.empty__result__msg}>
                Нажаль товарів за вашим запитом не знайдено.
              </h2>
            )}
            {isEmptyResults && (
              <div className={s.carousel__container}>
                <ItemsCarousel
                  arrows
                  slidesPerPage={Math.floor(window.innerWidth / 450)}
                  infinite
                >
                  {recommendedProducts.map((product, i) => (
                    <ProductCard {...{ product }} key={product._id} />
                  ))}
                </ItemsCarousel>
              </div>
            )}
          </div>
        </div>
        <ReactPaginate
          pageCount={filteredProductsQuantity / 20}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          {...{ onPageChange }}
          //   onPageChange={({ selected }) => console.log("e ===", selected)}
          containerClassName={s.pagination__container}
          activeClassName={s.pagination__active__link}
          previousLabel=""
          nextLabel=""
          pageClassName={s.pagination__link}
        />
      </FixedWrapper>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    filteredProducts: state.products.filtered,
    filteredProductsQuantity: state.products.filteredQuantity,
    recommendedProducts: state.products.recommended,
    isLoading: state.base.isLoading,
    categories: state.products.categories,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getProductsByPage: (page) => dispatch(getProductsByPage(page)),
    filterProducts: (categoryId, searchValue) =>
      dispatch(filterProductsAction(categoryId, searchValue)),
    setLoading: (isLoading) => dispatch(setLoadingAction(isLoading)),
    getCategories: () => dispatch(getCategoriesAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
