import React, { useState, useRef, useEffect } from "react";
import s from "./EditProduct.module.css";
import { connect } from "react-redux";
import Select from "../../../../misc/Select/Select";
import Input from "../../../../misc/Inputs/Input/Input";
import FixedWrapper from "../../../../wrappers/FixedWrapper/FixedWrapper";
import ProfileInput from "../../../../misc/Inputs/ProfileInput/ProfileInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faArrowLeft,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../../../misc/Button/Button";
import { useHistory } from "react-router-dom";
import GoBackBtn from "../../../../misc/GoBackBtn/GoBackBtn";
import BreadCrumbs from "../../../../misc/BreadCrumbs/BreadCrumbs";

const CreateProduct = (props) => {
  const [productInfo, setProductInfo] = useState({
    title: "",
    desc: "",
    gallery: [],
    price: "",
    vendor: "",
    quantity: 1,
    recommended: false,
  });
  const breadCrumbsItems = [
    {
      name: "Адмін",
      path: "/admin",
    },
    { name: "Редагувати товар" },
  ];

  const onInputChange = ({ target: { name, value } }) => {
    setProductInfo((prev) => ({ ...prev, [name]: value }));
  };

  const uploadedImage = useRef(null);
  const imageUploader = useRef(null);

  const handleImages = ({ target: { files } }) => {
    Array.from(files).forEach((file) => {
      const reader = new FileReader();

      reader.onload = ({ target: { result } }) => {
        setProductInfo((prev) => ({
          ...prev,
          gallery: [...prev.gallery, result],
        }));
        console.log("result ===", result);
      };
      reader.readAsDataURL(file);
    });
  };

  const deleteImage = (imageToDelete) => {
    const filteredGallery = productInfo.gallery.filter(
      (image) => image !== imageToDelete
    );
    setProductInfo((prev) => ({ ...prev, gallery: filteredGallery }));
  };

  const quantityOptions = [
    { value: 0, label: "Немає в наявності" },
    { value: 1, label: "В наявності" },
  ];
  const [sortQuantityType, setSortQuantityType] = useState(quantityOptions[0]);
  const onSortQuantityChange = (value) => {
    setSortQuantityType(value);
  };

  useEffect(() => {
    console.log("product ===", productInfo);
  }, [productInfo]);
  const h = useHistory();

  return (
    <div className={s.container}>
      <div className={s.title__container}>
        <h1 className={s.title}>Редагування товару</h1>
        <BreadCrumbs items={breadCrumbsItems} />
      </div>
      <FixedWrapper>
        <div className={s.body}>
          <Input
            label="Назва"
            value={productInfo.title}
            name="title"
            onChange={onInputChange}
            containerClass={s.input__container}
          />
          <div className={s.input__container}>
            <p className={s.label}>Фото</p>
            <div className={s.images__container}>
              {productInfo.gallery.map((image) => (
                <div className={s.image__container}>
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={s.delete__icon}
                    onClick={() => deleteImage(image)}
                  />
                  <img className={s.image} src={image} alt="loading" />
                </div>
              ))}
            </div>
            <input type="file" multiple onChange={handleImages} />
          </div>
          <Input
            label="Опис"
            value={productInfo.desc}
            name="desc"
            onChange={onInputChange}
            containerClass={s.input__container}
            isTextarea
          />
          <Input
            label="Ціна"
            value={productInfo.price}
            onChange={onInputChange}
            containerClass={s.input__container}
          />
          <Input
            label="Країна виробника"
            value={productInfo.vendor}
            name="vendor"
            onChange={onInputChange}
            containerClass={s.input__container}
          />
          <Input
            label="Кількість"
            value={productInfo.quantity}
            name="quantity"
            onChange={onInputChange}
            containerClass={s.input__container}
          />
          <div className={s.submit__container}>
            <Button title="Зберегти" size="lg" />
            <Button title="Видалити" className={s.delete__btn} size="lg" />
            <GoBackBtn />
          </div>
        </div>
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
