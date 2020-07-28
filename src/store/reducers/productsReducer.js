import uuid from "react-uuid";
import {
  SET_PRODUCTS,
  SET_RECOMMENDED,
  SET_NEW,
  SET_FILTERED_PRODUCTS,
  SET_CATEGORIES,
  SET_SEARCH_VALUE,
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
  bestRating: [
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
  ],
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
    default:
      return state;
  }
};
