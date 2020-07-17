import React, { useState } from "react";
import s from "./Register.module.css";
import Input from "../../misc/Inputs/Input/Input";
import Button from "../../misc/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import {
  faEye,
  faEyeSlash,
  faCheckCircle,
  faExclamationCircle,
  faArrowLeft,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { Formik, ErrorMessage } from "formik";
import PhoneNumberInput from "../../misc/Inputs/PhoneNumberInput/PhoneNumberInput";
import { useHistory } from "react-router-dom";
import BreadCrumbs from "../../misc/BreadCrumbs/BreadCrumbs";

const Register = () => {
  const [isRegister, setRegister] = useState(false);
  const setFormRegister = () => setRegister(true);
  const setFormLogin = () => setRegister(false);

  const [isAgree, setIsAgree] = useState(false);
  const agreeCheckbox = ({ target: { checked } }) => {
    console.log(isAgree, checked);
    setIsAgree(checked);
  };
  const h = useHistory();

  const breadCrumbsItems = [
    {
      name: "Головна",
      path: "/",
      icon: <FontAwesomeIcon icon={faHome} />,
    },
    { name: "Реєстрація", path: "/register" },
  ];
  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (values.password.length <= 5) {
            errors.password = "Занадто короткий пароль";
          }
          if (!values.email) {
            errors.email = "Введіть електронну пошту";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Невірно введена електронна пошта";
          }
          if (values.password != values.passwordConfirm) {
            errors.passwordConfirm = "ne spivpadae";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          alert(JSON.stringify(values));
          prompt("TU Chui?");
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmiting,
        }) => {
          console.log("values :", values);
          const SuccessIcon = () => (
            <FontAwesomeIcon
              icon={faCheckCircle}
              className={`${s.icon} ${s.success__icon}`}
            />
          );
          const ErrorIcon = () => (
            <FontAwesomeIcon
              icon={faExclamationCircle}
              className={`${s.icon} ${s.error__icon}`}
            />
          );
          return (
            <form onSubmit={handleSubmit}>
              <div className={s.body}>
                <div className={s.container}>
                  <div className={s.title__container}>
                    <h3 className={s.title}>CREATE ACCOUNT</h3>
                    <BreadCrumbs items={breadCrumbsItems} />
                  </div>
                  <div className={s.register}>
                    <div className={s.input__container}>
                      <div className={s.form}>
                        <div className={s.login}>
                          <Input placeholder="Ім’я" />
                          <Input placeholder="Прізвище" />
                          <Input placeholder="По-батькові" />
                        </div>
                        <div className={s.ph__number}>
                          <PhoneNumberInput />
                        </div>
                        <div className={s.email}>
                          <Input
                            onChange={handleChange}
                            onBlur={handleBlur}
                            Icon={!errors.email ? SuccessIcon : ErrorIcon}
                            name="email"
                            value={values.email}
                            type="email"
                            placeholder="example@gmail.com"
                          />
                        </div>
                        <div className={s.pswd}>
                          <Input
                            onChange={handleChange}
                            onBlur={handleBlur}
                            Icon={!errors.password ? SuccessIcon : ErrorIcon}
                            name="password"
                            value={values.password}
                            type="password"
                            placeholder="Пароль"
                          />
                        </div>
                      </div>
                      <div className={s.pswd}>
                        <Input
                          onChange={handleChange}
                          onBlur={handleBlur}
                          Icon={
                            !errors.passwordConfirm ? SuccessIcon : ErrorIcon
                          }
                          name="passwordConfirm"
                          value={values.passwordConfirm}
                          type="password"
                          placeholder="Підтвердіть пароль"
                        />
                      </div>
                      <div className={s.check_box}>
                        <p>
                          <input
                            type="checkbox"
                            name="chexbox"
                            onChange={agreeCheckbox}
                            chacked={isAgree}
                          />
                          Погоджуюся з політикою кофіденційності
                        </p>
                      </div>
                      <div className={s.submit_button}>
                        <Button title="Зареєструватися" disabled={!isAgree} />
                      </div>
                    </div>
                    <div className={s.fbt}>
                      <button
                        className={s.goback}
                        onClick={() => {
                          h.goBack();
                        }}
                      >
                        <FontAwesomeIcon icon={faArrowLeft} />
                        Продовжити покупки
                      </button>
                      <div className={s.logwith}>
                        <FontAwesomeIcon
                          icon={faGoogle}
                          className={`${s.logicon} ${s.gl}`}
                        />
                        <FontAwesomeIcon
                          icon={faFacebook}
                          className={`${s.logicon} ${s.fb} `}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Register;
