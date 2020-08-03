import React, { useState } from "react";
import s from "./EditOrder.module.css";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
import Input from "../../misc/Inputs/Input/Input";
import ProfileInput from "../../misc/Inputs/ProfileInput/ProfileInput";
import Button from "../../misc/Button/Button";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
// import Select from "react-select";
import Select from "../../misc/Select/Select";

const EditOrder = () => {
  console.log("edit order");

  const h = useHistory();
  const statusOptions = [
    { value: "wait", label: "Очікує оплати" },
    { value: "done", label: "Завершено" },
    { value: "esc", label: "Скасовано" },
    { value: "sent", label: "Відправлено" },
  ];
  const deliveryOptions = [
    { value: "self-pickup", label: "Самовивіз" },
    { value: "np", label: "Нова пошта" },
    { value: "up", label: "Укр пошта" },
  ];
  const payOptions = [
    { value: "cash", label: "Наложений платіж" },
    { value: "card", label: "Картою" },
  ];

  const [sortStatusType, setSortStatusType] = useState(statusOptions[0]);
  const [sortDeliveryType, setSortDeliveryType] = useState(deliveryOptions[0]);
  const [sortPayType, setPayType] = useState(payOptions[0]);

  const onSortStatusChange = (value) => {
    setSortStatusType(value);
  };
  const onSortDeliveryChange = (value) => {
    setSortDeliveryType(value);
  };
  const onSortPayChange = (value) => {
    setPayType(value);
  };

  return (
    <div>
      <div className={s.title__container}>
        <h4 className={s.title}>Редагування замовлення</h4>
      </div>
      <FixedWrapper>
        <div className={s.body}>
          <div className={s.input__container}>
            <ProfileInput className={s.input} label="Номер замовлення" />
            <ProfileInput className={s.input} label="Дата створення" />
            <div className={s.select__container}>
              <span className={s.label}>Статус</span>
              <Select
                onSelect={onSortStatusChange}
                value={sortStatusType.label}
                options={statusOptions}
                className={s.selector}
              />
            </div>
            <div className={s.select__container}>
              <span className={s.label}>Спосіб оплати</span>
              <Select
                className={s.selector}
                onSelect={onSortPayChange}
                value={sortPayType.label}
                options={payOptions}
              />
            </div>
            <div className={s.select__container}>
              <span className={s.label}>Спосіб доставки</span>
              <Select
                className={s.selector}
                onSelect={onSortDeliveryChange}
                value={sortDeliveryType.label}
                options={deliveryOptions}
              />
            </div>
            <ProfileInput className={s.input} label="Загальна сума" />
          </div>
          <Button title="Змінити" />
          <button
            className={s.goBack__but}
            onClick={() => {
              h.goBack();
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} className={s.goBack} />
            Повернутися
          </button>
        </div>
      </FixedWrapper>
    </div>
  );
};

export default EditOrder;
