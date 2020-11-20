import React, { useState } from "react";
import s from "./RestorePassword.module.css";
import Input from "../../misc/Inputs/Input/Input";
import Button from "../../misc/Button/Button";
import { useHistory, Link } from "react-router-dom";
import _axios from "../../store/api/_axios";
import GoBackBtn from "../../misc/GoBackBtn/GoBackBtn";
import { showAlertAction } from "../../store/actions/alertActions";
import { connect } from "react-redux";

const RestorePassword = ({ showAlert }) => {
  const h = useHistory();
  const [email, setEmail] = useState("");
  const handleSubmit = () => {
    _axios
      .post("/restore/password", { email })
      .then(() => {
        showAlert(
          "Перейдіть за посиланням, надісланим на електронну пошту",
          "success"
        );
        setEmail("");
      })
      .catch((error) => {
        console.log("restore error ===", error);
        showAlert("Сталась помилка", "error");
      });
  };
  return (
    <>
      <div className={s.body}>
        <div className={s.container}>
          <div className={s.title__container}>
            <h4 className={s.title}>Відновлення паролю</h4>
          </div>
          <div className={s.login}>
            <h6>Ми відправимо повідомлення на вашу електронну адресу</h6>
            <div className={s.input__container}>
              <div className={s.email}>
                <Input
                  placeholder="example@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                />
              </div>
            </div>
            <div className={s.submit_button}>
              <Button title="Відновити" onClick={handleSubmit} />
            </div>
            <GoBackBtn />
          </div>
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  showAlert: (content, type) => dispatch(showAlertAction(content, type)),
});

export default connect(null, mapDispatchToProps)(RestorePassword);
