import React, { useMemo } from "react";
import s from "./WishlistButton.module.css";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as fasHeart } from "@fortawesome/free-regular-svg-icons";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../store/actions/wishlistActions";

const WishlistButton = ({
  product,
  addToWishlist,
  removeFromWishlist,
  wishlistProducts,
}) => {
  const { _id } = product;
  const isInWishlist = useMemo(
    () => localStorage.getItem("_wishlist")?.includes(_id),
    [_id, wishlistProducts]
  );

  const switchWishlist = () =>
    isInWishlist ? removeFromWishlist(product) : addToWishlist(product);
  return (
    <FontAwesomeIcon
      icon={isInWishlist ? faHeart : fasHeart}
      onClick={switchWishlist}
      className={s.icon}
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
    addToWishlist: (product) => dispatch(addToWishlist(product)),
    removeFromWishlist: (product) => dispatch(removeFromWishlist(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WishlistButton);
