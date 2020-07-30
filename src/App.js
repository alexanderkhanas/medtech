import React, { useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./misc/Header/Header";
import SingleProduct from "./pages/SingleProduct/SingleProduct";
import { setCart } from "./store/actions/cartActions";
import { connect } from "react-redux";
import { getProducts } from "./store/actions/productsActions";
import Footer from "./misc/Footer/Footer";
import Catalog from "./pages/Catalog/Catalog";
import { setWishlist } from "./store/actions/wishlistActions";
import NoMatchPage from "./pages/404/404";
import { getAllNewsAction } from "./store/actions/newsActions";
import Alert from "./misc/Alert/Alert";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { getLocalCart, debounce } from "./utils/utils";

const Login = lazy(() => import("./pages/Auth/Auth"));
const Register = lazy(() => import("./pages/Register/Register"));
const RestorePassword = lazy(() =>
  import("./pages/RestorePassword/RestorePassord")
);
const NewPassword = lazy(() => import("./pages/NewPassword/NewPassword"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const Wishlist = lazy(() => import("./pages/Wishlist/Wishlist"));
const Cart = lazy(() => import("./pages/Cart/Cart"));
const News = lazy(() => import("./pages/News/News"));
const SingleNews = lazy(() => import("./pages/SingleNews/SingleNews"));
const Politics = lazy(() => import("./misc/Politics/Politics"));
const PublicOffer = lazy(() => import("./misc/PublicOffer/PublicOffer"));

const App = ({ allProducts, setCart, getProducts, setWishlist, getNews }) => {
  const getLocalWishlist = () => localStorage.getItem("_wishlist")?.split(" ");

  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  useEffect(() => {
    const debouncedHandleResize = debounce(() => {
      setWindowWidth(window.innerWidth);
    }, 200);

    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  });

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
        <Suspense fallback={<div className="fallback" />}>
          <Switch>
            <Route
              path="/"
              exact
              component={() => <Home {...{ windowWidth }} />}
            />
            <Route path="/product/:id" component={SingleProduct} />
            <Route path="/cart" component={Cart} />
            <Route
              path="/catalog"
              component={() => <Catalog {...{ windowWidth }} />}
            />
            <Route path="/login" component={(props) => <Login {...props} />} />
            <Route
              path="/public-offer"
              component={(props) => <PublicOffer {...props} />}
            />
            <Route
              path="/politics"
              component={(props) => <Politics {...props} />}
            />
            <Route
              path="/single-news/:id"
              component={(props) => <SingleNews {...props} />}
            />
            <Route path="/news" component={(props) => <News {...props} />} />
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
