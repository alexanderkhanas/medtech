import React, { useRef, useState } from "react";
import s from "./EditProduct.module.css";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
import Select from "../../misc/Select/Select";
import Input from "../../misc/Inputs/Input/Input";
import ProfileInput from "../../misc/Inputs/ProfileInput/ProfileInput";

const EditProduct = (props) => {
  const uploadedImage = useRef(null);
  const imageUploader = useRef(null);

  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
        // setNewsData((prev) => ({ ...prev, gallery: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
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
    <div>
      <div className={s.title__container}>
        <h4 className={s.title}>Редагування новини</h4>
      </div>
      <FixedWrapper>
        <div className={s.body}>
          <div className={s.product__title__container}>
            <ProfileInput label="Назва продукту" className={s.product__title} />
          </div>
          <div className={s.input__image__container}>
            <label className={s.label}>
              Нажміть на картинку щоб вибрати нову
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              ref={imageUploader}
              className={s.input__image}
              multiple
            />
            <div
              className={s.upload__image}
              onClick={() => imageUploader.current.click()}
            >
              <img
                alt="loading"
                // defaultValue={gallery}
                ref={uploadedImage}
                // src={gallery}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
          </div>
          <div className={s.price__container}>
            <Input type="number" label="Ціна" className={s.price} />
          </div>
          <div className={s.size__container}>
            <Input className={s.size__1} label="Розмір" />
            <Input className={s.size__2} label="Розмір" />
            <Input className={s.size__3} label="Розмір" />
          </div>
          <div className={s.country__container}>
            <Input className={s.country} label="Країна" />
          </div>
          <Select
            className={s.selector}
            onSelect={onSortQuantityChange}
            value={sortQuantityType.label}
            options={quantityOptions}
          />
          <div className={s.news__content}>
            <label className={s.label}>Текст новини</label>
            <textarea className={s.textarea} />
          </div>
          <div className={s.recommend__container}>
            <input type="checkbox" />
            <span>Добавити в рекомедації</span>
          </div>
        </div>
      </FixedWrapper>
    </div>
  );
};

export default EditProduct;
