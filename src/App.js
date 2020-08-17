import React, { useEffect, Suspense, lazy, useMemo, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./misc/Header/Header";
import SingleProduct from "./pages/SingleProduct/SingleProduct";
import { setCart, setFullPriceAction } from "./store/actions/cartActions";
import { connect } from "react-redux";
import Footer from "./misc/Footer/Footer";
import Catalog from "./pages/Catalog/Catalog";
import { setWishlist } from "./store/actions/wishlistActions";
import NoMatchPage from "./pages/404/404";
import { getAllNewsAction } from "./store/actions/newsActions";
import Alert from "./misc/Alert/Alert";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { getLocalCart, debounce } from "./utils/utils";
import { getUserByIdAction, loginAction } from "./store/actions/profileActions";
import Modal from "./misc/Modal/Modal";
import { getProducts } from "./store/actions/productsActions";

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
const Admin = lazy(() => import("./pages/Admin/Admin"));
const Order = lazy(() => import("./pages/Order/Order"));
const EditOrder = lazy(() => import("./pages/Admin/pages/EditOrder/EditOrder"));
const EditNews = lazy(() => import("./pages/Admin/pages/EditNews/EditNews"));
const EditUser = lazy(() => import("./pages/Admin/pages/EditUser/EditUser"));
const EditProduct = lazy(() =>
  import("./pages/Admin/pages/EditProduct/EditProduct")
);
const CreateProduct = lazy(() =>
  import("./pages/Admin/pages/CreateProduct/CreateProduct")
);
const CreateNews = lazy(() =>
  import("./pages/Admin/pages/CreateNews/CreateNews")
);
const CreateUser = lazy(() =>
  import("./pages/Admin/pages/CreateUser/CreateUser")
);
const CreateOrder = lazy(() =>
  import("./pages/Admin/pages/CreateOrder/CreateOrder")
);
const AboutUs = lazy(() => import("./pages/AboutUs/AboutUs"));

const PrivateRoute = ({
  redirectTo,
  component: Component,
  condition,
  state = {},
  ...rest
}) => (
  <Route {...rest}>
    {condition ? (
      <Component />
    ) : (
      <Redirect to={{ pathname: redirectTo, state }} />
    )}
  </Route>
);

const App = ({
  allProducts,
  setCart,
  setWishlist,
  getUser,
  autologin,
  getProducts,
  user,
}) => {
  const getLocalWishlist = () => localStorage.getItem("_wishlist")?.split(" ");

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const debouncedHandleResize = debounce(() => {
      setWindowWidth(window.innerWidth);
    }, 200);

    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, []);

  const token = useMemo(() => {
    return document.cookie.includes("token")
      ? document.cookie
          .split("; ")
          .filter((value) => value.startsWith("token"))[0]
          .split("=")[1]
      : null;
  }, []);

  useEffect(() => {
    (async () => {
      getProducts();
      const loginData = localStorage.getItem("_login");
      if (loginData) {
        await autologin(JSON.parse(loginData));
        return;
      }
      if (token) {
        await getUser(token);
      }
    })();
  }, []);

  useEffect(() => {
    const localCart = getLocalCart();
    // const cartProducts = cartIds
    //   ? allProducts.filter((product) => cartIds.includes(product._id))
    //   : [];
    const cartProducts = [];
    let fullPrice = 0;
    allProducts.forEach((product) => {
      localCart.forEach((cartProduct) => {
        if (product._id === cartProduct._id) {
          cartProducts.push({
            ...product,
            selectedAttributesId: cartProduct.attributes._id,
            selectedAttributesPrice: cartProduct.attributes.priceAttr,
            numberInCart: cartProduct.numberInCart,
          });
          fullPrice +=
            cartProduct.numberInCart * cartProduct.attributes.priceAttr ||
            product.price;
        }
      });
    });
    console.log("cart products ===", cartProducts);

    setCart(cartProducts);

    const wishlistIds = getLocalWishlist();
    console.log("all products ===", allProducts);

    const wishlistProducts = wishlistIds
      ? allProducts.filter((product) => wishlistIds.includes(product._id))
      : [];
    console.log("wishlist ===", wishlistProducts);
    setWishlist(wishlistProducts);
  }, [allProducts]);
  return (
    <Router>
      <Header />
      <Alert />
      <Modal />
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
            <Route
              path="/public-offer"
              component={(props) => <PublicOffer {...props} />}
            />
            <Route
              path="/politics"
              component={(props) => <Politics {...props} />}
            />
            <Route
              path="/about-us"
              component={(props) => <AboutUs {...props} />}
            />
            <Route
              path="/single-news/:id"
              component={(props) => <SingleNews {...props} />}
            />
            <Route path="/news" component={News} />
            <Route path="/single-news/:id" component={SingleNews} />
            <PrivateRoute
              path="/login"
              condition={!user._id}
              redirectTo={`profile/${user._id}`}
              component={(props) => <Login {...props} />}
            />
            <PrivateRoute
              path="/register"
              redirectTo={`profile/${user._id}`}
              condition={!user._id}
              component={(props) => <Register {...props} />}
            />
            <PrivateRoute
              condition={!!user._id}
              path="/profile"
              component={Profile}
            />
            <PrivateRoute
              condition={!user._id}
              path="/restore"
              redirectTo={`profile/${user._id}`}
              component={(props) => <RestorePassword {...props} />}
            />
            <PrivateRoute
              condition={!!user._id}
              path="/order"
              redirectTo="/login"
              state={{ redirectTo: "/order" }}
              component={Order}
            />

            {/* <Route
              path="/admin"
              key="/ADMIN"
              render={({ match: { url } }) => (
                <> */}
            <Route
              path="/new-password"
              component={(props) => <NewPassword {...props} />}
            />
            <Route
              path="/wishlist"
              component={(props) => <Wishlist {...props} />}
            />
            <PrivateRoute
              path="/admin"
              condition={user.isAdmin}
              component={(props) => <Admin {...props} />}
              exact
            />
            <PrivateRoute
              condition={user.isAdmin}
              path="/admin/edit-order/:id"
              component={(props) => <EditOrder {...props} />}
            />
            <PrivateRoute
              condition={user.isAdmin}
              path="/admin/edit-news/:id"
              component={(props) => <EditNews {...props} />}
            />
            <PrivateRoute
              condition={user.isAdmin}
              path="/admin/edit-user/:id"
              component={(props) => <EditUser {...props} />}
            />
            <PrivateRoute
              condition={user.isAdmin}
              path="/admin/edit-product/"
              component={(props) => <EditProduct {...props} />}
            />
            <PrivateRoute
              condition={user.isAdmin}
              path="/admin/create-product/"
              component={(props) => <CreateProduct {...props} />}
            />
            <PrivateRoute
              condition={user.isAdmin}
              path="/admin/create-news/"
              component={(props) => <CreateNews {...props} />}
            />
            <PrivateRoute
              condition={user.isAdmin}
              path="/admin/create-user/"
              component={(props) => <CreateUser {...props} />}
            />
            <PrivateRoute path="/admin/create-order" component={CreateOrder} />
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
    user: state.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCart: (cart) => dispatch(setCart(cart)),
    setWishlist: (wishlist) => dispatch(setWishlist(wishlist)),
    getUser: (id, redirect) => dispatch(getUserByIdAction(id, redirect)),
    setFullPrice: (price) => dispatch(setFullPriceAction(price)),
    autologin: (data) => dispatch(loginAction(data)),
    getProducts: () => dispatch(getProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
