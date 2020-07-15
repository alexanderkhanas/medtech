import mainReducer from "./productsReducer";
import { combineReducers } from "redux";
import newsReducer from "./newsReducer";

export default combineReducers({ products: mainReducer, news: newsReducer });
