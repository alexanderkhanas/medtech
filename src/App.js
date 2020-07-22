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

const Login = lazy(() => import("./pages/Auth/Auth"));
const Register = lazy(() => import("./pages/Register/Register"));
const RestorePassword = lazy(() => import("./pages/Register/Register"));
const NewPassword = lazy(() => import("./pages/Register/Register"));

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

  // for (let i = 0; i < 60; i++) {
  //   _axios.post("/product", {
  //     gallery:
  //       i % 2 === 0
  //         ? [
  //             "https://static10.tgstat.ru/channels/_0/90/905639a85ebe6278d83d9baa4eea5169.jpg",
  //             "https://static10.tgstat.ru/channels/_0/25/2572627c661939affee97b2b130c4573.jpg",
  //             "https://static10.tgstat.ru/channels/_0/f7/f767e6bf863fb8985b3353a7954a72ca.jpg",
  //           ]
  //         : [
  //             "https://pbs.twimg.com/media/D5FLNGBW0AEjrHK.jpg",
  //             "https://s.tcdn.co/a4a/584/a4a584d7-eff8-3558-911b-3b97415b7fa7/10.png",
  //             "https://static10.tgstat.ru/channels/_0/90/905639a85ebe6278d83d9baa4eea5169.jpg",
  //             "https://static10.tgstat.ru/channels/_0/25/2572627c661939affee97b2b130c4573.jpg",
  //             "https://static10.tgstat.ru/channels/_0/f7/f767e6bf863fb8985b3353a7954a72ca.jpg",
  //           ],
  //     title: "Себек",
  //     desc:
  //       "БАЗАРИТ СЕРЕЖА нуль адымш ка. А НА КУС И АРАМАТ. Очень большой себек. Себек более, Себек звичайний",
  //     vendorID: "5f118b1a374f8c298e481d08",
  //     reviews: ["5f1580663105976fe25ac497"],
  //     categoryID: "5f16a091ef555293692d215a",
  //     price: 500,
  //     quantity: 10,
  //     article: "asdad",
  //     recommended: i % 2 === 0,
  //     attrOptions: [
  //       {
  //         розмір: "S",
  //         "вага в соціумі": "XXL",
  //         priceAttr: 550,
  //       },
  //       {
  //         розмір: "S",
  //         "вага в соціумі": "XXXL",
  //         priceAttr: 610,
  //       },
  //       {
  //         розмір: "M",
  //         "вага в соціумі": "XXL",
  //         priceAttr: 620,
  //       },
  //       {
  //         розмір: "M",
  //         "вага в соціумі": "XXXL",
  //         priceAttr: 630,
  //       },
  //       {
  //         розмір: "L",
  //         "вага в соціумі": "XXL",
  //         priceAttr: 670,
  //       },
  //       {
  //         розмір: "L",
  //         "вага в соціумі": "XXXL",
  //         priceAttr: 650,
  //       },
  //     ],
  //     attr: ["розмір", "вага в соціумі"],
  //   });
  // }
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
    setWishlist: (wishlist) => dispatch(setWishlist(wishlist)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
