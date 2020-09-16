import React from "react";
import s from "./PaymentSuccess.module.css";

const PaymentSuccess = () => {
    return (
        <div className={s.background}>
            <h1 className={s.title}>
                Оплата проведена успішно!
            </h1>
        </div>
    );
};

export default PaymentSuccess;