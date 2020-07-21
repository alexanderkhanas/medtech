import React, { useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./misc/Header/Header";
import SingleProduct from "./pages/SingleProduct/SingleProduct";
import Cart from "./pages/Cart/Cart";
import { setCart } from "./store/actions/cartActions";
import { connect } from "react-redux";
import { getProducts } from "./store/actions/productsActions";
import Footer from "./misc/Footer/Footer";
import Catalog from "./pages/Catalog/Catalog";
import _axios from "./store/api/_axios";

const Login = lazy(() => import("./pages/Auth/Auth"));
const Register = lazy(() => import("./pages/Register/Register"));
const RestorePassword = lazy(() => import("./pages/Register/Register"));
const NewPassword = lazy(() => import("./pages/Register/Register"));

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
      <Suspense fallback={<div>loading</div>}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/product/:id" component={SingleProduct} />
          <Route path="/cart" component={Cart} />
          <Route path="/catalog" component={Catalog} />
          <Route path="/login" component={(props) => <Login {...props} />} />
          <Route
            path="/register"
            component={(props) => <Register {...props} />}
          />
          <Route
            path="/restore"
            component={(props) => <RestorePassword {...props} />}
          />
          <Route
            path="/new-password"
            component={(props) => <NewPassword {...props} />}
          />
        </Switch>
      </Suspense>
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
