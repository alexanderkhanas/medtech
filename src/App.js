import React, {useEffect, Suspense, lazy, useMemo, useState} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./misc/Header/Header";
import SingleProduct from "./pages/SingleProduct/SingleProduct";
import {getCartAction, setCart, setFullPriceAction} from "./store/actions/cartActions";
import {connect} from "react-redux";
import Footer from "./misc/Footer/Footer";
import Catalog from "./pages/Catalog/Catalog";
import {getWishlistAction, setWishlist} from "./store/actions/wishlistActions";
import NoMatchPage from "./pages/404/404";
import {getAllNewsAction} from "./store/actions/newsActions";
import Alert from "./misc/Alert/Alert";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {fetchExactProducts} from "./store/api/api";
import {getLocalCart, debounce} from "./utils/utils";
import {getUserByIdAction, loginAction} from "./store/actions/profileActions";
import Modal from "./misc/Modal/Modal";
import {getProducts} from "./store/actions/productsActions";
import OrderPayment from "./pages/OrderPayment/OrderPayment";
import PaymentSuccess from "./pages/PaymentSuccess/PaymentSuccess";

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
            <Component/>
        ) : (
            <Redirect to={{pathname: redirectTo, state}}/>
        )}
    </Route>
);

const App = ({
                 getUser,
                 autologin,
                 getProducts,
                 getCart,
                 user,
                 getWishlist,
                 allProducts,
             }) => {

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

        // const token = useMemo(() => {
        //     return document.cookie.includes("token")
        //         ? document.cookie
        //             .split("; ")
        //             .filter((value) => value.startsWith("token"))[0]
        //             .split("=")[1]
        //         : null;
        // }, []);
        //
        // const aToken = useMemo(() => {
        //     return document.cookie.includes("aToken")
        //         ? document.cookie
        //             .split("; ")
        //             .filter((value) => value.startsWith("aToken"))[0]
        //             .split("=")[1]
        //         : null;
        // }, []);

        // const getUserByToken = async (userToken, type) => {
        //     if (userToken) {
        //         const isSuccess = await getUser(userToken);
        //         if (isSuccess) {
        //             return true;
        //         }
        //     }
        //     // document.cookie = `${type}=""; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        //     // return false;
        // };
        // console.log('mid === ', token)

        useEffect(() => {
            (async () => {
                const loginData = localStorage.getItem("_login");
                getProducts();
                getUser();
                if (loginData) {
                    await autologin(JSON.parse(loginData));
                }
            })();
        }, []);

        useEffect(() => {
                (async () => {
                        await getCart();
                        await getWishlist()
                    }
                )();
            }, [allProducts]
        );

        return (
            <Router>
                <Header/>
                <Alert/>
                <Modal/>
                <div style={{marginTop: "45px"}}>
                    <Suspense fallback={<div className="fallback"/>}>
                        <Switch>
                            <Route path="/" exact component={Home}/>
                            <Route path="/product/:id" component={SingleProduct}/>
                            <Route path="/cart" component={Cart}/>
                            <Route path="/catalog" component={Catalog}/>
                            <Route path="/public-offer" component={PublicOffer}/>
                            <Route path="/politics" component={Politics}/>
                            <Route path="/about-us" component={AboutUs}/>
                            <Route path="/news" component={News}/>
                            <Route path="/single-news/:id" component={SingleNews}/>
                            <PrivateRoute
                                path="/login"
                                condition={!user._id}
                                redirectTo={`profile`}
                                component={Login}
                            />
                            <PrivateRoute
                                path="/register"
                                redirectTo={`profile`}
                                condition={!user._id}
                                component={Register}
                            />
                            <PrivateRoute
                                condition={!!user._id}
                                // condition={!!token}
                                path="/profile"
                                component={Profile}
                            />
                            <PrivateRoute
                                condition={!user._id}
                                path="/restore"
                                redirectTo={`profile`}
                                component={RestorePassword}
                            />
                            <Route path="/order" exact component={Order}/>
                            <Route path="/order/payment/:id/:amount" component={OrderPayment}/>
                            <Route path="/payment/success" component={PaymentSuccess}/>

                            {/* <Route
              path="/admin"
              key="/ADMIN"
              render={({ match: { url } }) => (
                <> */}
                            <Route path="/new-password" component={NewPassword}/>
                            <Route path="/wishlist" component={Wishlist}/>
                            <PrivateRoute
                                path="/admin"
                                condition={user.isAdmin}
                                component={Admin}
                                exact
                            />
                            <PrivateRoute
                                condition={user.isAdmin}
                                path="/admin/edit-order/:id"
                                component={EditOrder}
                            />
                            <PrivateRoute
                                condition={user.isAdmin}
                                path="/admin/edit-news/:id"
                                component={EditNews}
                            />
                            <PrivateRoute
                                condition={user.isAdmin}
                                path="/admin/edit-user/:id"
                                component={EditUser}
                            />
                            <PrivateRoute
                                condition={user.isAdmin}
                                path="/admin/edit-product/:id"
                                component={EditProduct}
                            />
                            <PrivateRoute
                                condition={user.isAdmin}
                                path="/admin/create-product/"
                                component={CreateProduct}
                            />
                            <PrivateRoute
                                condition={user.isAdmin}
                                path="/admin/create-news/"
                                component={CreateNews}
                            />
                            <PrivateRoute
                                condition={user.isAdmin}
                                path="/admin/create-user/"
                                redirectTo="/admin"
                                component={CreateUser}
                            />
                            <PrivateRoute
                                condition={user.isAdmin}
                                path="/admin/create-order"
                                component={CreateOrder}
                            />
                            <Route path="*">
                                <NoMatchPage/>
                            </Route>
                        </Switch>
                    </Suspense>
                    <Footer/>
                </div>
            </Router>
        );
    }
;

const mapStateToProps = (state) => {
    return {
        allProducts: state.products.all,
        user: state.profile,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCart: (cart) => dispatch(setCart(cart)),
        getWishlist: () => dispatch(getWishlistAction()),
        getCart: () => dispatch(getCartAction()),
        getUser: (id, redirect) => dispatch(getUserByIdAction(id, redirect)),
        setFullPrice: (price) => dispatch(setFullPriceAction(price)),
        autologin: (data) => dispatch(loginAction(data)),
        getProducts: () => dispatch(getProducts()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
