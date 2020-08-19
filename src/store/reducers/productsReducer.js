import uuid from "react-uuid";
import {
  SET_PRODUCTS,
  SET_RECOMMENDED,
  SET_NEW,
  SET_FILTERED_PRODUCTS,
  SET_CATEGORIES,
  SET_SEARCH_VALUE,
  SET_HIGHRATING_PRODUCTS,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  ADD_PRODUCT,
  DELETE_PRODUCT,
} from "../actions/actionTypes";

const initialState = {
  recommended: [],
  popular: [
    {
      title: "toothbrush",
      gallery: ["https://www.randomlists.com/img/things/toothbrush.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
      id: uuid(),
    },
    {
      title: "glow stick",
      gallery: ["https://www.randomlists.com/img/things/glow_stick.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
      id: uuid(),
    },
    {
      title: "vase",
      gallery: ["https://www.randomlists.com/img/things/vase.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
      id: uuid(),
    },
    {
      title: "pencil",
      gallery: ["https://www.randomlists.com/img/things/pencil.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
      id: uuid(),
    },
    {
      title: "fridge",
      gallery: ["https://www.randomlists.com/img/things/fridge.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
      id: uuid(),
    },
  ],
  highRating: [],
  new: [],
  all: [],
  filtered: [],
  categories: [],
  filteredQuantity: null,
  quantity: null,
  searchValue: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        all: action.products,
        quantity: action.quantity,
        filtered: action.products,
        filteredQuantity: action.quantity,
      };
    case SET_RECOMMENDED:
      return {
        ...state,
        recommended: action.recommendedProducts,
      };
    case SET_NEW:
      return {
        ...state,
        new: action.newProducts,
      };
    case SET_FILTERED_PRODUCTS:
      return {
        ...state,
        filtered: action.products,
        filteredQuantity: action.quantity,
      };
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.categories,
      };
    case SET_SEARCH_VALUE:
      return {
        ...state,
        searchValue: action.searchValue,
      };
    case SET_HIGHRATING_PRODUCTS:
      return {
        ...state,
        highRating: action.products,
      };
    case ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.category],
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category._id !== action.id
        ),
      };
    case ADD_PRODUCT:
      return {
        ...state,
        all: [...state.all, action.product],
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        all: state.all.filter((product) => product._id !== action.id),
        filtered: state.all.filter((product) => product._id !== action.id),
        filteredQuantity: state.filteredQuantity - 1,
        quantity: state.quantity - 1,
        highRating: state.highRating.filter(
          (product) => product._id !== action.id
        ),
        new: state.new.filter((product) => product._id !== action.id),
      };
    default:
      return state;
  }
};
