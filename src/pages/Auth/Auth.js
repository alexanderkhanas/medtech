import React, { useState } from "react";
import s from "./Auth.module.css";
import Input from "../../misc/Inputs/Input/Input";
import { Formik, ErrorMessage } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import BreadCrumbs from "../../misc/BreadCrumbs/BreadCrumbs";
import {
  faCheckCircle,
  faExclamationCircle,
  faKey,
  faArrowLeft,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../misc/Button/Button";
import { useHistory, Link } from "react-router-dom";
import _axios from "../../store/api/_axios";
import { loginAction } from "../../store/actions/profileActions";
import { connect } from "react-redux";
import {
  showAlertAction,
  hideAlertAction,
} from "../../store/actions/alertActions";

const Auth = ({ login, hideAlert, showAlert, location }) => {
  const h = useHistory();
  const breadCrumbsItems = [
    {
      name: "Головна",
      path: "/",
      icon: <FontAwesomeIcon icon={faHome} />,
    },
    { name: "Увійти", path: "/login" },
  ];

  console.log("location ===", location?.state);

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
        onSubmit={async (values, { setSubmitting }) => {
          const { email, password } = values;
          const loginResponse = await login({ email, password });
          console.log("login response ===", loginResponse);

          if (loginResponse) {
            const { _id } = loginResponse.user;
            const { token } = loginResponse;
            if (token) {
              document.cookie = `token=${token}`;
            }
            if (location?.state?.redirectTo) {
              h.push(location.state.redirectTo);
            } else {
              h.push(`/profile/${_id}`);
            }
          } else {
            showAlert("Помилка при авторизації. Невірно введені дані.");
          }
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
                    <h4 className={s.title}>Увійти</h4>
                    <BreadCrumbs items={breadCrumbsItems} />
                  </div>
                  <div className={s.login}>
                    <div className={s.input__container}>
                      <div className={s.email}>
                        <Input
                          onChange={handleChange}
                          onBlur={handleBlur}
                          // Icon={!errors.email ? SuccessIcon : ErrorIcon}
                          name="email"
                          value={values.email}
                          type="email"
                          placeholder="example@gmail.com"
                        >
                          {!errors.email && touched.email && !!values.email && (
                            <SuccessIcon />
                          )}

                          {(errors.email || !values.email) && touched.email && (
                            <ErrorIcon />
                          )}
                        </Input>
                        <div className={s.password}>
                          <Input
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="password"
                            // Icon={!errors.password ? SuccessIcon : ErrorIcon}
                            name="password"
                            value={values.password}
                            placeholder="••••••••"
                          >
                            {(errors.email || !values.email) &&
                              touched.email && <ErrorIcon />}
                          </Input>
                        </div>
                      </div>
                    </div>
                    <Link to="/restore">
                      <button className={s.restore}>Відновити акаунт</button>
                    </Link>
                    <div className={s.submit_button}>
                      <Button title="Підтвердити" />
                    </div>

                    <div className={s.fbt}>
                      <Link to="/register">
                        <button className={s.reg}>
                          Зареєструватись
                          {/* <FontAwesomeIcon icon={faKey} className={s.faKey} /> */}
                        </button>
                      </Link>
                      <button
                        className={s.reg}
                        onClick={() => {
                          h.goBack();
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faArrowLeft}
                          className={s.goBack}
                        />
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
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (data) => dispatch(loginAction(data)),
    showAlert: (content) => dispatch(showAlertAction(content)),
    hideAlert: () => dispatch(hideAlertAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
