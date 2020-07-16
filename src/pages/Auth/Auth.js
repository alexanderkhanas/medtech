import React, { useState } from "react";
import s from "./Auth.module.css";
import Input from "../../misc/Inputs/Input/Input";
import { Formik, ErrorMessage } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import {
  faCheckCircle,
  faExclamationCircle,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../misc/Button/Button";
import { useHistory } from "react-router-dom";

const Auth = () => {
  const [isRegister, setRegister] = useState(false);
  const setFormRegister = () => setRegister(true);
  const setFormLogin = () => setRegister(false);
  const h = useHistory();
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
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          alert(JSON.stringify(values));
          prompt("123");
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
                    <h4 className={s.title}>ACCOUNT</h4>
                  </div>
                  <div className={s.input__container}>
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
                        type="password"
                        Icon={!errors.password ? SuccessIcon : ErrorIcon}
                        name="password"
                        value={values.password}
                        placeholder="••••••••"
                      />
                    </div>
                    <Button title="123" className={s.submit_button} />
                  </div>
                  <div className={s.fbt}>
                    <button className={s.restore}>Відновити акаунт</button>
                    <button className={s.reg}>
                      Зареєструватись
                      <FontAwesomeIcon icon={faKey} className={s.faKey} />
                    </button>
                    <button
                      className={s.reg}
                      onClick={() => {
                        h.goBack();
                      }}
                    >
                      Продовжити покупки
                    </button>
                  </div>
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
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Auth;
