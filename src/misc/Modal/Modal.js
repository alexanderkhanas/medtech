import React from "react";
import s from "./Modal.module.css";
import Button from "../Button/Button";

const Modal = ({ show, closeModal }) => {
  return (
    <div className={s.modal__container}>
      <div className={show ? s.modal : `${s.modal} ${s.hide}`}>
        {/* <button onClick={closeModal} className={s.x}>
          X
        </button> */}
        <h1>Ви дійсно хочете вийти?</h1>
        <div className={s.buttons}>
          <Button title="Так" className={s.plus} />
          <Button title="Ні" className={s.minus} onClick={closeModal} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
