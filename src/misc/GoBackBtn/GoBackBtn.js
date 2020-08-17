import React from "react";
import s from "./GoBackBtn.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

const GoBackBtn = (props) => {
  const h = useHistory();
  return (
    <div>
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
  );
};

export default GoBackBtn;
