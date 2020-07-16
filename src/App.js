import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./misc/Header/Header";
import Auth from "./pages/Auth/Auth";
import Register from "./pages/Register/Register";
import RestorePassord from "./pages/RestorePassword/RestorePassord";
import NewPassword from "./pages/NewPassword/NewPassword";
import Footer from "./misc/Footer/Footer";

const App = () => {
  return (
    <Router>
      {window.innerWidth > 500 && <Header />}{" "}
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/login">
          <Auth />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/restore">
          <RestorePassord />
        </Route>
        <Route path="/new-password">
          <NewPassword />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
