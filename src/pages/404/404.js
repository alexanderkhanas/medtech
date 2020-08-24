import React from "react";
import { useHistory } from "react-router-dom";
import s from "./error.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";

function NoMatchPage() {
  const h = useHistory();
  return (
    <div className={s.body}>
      <div className={s.errorTitle}>
        <p>Page not found</p>
      </div>
      <div className={s.button}>
        <button
          onClick={() => {
            h.goBack();
          }}
          className={s.goBack}
        >
          <FontAwesomeIcon icon={faSignInAlt} /> Go Back
        </button>
      </div>
    </div>
  );
}
export default NoMatchPage;
