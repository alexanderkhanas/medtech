import React, { useState } from "react";
import s from "./../Auth/Auth.module.css";
import Input from "../../misc/Inputs/Input/Input";
import Button from "../../misc/Button/Button";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const RestorePassord = () => {
  const h = useHistory();
  return (
    <>
      <div className={s.body}>
        <div className={s.container}>
          <div className={s.title__container}>
            <h4 className={s.title}>ACCOUNT</h4>
          </div>
          <div className={s.login}>
            <h5>Відновлення паролю</h5>
            <h6>Ми відправимо повідомлення на вашу електронну адресу</h6>
            <div className={s.input__container}>
              <div className={s.email}>
                <Input placeholder="example@gmail.com" />
              </div>
            </div>
            <div className={s.submit_button}>
              <Button title="Sign in" />
            </div>
            <button
              className={s.reg}
              onClick={() => {
                h.goBack();
              }}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Повернутись
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RestorePassord;
