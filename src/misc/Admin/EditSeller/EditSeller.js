import React from "react";
import s from "./EditSeller.module.css";
import Button from "../../Button/Button";

const EditSeller = (props) => {
  return (
    <div className={s.card}>
      <div className={s.card__atrbutes}>
        <p className={s.card__title}>Germany</p>
        <div className={s.table__container}>
          <p className={s.card__subtitle}>123</p>
          <div className={s.buttons}>
            <Button className={s.edit__btn} size="sm" title="Редагувати" />
            <div className={s.delete__container}>
              <Button
                size="sm"
                title="Видалити"
                className={s.delete__btn}
                // onClick={showDeleteModal}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSeller;
