import { combineReducers } from "redux";
import mainReducer from "./productsReducer";
import newsReducer from "./newsReducer";
import cartReducer from "./cartReducer";
import singleProductReducer from "./singleProductReducer";
import wishlistReducer from "./wishlistReducer";
import baseReducer from "./baseReducer";

export default combineReducers({
  products: mainReducer,
  news: newsReducer,
  cart: cartReducer,
  single: singleProductReducer,
  wishlist: wishlistReducer,
  base: baseReducer,
});
