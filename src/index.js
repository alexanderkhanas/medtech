import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

// <React.StrictMode>
/* <Provider> */
/* </Provider> */
// </React.StrictMode>,

serviceWorker.unregister();
