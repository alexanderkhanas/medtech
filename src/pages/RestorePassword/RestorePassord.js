import React, { useState } from "react";
import s from "./../Auth/Auth.module.css";
import Input from "../../misc/Inputs/Input/Input";
import Button from "../../misc/Button/Button";
import { useHistory, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import _axios from "../../store/api/_axios";

const RestorePassord = () => {
  const h = useHistory();
  const [email, setEmail] = useState();
  const handleSubmit = () => {
    _axios
      .post("/restore/password", { email })
      .then((res) => {
        console.log(res);
        // res.status === 200
        //   ? h.push(`/restore/password/${res.data.user.userId}`)
        //   : alert("res.status");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  console.log(email);
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
                <Input
                  placeholder="example@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                />
              </div>
            </div>
            <div className={s.submit_button}>
              <Link to="/new-password">
                <Button title="Sign in" onClick={handleSubmit} />
              </Link>
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
