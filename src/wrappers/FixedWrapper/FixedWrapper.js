import React from "react";
import s from "./FixedWrapper.module.css";

const FixedWrapper = ({ children, className }) => {
  return (
    <div>
      <div className={`${s.container} ${className}`}>{children}</div>
    </div>
  );
};

export default FixedWrapper;
