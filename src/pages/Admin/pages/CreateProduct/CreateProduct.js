import React, { useState, useRef, useEffect } from "react";
import s from "./CreateProduct.module.css";
import { connect } from "react-redux";
import Select from "../../../../misc/Select/Select";
import Input from "../../../../misc/Inputs/Input/Input";
import FixedWrapper from "../../../../wrappers/FixedWrapper/FixedWrapper";
import ProfileInput from "../../../../misc/Inputs/ProfileInput/ProfileInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../../misc/Button/Button";
import { Formik } from "formik";

const CreateProduct = (props) => {
  const uploadedImage = useRef(null);
  const imageUploader = useRef(null);

  const handleImages = ({ target: { files } }, setValues, prevValues) => {
    Array.from(files).forEach((file) => {
      const reader = new FileReader();

      reader.onload = ({ target: { result } }) => {
        setValues({
          ...prevValues,
          gallery: [...prevValues.gallery, result],
        });
        console.log("result ===", result);
      };
      reader.readAsDataURL(file);
    });
  };

  const deleteImage = (imageToDelete, setValues, prevValues) => {
    const filteredGallery = prevValues.gallery.filter(
      (image) => image !== imageToDelete
    );
    setValues({ ...prevValues, gallery: filteredGallery });
  };

  const quantityOptions = [
    { value: 0, label: "Немає в наявності" },
    { value: 1, label: "В наявності" },
  ];
  const [sortQuantityType, setSortQuantityType] = useState(quantityOptions[0]);
  const onSortQuantityChange = (value) => {
    setSortQuantityType(value);
  };

  return (
    <div className={s.container}>
      <div className={s.title__container}>
        <h1 className={s.title}>Створення товару</h1>
      </div>
      <FixedWrapper>
        <Formik
          initialValues={{
            title: "",
            desc: "",
            gallery: [],
            price: "",
            vendor: "",
            quantity: 1,
            recommended: false,
          }}
        >
          {({ handleChange, values, setValues }) => (
            <form className={s.body}>
              <Input
                label="Назва"
                value={values.title}
                name="title"
                onChange={handleChange}
                containerClass={s.input__container}
              />
              <div className={s.input__container}>
                <p className={s.label}>Фото</p>
                <div className={s.images__container}>
                  {values.gallery.map((image) => (
                    <div className={s.image__container}>
                      <FontAwesomeIcon
                        icon={faTimes}
                        className={s.delete__icon}
                        onClick={() => deleteImage(image, setValues, values)}
                      />
                      <img className={s.image} src={image} alt="loading" />
                    </div>
                  ))}
                </div>
                <input
                  type="file"
                  multiple
                  onChange={(e) => handleImages(e, setValues, values)}
                />
              </div>
              <Input
                label="Опис"
                value={values.desc}
                name="desc"
                onChange={handleChange}
                containerClass={s.input__container}
                isTextarea
              />
              <Input
                label="Ціна"
                value={values.title}
                onChange={handleChange}
                containerClass={s.input__container}
              />
              <Input
                label="Країна виробника"
                value={values.vendor}
                name="vendor"
                onChange={handleChange}
                containerClass={s.input__container}
              />
              <Input
                label="Кількість"
                value={values.quantity}
                name="quantity"
                onChange={handleChange}
                containerClass={s.input__container}
              />
              <div className={s.submit__container}>
                <Button title="Створити" size="lg" />
              </div>
            </form>
          )}
        </Formik>
      </FixedWrapper>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct);
