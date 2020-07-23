import React, { useMemo } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as fasHeart } from "@fortawesome/free-regular-svg-icons";
import s from "./WishlistButton.module.css";
import {
  addToWishlistAction,
  removeFromWishlistAction,
} from "../../store/actions/wishlistActions";

const WishlistButton = ({
  product,
  addToWishlist,
  removeFromWishlist,
  wishlistProducts,
  className,
  ...rest
}) => {
  const { _id } = product;
  const isInWishlist = useMemo(
    () => localStorage.getItem("_wishlist")?.includes(_id),
    [_id, wishlistProducts]
  );

  const switchWishlist = () => {
    return isInWishlist ? removeFromWishlist(product) : addToWishlist(product);
  };
  return (
    <FontAwesomeIcon
      icon={isInWishlist ? faHeart : fasHeart}
      onClick={switchWishlist}
      className={`${s.icon} ${className}`}
      {...rest}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    wishlistProducts: state.wishlist.all,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToWishlist: (product) => dispatch(addToWishlistAction(product)),
    removeFromWishlist: (product) =>
      dispatch(removeFromWishlistAction(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WishlistButton);
