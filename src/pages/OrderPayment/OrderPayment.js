import React from "react";
import s from "./OrderPayment.module.css";
import {connect} from "react-redux";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
import { LiqPayPay } from "react-liqpay";
import {useParams} from "react-router-dom";
import Button from "../../misc/Button/Button";


const OrderPayment = ({userOrders}) => {
    const {id, amount} = useParams();
    console.log("userOrders ===", userOrders);
    return (
        <FixedWrapper>
            <div className={s.container}>
                <h3 className={s.title}>Натисніть нижче, щоб оплатити замовлення, використовуючи сервіс LiquidPay</h3>
                <LiqPayPay
                    publicKey="i94473506277"
                    privateKey="QILGhFG2Ef4Ty2OGRogFyVSfOyEgiSaHBpQxmMo5"
                    amount={`${amount}`}
                    description="Оплата замовлення"
                    currency="UAH"
                    orderId={id}
                    product_description="Оплата замовлення"
                    style={{ margin: "8px" }}
                    extra={[<Button title={`Оплатити ${amount} грн. (LiquidPay)`} />]}
                />
            </div>
        </FixedWrapper>
    );
};

const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(OrderPayment);
