import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./misc/Header/Header";
import Auth from "./pages/Auth/Auth";

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/login">
          <Auth />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
