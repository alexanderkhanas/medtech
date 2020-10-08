import React, {useEffect} from "react";
import s from "./Order.module.css";
import {connect} from "react-redux";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
import Select from "../../misc/Select/Select";
import Button from "../../misc/Button/Button";
import {Redirect, withRouter} from "react-router-dom";
import {
    addToCartAction,
    removeFromCartAction,
    setFullPriceAction,
    setCart,
} from "../../store/actions/cartActions";
import BreadCrumbs from "../../misc/BreadCrumbs/BreadCrumbs";
import {withFormik} from "formik";
import Input from "../../misc/Inputs/Input/Input";
import {
    getCitiesAction,
    getWarehousesAction,
    setSelectedCityAction,
    setSelectedWarehouseAction,
    submitOrderAction,
} from "../../store/actions/orderActions";
import OrderProductCard from "../../misc/OrderProductCard/OrderProductCard";
import {patchUserAction} from "../../store/actions/profileActions";
import {showAlertAction} from "../../store/actions/alertActions";
import GoBackBtn from "../../misc/GoBackBtn/GoBackBtn";
import {ReactComponent as ShoppingCart} from "../../assets/shopping-cart.svg";
import PhoneNumberInput from "../../misc/Inputs/PhoneNumberInput/PhoneNumberInput";
import {LiqPayPay} from "react-liqpay";

const deliveryOptions = [
    {value: "self-pickup", label: "Самовивіз"},
    {value: "NovaPoshta", label: "Нова пошта"},
];

const payOptions = [
    {value: "cash", label: "Наложений платіж"},
    {value: "card", label: "Картою (LiqPay)"},
];

const CreateOrder = ({
                         cartProducts,
                         fullPrice,
                         setFullPrice,
                         getCities,
                         getWarehouses,
                         cities,
                         filterCities,
                         setSelectedWarehouse,
                         setSelectedCity,
                         warehouses,
                         filterWarehouses,
                         user,
                         handleChange,
                         values,
                         setValues,
                         handleSubmit,
                         isLoading
                     }) => {
    const breadCrumbsItems = [
        {
            name: "Кошик",
            path: "/cart",
            icon: <ShoppingCart className={s.bread__crumbs}/>,
        },
        {name: "Замовлення", path: "/order"},
    ];

    const switchSaveUser = () => {
        setValues({...values, isSaveUser: !values.isSaveUser});
    };

    const selectHandler = (option, type) => {
        setValues({...values, [type]: option});
    };

    const onCitiesScroll = ({target}, searchValue) => {
        if (
            target.scrollHeight - target.scrollTop < 400 &&
            cities.length % 20 === 0
        ) {
            filterCities(searchValue, cities.length + 20);
        }
    };

    const onCitySearchChange = (value) => {
        if (cities.length === 1 && value === cities[0].Description) {
            setValues({...values, selectedCity: value})
            getWarehouses(value);
        }
        filterCities(value);
    };

    const onCitySelect = (option) => {
        setValues({...values, selectedCity: option.label})
        getWarehouses(option.label);
    };

    const onWarehousesScroll = ({target}, searchValue) => {
        if (
            target.scrollHeight - target.scrollTop < 400 &&
            warehouses.length % 20 === 0
        ) {
            filterWarehouses(searchValue, warehouses.length + 20);
        }
    };

    const onWarehouseSelect = (option) => {
        setValues({...values, selectedWarehouse: option.value})
    };

    useEffect(() => {
        setFullPrice(
            cartProducts.reduce(
                (acc, {price, numberInCart = 1, selectedAttributesPrice}) => {
                    const productPrice = +selectedAttributesPrice || price;
                    return acc + productPrice * numberInCart;
                },
                0
            )
        );
    }, [cartProducts]);

    useEffect(() => {
        getCities();
    }, []);

    useEffect(() => {
        setValues({
            ...values,
            fName: user.fName,
            lName: user.lName,
            phone: user.phone,
        });
    }, [user]);
    return !cartProducts.length && !isLoading ? (
        <Redirect to="/"/>
    ) : (
        <div className={s.container}>
            <div className={s.title__container}>
                <h4 className={s.title}>Замовлення</h4>
                <BreadCrumbs items={breadCrumbsItems}/>
            </div>
            <FixedWrapper>
                <div className={s.order__container}>
                    <div className={s.products__container}>
                        {cartProducts.map((product) => (
                            <OrderProductCard isSmall {...{product}} key={product._id}/>
                        ))}
                        <div className={s.subtotal__container}>
                            <div className={s.subtotal__title}>Ціна:</div>
                            <div className={s.subtotal__price}>{fullPrice}₴</div>
                        </div>
                    </div>
                    <div className={s.submit__container_all}>
                        <div className={s.submit__container}>
                            <h2 className={s.submit__title}>Оформити замовлення</h2>
                            <div className={s.input__row}>
                                <Input
                                    name="fName"
                                    inputClass={s.input}
                                    containerClass={s.input__container}
                                    value={values.fName}
                                    onChange={handleChange}
                                    label="Ім'я"
                                    placeholder="John"
                                />
                                <Input
                                    placeholder="Doe"
                                    name="lName"
                                    inputClass={s.input}
                                    containerClass={s.input__container}
                                    value={values.lName}
                                    onChange={handleChange}
                                    label="Прізвище"
                                />
                            </div>
                            <div className={s.phone__container}>
                                <PhoneNumberInput
                                    name="phone"
                                    value={values.phone}
                                    onChange={handleChange}
                                    className={s.phone__input}
                                    label="Номер телефону"
                                />
                            </div>
                            <Select
                                containerClass={s.section}
                                options={payOptions}
                                onSelect={(option) => selectHandler(option, "paymentType")}
                                label="Тип оплати"
                                value={values.paymentType.label}
                            />
                            <Select
                                containerClass={s.section}
                                options={deliveryOptions}
                                onSelect={(option) => selectHandler(option, "deliveryType")}
                                label="Тип доставки"
                                value={values.deliveryType.label}
                            />
                            {values.deliveryType.value !== "self-pickup" &&
                            <Select
                                containerClass={s.section}
                                withSearch
                                noDefaultValue
                                onMenuScroll={onCitiesScroll}
                                menuClass={s.select__menu}
                                options={cities.map((city) => ({
                                    value: city.Description,
                                    label: city.Description,
                                }))}
                                onSelect={onCitySelect}
                                onSearchValueChange={onCitySearchChange}
                                label="Місто"
                            />}
                            {values.deliveryType.value !== "self-pickup" &&
                            <Select
                                containerClass={s.section}
                                withSearch
                                noDefaultValue
                                onMenuScroll={onWarehousesScroll}
                                menuClass={s.select__menu}
                                options={warehouses.map((warehouse) => ({
                                    value: warehouse.Description,
                                    label: warehouse.Description,
                                }))}
                                onSelect={onWarehouseSelect}
                                label="Номер відділення"
                            />}


                            <div className={s.actions__container}>
                                <div className={s.save__user__container}>
                                    <input
                                        type="checkbox"
                                        name="isSaveUser"
                                        onChange={handleChange}
                                        checked={values.isSaveUser}
                                        className={s.save__user__checkbox}
                                    />
                                    <p className={s.save__user__desc} onClick={switchSaveUser}>
                                        Оновити мій профіль
                                    </p>
                                </div>
                                <div className={s.submit__btn__container}>
                                    {/*<LiqPayPay*/}
                                    {/*    publicKey="sandbox_i7961872980"*/}
                                    {/*    privateKey="sandbox_igIHtRIrF2IT63rResIB5zLosOTjJvEGEnI419Y8"*/}
                                    {/*    amount={`${fullPrice}`}*/}
                                    {/*    description="Оплата замовлення"*/}
                                    {/*    currency="UAH"*/}
                                    {/*    orderId={""}*/}
                                    {/*    product_description="Оплата замовлення"*/}
                                    {/*    style={{ margin: "8px" }}*/}
                                    {/*    extra={[<Button title={`Оплатити ${fullPrice} грн. (LiquidPay)`} />]}*/}
                                    {/*/>*/}
                                    <Button
                                        title="Підтвердити замовлення"
                                        onClick={handleSubmit}
                                        isDisabled={
                                            // !user._id ||
                                            !values.fName ||
                                            !values.lName ||
                                            !values.phone
                                        }
                                        className={s.submit__btn}
                                    />
                                </div>
                                <GoBackBtn/>
                            </div>
                        </div>
                    </div>
                </div>
            </FixedWrapper>
        </div>
    );
};

const formikHOC = withFormik({
    mapPropsToValues: (props) => ({
        lName: props.user.fName,
        fName: props.user.lName,
        phone: props.user.phone,
        deliveryType: deliveryOptions[0],
        paymentType: payOptions[0],
        isSaveUser: false,
        selectedWarehouse: "",
        selectedCity: ""
    }),
    handleSubmit: async (
        values,
        {
            props: {
                cartProducts,
                patchUser,
                user,
                createOrder,
                fullPrice,
                showAlert,
                setCart,
                history
            },
            resetForm,
        }
    ) => {
        const products = cartProducts.map(
            ({selectedAttributesId, _id, quantity}) => ({
                attrOptions: selectedAttributesId,
                id: _id,
                quantity,
            })
        );
        // let correctPhone = +values.phone
        // console.log(correctPhone)
        // if (values.phone && !Number.isNaN(values.phone)) {
        //     if (values.phone?.startsWith("0")) {
        //         correctPhone = +`38${values.phone}`;
        //     } else {
        //         correctPhone = +values.phone;
        //     }
        // }
        if (values.isSaveUser) {
            patchUser({
                ...user,
                fName: values.fName,
                lName: values.lName,
                phone: +values.phone,
            });
        }

        const orderData = await createOrder({
            products,
            phone: +values.phone,
            deliveryCity: values.selectedCity || "Самовивіз",
            deliveryHouse: null,
            deliveryStreet: null,
            deliveryApartament: null,
            deliveryWarehouse: values.selectedWarehouse,
            paymentType: values.paymentType.value,
            sum: fullPrice,
            userID: user._id || null,
            status: values.paymentType.value === "card" ? "waitForPayment" : "created",
        });
        if (orderData) {
            console.log("order data ===", orderData)
            showAlert("Замовлення створено успішно!", "success");

            setCart([]);
            localStorage.removeItem("_cart");
            resetForm({
                lName: "",
                fName: "",
                phone: "",
                deliveryType: deliveryOptions[0],
                paymentType: payOptions[0],
                isSaveUser: false,
            });
            if (values.paymentType.value === "card") {
                history.push(`/order/payment/${orderData._id}/${orderData.sum}`)
            }
        } else {
            showAlert("Сталась помилка при створенні замовлення.");
        }
    },
})(CreateOrder);

const routerHOC = withRouter(formikHOC)

const mapStateToProps = (state) => {
    return {
        cartProducts: state.cart.all,
        fullPrice: state.cart.fullPrice,
        cities: state.order.cities,
        warehouses: state.order.warehouses,
        isLoading: state.base.isLoading,
        user: state.profile,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (product) => dispatch(addToCartAction(product)),
        removeFromCart: (product) => dispatch(removeFromCartAction(product)),
        setFullPrice: (fullPrice) => dispatch(setFullPriceAction(fullPrice)),
        getCities: () => dispatch(getCitiesAction()),
        filterCities: (filterValue, limit) =>
            dispatch(getCitiesAction(filterValue, limit)),
        getWarehouses: (city) => dispatch(getWarehousesAction(city)),
        filterWarehouses: (filterValue) =>
            dispatch(getWarehousesAction(filterValue)),
        setSelectedCity: (city) => dispatch(setSelectedCityAction(city)),
        setSelectedWarehouse: (warehouse) =>
            dispatch(setSelectedWarehouseAction(warehouse)),
        patchUser: (user, token) => dispatch(patchUserAction(user, token)),
        createOrder: (order) => dispatch(submitOrderAction(order)),
        showAlert: (content, type) => dispatch(showAlertAction(content, type)),
        setCart: (cart) => dispatch(setCart(cart)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(routerHOC);
