import React from "react";
import s from "./Wishlist.module.css";
import { connect } from "react-redux";
import HorizontalProductCard from "../../misc/HorizontalProductCard/HorizontalProductCard";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
import ProductCard from "../../misc/ProductCard/ProductCard";

const Wishlist = ({ products }) => {
  return (
    <FixedWrapper>
      <div className={s.container}>
        <h1 className={s.title}>Улюблені</h1>
        <div className={s.products__container}>
          {products.map((product, i) => (
            <HorizontalProductCard {...{ product }} key={product._id} />
          ))}
        </div>
      </div>
    </FixedWrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.wishlist.all,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
