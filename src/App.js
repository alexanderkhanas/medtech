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
import { setWishlist } from "./store/actions/wishlistActions";
import NoMatchPage from "./pages/404/404";
import PublicOffer from "./misc/PublicOffer/PublicOffer";
import Politics from "./misc/Politics/Politics";
import SingleNews from "./pages/SingleNews/SingleNews";

const Login = lazy(() => import("./pages/Auth/Auth"));
const Register = lazy(() => import("./pages/Register/Register"));
const RestorePassword = lazy(() =>
  import("./pages/RestorePassword/RestorePassord")
);
const NewPassword = lazy(() => import("./pages/NewPassword/NewPassword"));
const Profile = lazy(() => import("./pages/Profile/Profile"));

const App = ({ allProducts, setCart, getProducts, setWishlist }) => {
  const getLocalCart = () => localStorage.getItem("_cart")?.split(" ");
  const getLocalWishlist = () => localStorage.getItem("_wishlist")?.split(" ");

  useEffect(() => {
    (async () => {
      await getProducts();
    })();
  }, []);

  useEffect(() => {
    const cartIds = getLocalCart();
    const cartProducts = cartIds
      ? allProducts.filter((product) => cartIds.includes(product._id))
      : [];
    setCart(cartProducts);

    const wishlistIds = getLocalWishlist();
    const wishlistProducts = wishlistIds
      ? allProducts.filter((product) => wishlistIds.includes(product._id))
      : [];
    setWishlist(wishlistProducts);
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
          <Route path="/public-offer" component={PublicOffer} />
          <Route path="/politics" component={Politics} />
          <Route path="/single-news/:id" component={SingleNews} />
          <Route
            path="/register"
            component={(props) => <Register {...props} />}
          />
          <Route path="/profile/:id" component={Profile} />
          <Route
            path="/restore"
            component={(props) => <RestorePassword {...props} />}
          />
          <Route
            path="/new-password"
            component={(props) => <NewPassword {...props} />}
          />
          <Route path="*">
            <NoMatchPage />
          </Route>
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
    setWishlist: (wishlist) => dispatch(setWishlist(wishlist)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
