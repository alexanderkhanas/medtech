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
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { Formik, ErrorMessage } from "formik";
import PhoneNumberInput from "../../misc/Inputs/PhoneNumberInput/PhoneNumberInput";
import { useHistory } from "react-router-dom";
import BreadCrumbs from "../../misc/BreadCrumbs/BreadCrumbs";
import _axios from "../../store/api/_axios";

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
        initialValues={{
          fName: "",
          sName: "",
          fatherName: "",
          email: "",
          password: "",
          passwordConfirm: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.fName || values.fName.length <= 1) {
            errors.fName = "Занадто коротке Ім'я";
          } else if (/[0-9._%+-]$/i.test(values.fName)) {
            errors.fName = "Невірно введенe Ім'я";
          }
          if (values.lName.length <= 2) {
            errors.lName = "Занадто коротке прізвище";
          } else if (/[0-9._%+-]$/i.test(values.lName)) {
            errors.lName = "Невірно введенe прізвище";
          }
          if (values.fatherName.length <= 3) {
            errors.fatherName = "Занадто коротке по-батькові";
          } else if (/[0-9._%+-]$/i.test(values.fatherName)) {
            errors.fatherName = "Невірно введенe по-батькові";
          }
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
          if (values.password !== values.passwordConfirm) {
            errors.passwordConfirm = "ne spivpadae";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          const { fName, lName, fatherName, phone, password, email } = values;
          _axios
            .post("/register", {
              fName,
              lName,
              fatherName,
              phone,
              email,
              password,
            })

            .then((res) => {
              console.log(res);
              if (res.status === 200) {
                h.push(`/register/${res.data.user.userId}`);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          handleFocus,
          isSubmiting,
        }) => {
          // console.log("values :", values);
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
          console.log(errors);
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
                          <Input
                            placeholder="Ім'я"
                            name="fName"
                            value={values.fName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onFocus={handleFocus}
                          >
                            {!errors.fName && touched.fName && <SuccessIcon />}

                            {errors.fName && touched.fName && <ErrorIcon />}
                          </Input>
                        </div>
                        <div className={s.login}>
                          <Input
                            placeholder="Прізвище"
                            name="lName"
                            value={values.lName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            {!errors.lName && touched.lName && <SuccessIcon />}

                            {errors.lName && touched.lName && <ErrorIcon />}
                          </Input>
                        </div>
                        <div className={s.login}>
                          <Input
                            name="fatherName"
                            placeholder="По-батькові"
                            value={values.fatherName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            {!errors.fatherName && touched.fatherName && (
                              <SuccessIcon />
                            )}

                            {errors.fatherName && touched.fatherName && (
                              <ErrorIcon />
                            )}
                          </Input>
                        </div>

                        <div className={s.ph__number}>
                          <PhoneNumberInput value={values.phone} />
                        </div>
                        <div className={s.email}>
                          <Input
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="email"
                            value={values.email}
                            type="email"
                            placeholder="example@gmail.com"
                          >
                            {!errors.email && touched.email && <SuccessIcon />}

                            {errors.email && touched.email && <ErrorIcon />}
                          </Input>
                        </div>
                        <div className={s.pswd}>
                          <Input
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="password"
                            value={values.password}
                            type="password"
                            placeholder="Пароль"
                          >
                            {!errors.password && touched.password && (
                              <SuccessIcon />
                            )}

                            {errors.password && touched.password && (
                              <ErrorIcon />
                            )}
                          </Input>
                        </div>
                      </div>
                      <div className={s.pswd}>
                        <Input
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="passwordConfirm"
                          value={values.passwordConfirm}
                          type="password"
                          placeholder="Підтвердіть пароль"
                        >
                          {!errors.passwordConfirm &&
                            touched.passwordConfirm && <SuccessIcon />}

                          {errors.passwordConfirm &&
                            touched.passwordConfirm && <ErrorIcon />}
                        </Input>
                      </div>
                      <div className={s.check_box}>
                        <p>
                          <input
                            icon={faCheck}
                            className={s.faCheck}
                            type="checkbox"
                            name="chexbox"
                            onChange={agreeCheckbox}
                            chacked={isAgree}
                          />
                          Погоджуюся з політикою кофіденційності
                        </p>
                      </div>
                      <div className={s.submit_button}>
                        <Button
                          title="Зареєструватися"
                          disabled={!isAgree}
                          onClick={handleSubmit}
                        />
                      </div>
                    </div>
                    <div className={s.fbt}>
                      <button
                        className={s.goback}
                        onClick={() => {
                          h.goBack();
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faArrowLeft}
                          className={s.faArrowLeft}
                        />
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
