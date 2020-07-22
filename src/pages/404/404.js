import React from "react";
import { useHistory } from "react-router-dom";
import s from "./error.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";

function NoMatchPage() {
  const h = useHistory();
  return (
    <div>
      <title></title>
      <div id={s.notfound}>
        <div className={s.notfound}>
          <div className={s.notfound_404}>
            <h1>Oops!</h1>
            <h2>404 - The Page can't be found</h2>
          </div>
          <a
            href="#"
            onClick={() => {
              h.goBack();
            }}
          >
            Go TO Homepage
          </a>
        </div>
      </div>
    </div>
  );
}
export default NoMatchPage;
