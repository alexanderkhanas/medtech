import { combineReducers } from "redux";
import mainReducer from "./productsReducer";
import newsReducer from "./newsReducer";
import cartReducer from "./cartReducer";

export default combineReducers({
  products: mainReducer,
  news: newsReducer,
  cart: cartReducer,
});
