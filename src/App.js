import React, { useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./misc/Header/Header";
import SingleProduct from "./pages/SingleProduct/SingleProduct";
import Admin from "./pages/Admin/Admin";
import EditOrder from "./pages/EditOrder/EditOrder";
import { setCart } from "./store/actions/cartActions";
import { connect } from "react-redux";
import { getProducts } from "./store/actions/productsActions";
import Footer from "./misc/Footer/Footer";
import Catalog from "./pages/Catalog/Catalog";
import { setWishlist } from "./store/actions/wishlistActions";
import NoMatchPage from "./pages/404/404";
import PublicOffer from "./misc/PublicOffer/PublicOffer";
import Politics from "./misc/Politics/Politics";
import News from "./pages/News/News";
import SingleNews from "./pages/SingleNews/SingleNews";
import { getAllNewsAction } from "./store/actions/newsActions";
import Alert from "./misc/Alert/Alert";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { getLocalCart } from "./utils/utils";
import EditNews from "./pages/EditNews/EditNews";

const Login = lazy(() => import("./pages/Auth/Auth"));
const Register = lazy(() => import("./pages/Register/Register"));
const RestorePassword = lazy(() =>
  import("./pages/RestorePassword/RestorePassord")
);
const NewPassword = lazy(() => import("./pages/NewPassword/NewPassword"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const Wishlist = lazy(() => import("./pages/Wishlist/Wishlist"));
const Cart = lazy(() => import("./pages/Cart/Cart"));

const App = ({ allProducts, setCart, getProducts, setWishlist, getNews }) => {
  const getLocalWishlist = () => localStorage.getItem("_wishlist")?.split(" ");

  useEffect(() => {
    (async () => {
      getNews();
      getProducts();
    })();
  }, []);

  useEffect(() => {
    const localCart = getLocalCart();
    // const cartProducts = cartIds
    //   ? allProducts.filter((product) => cartIds.includes(product._id))
    //   : [];
    const cartProducts = [];
    allProducts.forEach((product) => {
      localCart.forEach((cartProduct) => {
        if (product._id === cartProduct._id) {
          cartProducts.push({
            ...product,
            selectedAttributesId: cartProduct.attributes._id,
            selectedAttributesPrice: cartProduct.attributes.priceAttr,
          });
        }
      });
    });
    console.log("cart products ===", cartProducts);

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
      <Alert />
      <div style={{ marginTop: "45px" }}>
        <Suspense fallback={<div>loading</div>}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/product/:id" component={SingleProduct} />
            <Route path="/cart" component={Cart} />
            <Route path="/catalog" component={Catalog} />
            <Route path="/login" component={(props) => <Login {...props} />} />
            <Route path="/public-offer" component={PublicOffer} />
            <Route path="/politics" component={Politics} />
            <Route path="/news" component={News} />
            <Route path="/single-news/:id" component={SingleNews} />
            <Route path="/admin" component={Admin} />
            <Route path="/edit-order/:id" component={EditOrder} />
            <Route path="/edit-news/:id" component={EditNews} />
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
            <Route
              path="/wishlist"
              component={(props) => <Wishlist {...props} />}
            />
            <Route path="*">
              <NoMatchPage />
            </Route>
          </Switch>
        </Suspense>
        <Footer />
      </div>
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
    getNews: () => dispatch(getAllNewsAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
