import React from "react";
import s from "./AdminRow.module.css";
import Button from "../../Button/Button";

const AdminRow = ({ onEdit, onDelete, items }) => {
  return (
    <div className={s.card}>
      <div className={s.card__atrbutes}>
        {items.map(({ title, key }, i) => (
          <div {...{ key }}>
            <p className={s.card__title}>{title}</p>
          </div>
        ))}
        <div className={s.table__container}>
          <div className={s.buttons}>
            {!!onEdit && (
              <Button
                className={s.edit__btn}
                onClick={onEdit}
                size="sm"
                title="Редагувати"
              />
            )}
            {!!onDelete && (
              <div className={s.delete__container}>
                <Button
                  size="sm"
                  onClick={onDelete}
                  title="Видалити"
                  className={s.delete__btn}
                  // onClick={showDeleteModal}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRow;
