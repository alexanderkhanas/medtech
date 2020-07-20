import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./misc/Header/Header";
import Auth from "./pages/Auth/Auth";
import Register from "./pages/Register/Register";
import SingleProduct from "./pages/SingleProduct/SingleProduct";
import Cart from "./pages/Cart/Cart";
import {
  addToCart,
  removeFromCart,
  setCart,
} from "./store/actions/cartActions";
import { connect } from "react-redux";
import { getProducts } from "./store/actions/productsActions";
import Footer from "./misc/Footer/Footer";
import RestorePassword from "./pages/RestorePassword/RestorePassword";
import NewPassword from "./pages/NewPassword/NewPassword";

const App = ({ allProducts, setCart, getProducts }) => {
  const getLocalCart = () => localStorage.getItem("_cart")?.split(" ");
  useEffect(() => {
    (async () => {
      await getProducts();
    })();
  }, []);
  useEffect(() => {
    const ids = getLocalCart();
    console.log("ids", ids);
    console.log(allProducts);
    if (!ids) return;
    const cartProducts = allProducts.filter(
      (product) => ids && ids.includes(product._id)
    );
    setCart(cartProducts);
  }, [allProducts]);
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Auth} />
        <Route path="/register" component={Register} />
        <Route path="/product/:id" component={SingleProduct} />
        <Route path="/cart" component={Cart} />
        <Route path="/restore" component={RestorePassword} />
        <Route path="/new-password" component={NewPassword} />{" "}
      </Switch>
      <Footer />
    </Router>
  );
};

const mapStateToProps = (state) => {
  return {
    allProducts: state.products.all,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCart: (cart) => dispatch(setCart(cart)),
    getProducts: () => dispatch(getProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
