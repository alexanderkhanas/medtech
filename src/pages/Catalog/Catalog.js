import React, { useState, useRef, useEffect } from "react";
import s from "./Catalog.module.css";
import { connect } from "react-redux";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
import ReactPaginate from "react-paginate";
import HorizontalProductCard from "../../misc/HorizontalProductCard/HorizontalProductCard";
import {
  getProductsByPage,
  getProductsByCategory,
} from "../../store/actions/productsActions";
import ProductCard from "../../misc/ProductCard/ProductCard";
import Category from "../../misc/Category/Category";
import { scrollToRef } from "../../utils/utils";
import Button from "../../misc/Button/Button";
import { faTh, faList } from "@fortawesome/free-solid-svg-icons";
import Select from "../../misc/Select/Select";

const sortSelectOption = [
  { value: "recommended", label: "Рекомендовані" },
  { value: "price to low", label: "За ціною, від меншої до більшої" },
  { value: "price to high", label: "За ціною, від більшої до меншої" },
];

const Catalog = ({
  products,
  productsQuantity,
  getProductsByPage,
  getProductsByCategory,
}) => {
  const [productViewType, setProductViewType] = useState("column");
  const [sortType, setSortType] = useState(sortSelectOption[0]);
  const containerRef = useRef();

  const onPageChange = async ({ selected }) => {
    getProductsByPage(selected + 1);
    scrollToRef(containerRef);
  };

  const onSortTypeChange = async (value) => {
    setSortType(value);
  };

  const switchProductViewType = () =>
    setProductViewType((prev) => (prev === "row" ? "column" : "row"));

  useEffect(() => {
    const obj = {};
    const parent = [
      { id: "123" },
      { id: "122143" },
      { id: "4444" },
      { id: "0000" },
    ];
    const subparent = [
      { id: "12___3", parentId: "122143" },
      { id: "000____", parentId: "122143" },
      { id: ")()_", parentId: "4444" },
      { id: "[][]]", parentId: "0000" },
    ];
    const child = [
      { id: "zxvzxv", parentId: "122143", subparentId: "000____" },
      { id: "xzvasqe", parentId: "122143", subparentId: "000____" },
      { id: "bzxc", parentId: "4444", subparentId: "000____" },
      { id: "asdasdas", parentId: "0000", subparentId: "[][]]" },
    ];
    Object.keys(parent).forEach((key) => {
      obj[key] = parent[key];
      // obj[key]
    });
  }, []);

  return (
    <div>
      <div className={s.title__container}>
        <h1 className={s.title}>Products</h1>
      </div>
      <FixedWrapper>
        <div className={s.container} ref={containerRef}>
          <div className={s.filter__container}>
            <h3 className={s.filter__title}>Фільтр</h3>
            <div className={s.filter__categories}>
              {["Support Stick", "Digital Thermometer"].map((category, i) => (
                <Category
                  onClick={() => getProductsByCategory()}
                  {...{ category }}
                  subcategories={{}}
                  key={i}
                />
              ))}
            </div>
          </div>
          <div className={s.main__content}>
            <div className={s.actions__container}>
              <div className={s.change__view__container}>
                <Button
                  onClick={switchProductViewType}
                  icon={faTh}
                  isSecondary={productViewType === "column"}
                />
                <Button
                  onClick={switchProductViewType}
                  icon={faList}
                  isSecondary={productViewType === "row"}
                />
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
              {products.map((product, i) =>
                productViewType === "row" ? (
                  <ProductCard
                    className={s.product__card}
                    key={i}
                    {...{ product }}
                  />
                ) : (
                  <HorizontalProductCard {...{ product }} key={i} />
                )
              )}
            </div>
          </div>
        </div>
        <ReactPaginate
          pageCount={productsQuantity / 20}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          {...{ onPageChange }}
          //   onPageChange={({ selected }) => console.log("e ===", selected)}
          containerClassName={s.pagination__container}
          activeClassName={s.pagination__active__link}
          previousLabel={"Попередня"}
          nextLabel="Наступна"
          pageClassName={s.pagination__link}
        />
      </FixedWrapper>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products.filtered,
    productsQuantity: state.products.filteredQuantity,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getProductsByPage: (page) => dispatch(getProductsByPage(page)),
    getProductsByCategory: (categoryId) =>
      dispatch(getProductsByCategory(categoryId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
