import React from "react";
import s from "./CreateOrder.module.css";
import { connect } from "react-redux";

const CreateOrder = () => {
  return (
    <div className={s.container}>
      <div />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrder);
