import React from "react";
import s from "./Wishlist.module.css";
import { connect } from "react-redux";
import HorizontalProductCard from "../../misc/HorizontalProductCard/HorizontalProductCard";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
import ProductCard from "../../misc/ProductCard/ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faStoreAlt } from "@fortawesome/free-solid-svg-icons";
import BreadCrumbs from "../../misc/BreadCrumbs/BreadCrumbs";
import { Link } from "react-router-dom";
import Button from "../../misc/Button/Button";
import GoCatalogBtn from "../../misc/GoCatalogBtn/GoCatalogBtn";

const Wishlist = ({ wishlistProducts }) => {
  const breadCrumbsItems = [
    {
      name: "Головна",
      path: "/",
      icon: <FontAwesomeIcon icon={faHome} />,
    },
    { name: "Улюблені", path: "/wishlist" },
  ];
  console.log("wishlistProducts ===", wishlistProducts);

  return (
    <>
      <div className={s.title__container}>
        <h1 className={s.title}>Улюблені товари</h1>
        <BreadCrumbs items={breadCrumbsItems} />
      </div>
      <FixedWrapper>
        <div className={s.container}>
          <div className={s.products__container}>
            {wishlistProducts.map((product, i) =>
              window.innerWidth >= 800 ? (
                <HorizontalProductCard
                  {...{ product }}
                  className={s.desktop__card}
                  key={product._id}
                />
              ) : (
                <ProductCard
                  {...{ product }}
                  className={s.mobile__card}
                  key={product._id}
                />
              )
            )}
          </div>
          {!wishlistProducts?.length && (
            <div className={s.empty__msg__container}>
              <h1 className={s.empty__msg}>
                Ваш список улюблених товарів порожній
              </h1>
              <div className={s.catalog__btn}>
                <GoCatalogBtn />
              </div>
            </div>
          )}
        </div>
      </FixedWrapper>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    wishlistProducts: state.wishlist.all,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
