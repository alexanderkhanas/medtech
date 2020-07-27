import { combineReducers } from "redux";
import mainReducer from "./productsReducer";
import newsReducer from "./newsReducer";
import cartReducer from "./cartReducer";
import singleProductReducer from "./singleProductReducer";
import wishlistReducer from "./wishlistReducer";
import baseReducer from "./baseReducer";
import alertReducer from "./alertReducer";
import profileReducer from "./profileReducer";

export default combineReducers({
  products: mainReducer,
  news: newsReducer,
  cart: cartReducer,
  single: singleProductReducer,
  wishlist: wishlistReducer,
  base: baseReducer,
  alert: alertReducer,
  profile: profileReducer,
});
