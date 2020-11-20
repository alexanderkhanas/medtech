import React, { useEffect, useMemo, useRef, useState } from "react";
import s from "./Catalog.module.css";
import { connect } from "react-redux";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
import ReactPaginate from "react-paginate";
import HorizontalProductCard from "../../misc/HorizontalProductCard/HorizontalProductCard";
import {
  clearFilterAction,
  filterProductsAction,
  getCategoriesAction,
  getProductsByPage,
  getRecommendedProductsAction,
} from "../../store/actions/productsActions";
import ProductCard from "../../misc/ProductCard/ProductCard";
import { scrollToRef } from "../../utils/utils";
import Button from "../../misc/Button/Button";
import Select from "../../misc/Select/Select";
import ItemsCarousel from "../../wrappers/ItemsCarousel/ItemsCarousel";
import { setLoadingAction } from "../../store/actions/baseActions";
import BreadCrumbs from "../../misc/BreadCrumbs/BreadCrumbs";
import { ReactComponent as Home } from "../../assets/home.svg";
import { ReactComponent as Th } from "../../assets/th-solid.svg";
import { ReactComponent as List } from "../../assets/list-solid.svg";
import { withRouter } from "react-router";
import Category from "../../misc/Category/Category";
import GoTopButton from "../../misc/GoTopButton/GoTopButton";

const sortSelectOption = [
  { value: "recommended", label: "Рекомендовані" },
  { value: "priceMinus", label: "За ціною, від меншої до більшої" },
  { value: "price", label: "За ціною, від більшої до меншої" },
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
  searchValue,
  match: { params },
  history: h,
  location,
  getRecommendedProducts,
}) => {
  const [productViewType, setProductViewType] = useState("row");
  const [sortType, setSortType] = useState(sortSelectOption[0]);
  const containerRef = useRef();
  const [sortedCategories, setSortedCategories] = useState([]);
  // const [isFilterAnimation, setFilterAnimation] = useState(true);
  const [activePage, setActivePage] = useState(1);

  const [breadCrumbsItems, setBreadCrumbsItems] = useState([
    {
      name: "Головна",
      path: "/",
      icon: <Home className={s.bread__crumbs} />,
    },
    { name: "Каталог", path: "/catalog" },
  ]);

  const { parentID, subParentID, childID } = params || {};

  const onPageChange = ({ selected }) => {
    setActivePage(selected + 1);
    scrollToRef(containerRef);
  };

  const onSortTypeChange = (value) => {
    setSortType(value);
  };

  const selectCategory = (categoryId) => {
    h.push(`${location.pathname}/${categoryId}`);
  };

  const switchProductViewType = () => {
    setProductViewType((prev) => (prev === "row" ? "column" : "row"));
  };
  const selectedCategories = useMemo(() => {
    const temp = [];
    let parent;
    let subParent;
    Object.values(params).forEach((categoryID, i) => {
      let foundCategory;
      if (!parent) {
        foundCategory = sortedCategories.find(({ _id }) => _id === categoryID);
        parent = foundCategory;
      } else if (parent && !subParent) {
        foundCategory = parent.subChildren.find(
          ({ _id }) => _id === categoryID
        );
        subParent = foundCategory;
      } else {
        foundCategory = subParent.children.find(
          ({ _id }) => _id === categoryID
        );
      }
      if (foundCategory) {
        temp.push(foundCategory);
      }
    });
    return temp;
  }, [params, sortedCategories]);

  const [
    selectedParentCategory,
    selectedSubParentCategory,
  ] = selectedCategories;

  const categoriesToDisplay = useMemo(() => {
    if (!selectedParentCategory) {
      return sortedCategories;
    }
    if (childID) {
      return [];
    }
    let temp = [];
    temp = subParentID
      ? selectedSubParentCategory?.children
      : selectedParentCategory?.subChildren;
    return temp || [];
  }, [selectedCategories, sortedCategories]);

  useEffect(() => {
    filterProducts(
      childID || subParentID || parentID,
      searchValue,
      activePage,
      sortType.value
    );
  }, [activePage, sortType, params]);

  useEffect(() => {
    const tempBreadCrumbs = [
      {
        name: "Головна",
        path: "/",
        icon: <Home className={s.bread__crumbs} />,
      },
      { name: "Каталог", path: "/catalog" },
    ];

    if (selectedCategories.length) {
      let categoriesPathString = "/catalog";

      selectedCategories.forEach(({ _id, title }) => {
        categoriesPathString += `/${_id}`;
        tempBreadCrumbs.push({ name: title, path: categoriesPathString });
      });
    }

    setBreadCrumbsItems(tempBreadCrumbs);
  }, [selectedCategories]);

  useEffect(() => {
    let filtered = categories.map((category) => {
      const categoryCopy = { ...category };
      return !category.parent.length && !category.sub.length
        ? { ...categoryCopy, subChildren: [], children: [] }
        : null;
    });

    filtered = filtered.filter((el) => !!el);

    categories.forEach((category) => {
      if (category.parent.length && !category.sub.length) {
        Object.keys(filtered).forEach((key) => {
          if (filtered[key]._id === category.parent[0]._id) {
            filtered[key].subChildren = [
              ...filtered[key].subChildren,
              { ...category, children: [] },
            ];
          }
        });
      }
    });
    Object.keys(filtered).forEach((key) => {
      const parent = filtered[key];
      parent.subChildren.forEach((subchild, i) => {
        categories.forEach((category) => {
          if (subchild?._id === category.sub[0]?._id) {
            parent.subChildren[i].children.push(category);
          }
        });
      });
    });
    setSortedCategories(filtered);
  }, [categories]);

  useEffect(() => {}, [params]);

  const isEmptyResults = !filteredProducts.length && !isLoading;

  useEffect(() => {
    if (!categories?.length) {
      getCategories();
    }
    if (!recommendedProducts?.length) {
      getRecommendedProducts();
    }
  }, []);

  return (
    <div>
      <div className={s.title__container}>
        <h1 className={s.title}>Товари</h1>
        <BreadCrumbs items={breadCrumbsItems} />
      </div>
      <FixedWrapper>
        <div className={s.filter__container}>
          <div className={s.filter__list}>
            <div className={s.filter__title__container}>
              <h3 className={s.filter__title}>Фільтр</h3>
            </div>
            {categoriesToDisplay?.map((category) => (
              <p
                key={category._id}
                onClick={() => selectCategory(category._id)}
                className={s.filter__category}
              >
                {category.title}
              </p>
            ))}
          </div>
          <div className={s.categories__container}>
            {categoriesToDisplay?.map((category) => (
              <Category
                {...{ category }}
                key={category._id}
                onSelect={selectCategory}
              />
            ))}
          </div>
        </div>

        <div className={s.container} ref={containerRef}>
          <div className={s.main__content}>
            <div className={s.actions__container}>
              <div className={s.change__view__container}>
                <div>
                  <Button
                    onClick={switchProductViewType}
                    className={s.view__button}
                    isSecondary={productViewType === "column"}
                  >
                    <Th className={s.view__icon} />
                  </Button>
                </div>
                <div>
                  <Button
                    onClick={switchProductViewType}
                    className={s.view__button}
                    isSecondary={productViewType === "row"}
                  >
                    <List className={s.view__icon} />
                  </Button>
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
              {!!filteredProducts &&
                filteredProducts
                  .sort((a, b) => (a.quantity > b.quantity ? -1 : 1))
                  .map((product, i) =>
                    productViewType === "row" ? (
                      <div className={s.product__card__container}>
                        <ProductCard
                          className={s.product__card}
                          key={product._id}
                          {...{ product }}
                        />
                      </div>
                    ) : (
                      <HorizontalProductCard
                        {...{ product }}
                        key={product._id}
                      />
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
                  slidesPerPage={Math.floor(window.innerWidth / 450) || 1}
                >
                  {recommendedProducts.map((product, i) => (
                    <ProductCard
                      className={s.product__card}
                      {...{ product }}
                      key={product._id}
                    />
                  ))}
                </ItemsCarousel>
              </div>
            )}
          </div>
        </div>
        <ReactPaginate
          pageCount={Math.ceil(filteredProductsQuantity / 24)}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          {...{ onPageChange }}
          containerClassName={s.pagination__container}
          activeClassName={s.pagination__active__link}
          previousLabel=""
          nextLabel=""
          pageClassName={s.pagination__link}
        />
        <GoTopButton />
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
    searchValue: state.products.searchValue,
    products: state.products.all,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getProductsByPage: (page, categoryId, searchValue) =>
      dispatch(getProductsByPage(page, categoryId, searchValue)),
    filterProducts: (categoryId, searchValue, page, sortType) =>
      dispatch(filterProductsAction(categoryId, searchValue, page, sortType)),
    setLoading: (isLoading) => dispatch(setLoadingAction(isLoading)),
    getCategories: () => dispatch(getCategoriesAction()),
    clearFilter: (products) => dispatch(clearFilterAction(products)),
    getRecommendedProducts: () => dispatch(getRecommendedProductsAction()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Catalog)
);
