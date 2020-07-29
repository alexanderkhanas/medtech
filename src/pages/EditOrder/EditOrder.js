import React from "react";
import s from "./EditOrder.module.css";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
import Input from "../../misc/Inputs/Input/Input";
import ProfileInput from "../../misc/Inputs/ProfileInput/ProfileInput";
import Button from "../../misc/Button/Button";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";

const EditOrder = () => {
  const h = useHistory();
  const options = [
    { value: "wait", label: "Очікує оплати" },
    { value: "done", label: "Завершено" },
    { value: "esc", label: "Скасовано" },
    { value: "sent", label: "Відправлено" },
  ];
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
            <span>Статус</span>
            <Select options={options} className={s.selector} />
            <span>Спосіб оплати</span>
            <Select options={options} className={s.selector} />
            <span>Спосіб доставки</span>
            <Select options={options} className={s.selector} />
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
