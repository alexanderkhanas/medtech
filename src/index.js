import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import rootReducer from "./store/reducers/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import "./fonts/Nunito/Nunito-Black.ttf";
import "./fonts/Nunito/Nunito-BlackItalic.ttf";
import "./fonts/Nunito/Nunito-Bold.ttf";
import "./fonts/Nunito/Nunito-ExtraBold.ttf";
import "./fonts/Nunito/Nunito-ExtraBoldItalic.ttf";
import "./fonts/Nunito/Nunito-ExtraLight.ttf";
import "./fonts/Nunito/Nunito-ExtraLightItalic.ttf";
import "./fonts/Nunito/Nunito-Italic.ttf";
import "./fonts/Nunito/Nunito-Light.ttf";
import "./fonts/Nunito/Nunito-LightItalic.ttf";
import "./fonts/Nunito/Nunito-Regular.ttf";
import "./fonts/Nunito/Nunito-SemiBold.ttf";
import "./fonts/Nunito/Nunito-SemiBoldItalic.ttf";
import "./fonts/Roboto/Roboto-Black.ttf";
import "./fonts/Roboto/Roboto-BlackItalic.ttf";
import "./fonts/Roboto/Roboto-Bold.ttf";
import "./fonts/Roboto/Roboto-BoldItalic.ttf";
import "./fonts/Roboto/Roboto-Italic.ttf";
import "./fonts/Roboto/Roboto-Light.ttf";
import "./fonts/Roboto/Roboto-LightItalic.ttf";
import "./fonts/Roboto/Roboto-Medium.ttf";
import "./fonts/Roboto/Roboto-MediumItalic.ttf";
import "./fonts/Roboto/Roboto-Regular.ttf";
import "./fonts/Roboto/Roboto-Thin.ttf";
import "./fonts/Roboto/Roboto-ThinItalic.ttf";

const composeEnhancers = composeWithDevTools({});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider {...{ store }}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// <React.StrictMode>
/* <Provider> */
/* </Provider> */
// </React.StrictMode>,

serviceWorker.unregister();
