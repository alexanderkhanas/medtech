import React, { useState } from "react";
import s from "./NewPassword.module.css";
import Input from "../../misc/Inputs/Input/Input";
import Button from "../../misc/Button/Button";
import { useHistory } from "react-router-dom";
import _axios from "../../store/api/_axios";
import GoBackBtn from "../../misc/GoBackBtn/GoBackBtn";
import { withFormik } from "formik";
import { connect } from "react-redux";
import { showAlertAction } from "../../store/actions/alertActions";
import { withRouter } from "react-router";

const RestorePassword = ({ values, errors, handleChange, handleSubmit }) => {
  console.log("errors ===", errors);
  return (
    <>
      <div className={s.body}>
        <div className={s.container}>
          <div className={s.title__container}>
            <h4 className={s.title}>Зміна паролю</h4>
          </div>
          <div className={s.login}>
            <div className={s.input__container}>
              <div className={s.password}>
                <Input
                  placeholder="••••••••"
                  type="password"
                  label="Пароль"
                  name="password"
                  onChange={handleChange}
                />
              </div>
              <div className={s.password}>
                <Input
                  placeholder="••••••••"
                  label="Підтвердження паролю"
                  type="password"
                  name="confirmPassword"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={s.submit_button}>
              <Button
                title="Змінити пароль"
                isDisabled={Object.keys(errors).length || !values.password}
                onClick={handleSubmit}
              />
            </div>
            <GoBackBtn />
          </div>
        </div>
      </div>
    </>
  );
};

const formikHOC = withFormik({
  mapPropsToValues: () => ({
    password: "",
    confirmPassword: "",
  }),
  validate: ({ password, confirmPassword }) => {
    const errors = {};
    if (password.length < 6) {
      errors.password = "too short";
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = "not match";
    }
    return errors;
  },
  handleSubmit: (
    { password },
    {
      props: {
        history,
        match: {
          params: { code, email },
        },
      },
      resetForm,
    }
  ) => {
    _axios
      .post("/change/password", {
        code,
        password,
        email,
      })
      .then((res) => {
        if (res.status === 200) {
          resetForm({ password: "", confirmPassword: "" });
          history.push("/login");
        } else {
          throw new Error("bad res");
        }
      })
      .catch(() => {});
  },
})(RestorePassword);

const mapDispatchToProps = (dispatch) => ({
  showAlert: (content, type) => dispatch(showAlertAction(content, type)),
});

export default withRouter(connect(null, mapDispatchToProps)(formikHOC));
