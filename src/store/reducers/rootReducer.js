import mainReducer from "./productsReducer";
import { combineReducers } from "redux";

export default combineReducers({ products: mainReducer });
