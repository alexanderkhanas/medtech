import React, {useState} from "react";
import s from "./ProductCard.module.css";
import {connect} from "react-redux";
import {
    addToCartAction,
    removeFromCartAction,
} from "../../store/actions/cartActions";
import {useHistory} from "react-router-dom";
import classnames from "classnames";
import WishlistButton from "../WishlistButton/WishlistButton";
import Button from "../Button/Button";
import {ReactComponent as ShoppingCart} from "../../assets/shopping-cart.svg";
import ConvertImage from "react-convert-image";

const ProductCard = ({product, className}) => {
    const {gallery, title, price, _id} = product;
    const history = useHistory();
    const [converted, setConverted] = useState('');

    const redirectToSingleProduct = () => history.push(`/product/${_id}`);
    const handleConvertedImage = (uri) => {
        console.log("uri ===", uri);
        setConverted(uri)
    }
    if (title?.includes("Шорты")) {
        console.log("product ===", product)
    }
    return (
        <div className={classnames(s.card, className)}>
            <WishlistButton {...{product}} className={s.wishlist__button}/>
            <div className={s.card__main}>
                {/*{!!gallery && gallery[0] && <ConvertImage*/}
                {/*    image={*/}
                {/*        gallery[0]*/}
                {/*    }*/}
                {/*    format="jpeg"*/}
                {/*    onConversion={handleConvertedImage}*/}
                {/*/>}*/}
                {/*{!!converted &&*/}
                <img
                    // src={gallery && gallery[0] ? gallery[0] : require("../../assets/image-placeholder.webp")}
                    src={title?.includes("Тонометр")
                        ? "https://ortop.ua/content/images/32/avtomaticheskiy-tonometr-and-ua-888eac-s-adapterom-19978614581333_small11.png"
                        : title?.includes("Нагнітач")
                            ? "https://www.medtechnika.com.ua/media/amasty/amoptmobile/catalog/product/cache/baf6f8f808a496b7feacb97c14d7fe0e/r/d/rd-ng-02-2_jpg.webp"
                            : "https://www.medtechnika.com.ua/media/amasty/webp/catalog/product/cache/ed9abe2e7e962851fb909ec1e05fa292/r/d/rd-pvc1-m-1_1_jpg.webp"}
                    // src={img || require("../../assets/image-placeholder.webp")}
                    className={s.card__img}
                    onClick={redirectToSingleProduct}
                    alt="loading..."
                />

            </div>
            <div className={s.card__footer}>
                <h4 className={s.card__title} onClick={redirectToSingleProduct}>
                    {title.slice(0, 40)}
                </h4>
                <div className={s.card__price__container}>
                    <span className={s.card__price}>{`${price} ₴`}</span>
                    <div>
                        <Button size="lg" title="Купити" onClick={redirectToSingleProduct}>
                            <ShoppingCart className={s.cart__button__icon}/>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        cartProducts: state.cart.all,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (product) => dispatch(addToCartAction(product)),
        removeFromCart: (product) => dispatch(removeFromCartAction(product)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
