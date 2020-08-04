import React, { useState, useRef, useEffect } from "react";
import s from "./CreateProduct.module.css";
import { connect } from "react-redux";
import Select from "../../../../misc/Select/Select";
import Input from "../../../../misc/Inputs/Input/Input";
import FixedWrapper from "../../../../wrappers/FixedWrapper/FixedWrapper";
import ProfileInput from "../../../../misc/Inputs/ProfileInput/ProfileInput";

const CreateProduct = (props) => {
  const [productInfo, setProductInfo] = useState({
    title: "",
    desc: "",
    gallery: [],
    categories: [],
    price: "",
    vendor: "",
    quantity: 0,
    recommended: false,
  });

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

  return (
    <div className={s.container}>
      <div className={s.title__container}>
        <h1 className={s.title}>Створення товару</h1>
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
          <div className={s.images__container}>
            {productInfo.gallery.map((image) => (
              <img className={s.image} src={image} alt="loading" />
            ))}
          </div>
          <input type="file" multiple onChange={handleImages} />
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
            value={productInfo.title}
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
            label="Країна виробника"
            value={productInfo.categories}
            name="vendor"
            onChange={onInputChange}
            containerClass={s.input__container}
          />
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
