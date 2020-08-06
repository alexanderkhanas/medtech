import React, { useState } from "react";
import s from "./CreateNews.module.css";
import { connect } from "react-redux";
import Input from "../../../../misc/Inputs/Input/Input";
import Button from "../../../../misc/Button/Button";
import FixedWrapper from "../../../../wrappers/FixedWrapper/FixedWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const CreateNews = (props) => {
  const [newsInfo, setNewsInfo] = useState({
    title: "",
    desc: "",
    gallery: [],
  });

  const onInputChange = ({ target: { value, name } }) => {
    setNewsInfo((prev) => ({ ...prev, [name]: value }));
  };

  const deleteImage = (imageToDelete) => {
    const filteredImages = newsInfo.gallery.filter(
      (image) => imageToDelete !== image
    );
    setNewsInfo((prev) => ({ ...prev, gallery: filteredImages }));
  };

  const handleImages = ({ target: { files } }) => {
    const reader = new FileReader();

    reader.onload = ({ target: { result } }) => {
      setNewsInfo((prev) => ({
        ...prev,
        gallery: [...prev.gallery, result],
      }));
      console.log("result ===", result);
    };
    reader.readAsDataURL(files[0]);
  };

  return (
    <div>
      <div className={s.container}>
        <div className={s.title__container}>
          <h1 className={s.title}>Створення новини</h1>
        </div>
        <FixedWrapper>
          <div className={s.body}>
            <Input
              label="Назва"
              value={newsInfo.title}
              name="title"
              onChange={onInputChange}
              containerClass={s.input__container}
            />
            <div className={s.input__container}>
              <p className={s.label}>Фото</p>
              <div className={s.images__container}>
                {newsInfo.gallery.map((image) => (
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
              <input type="file" onChange={handleImages} />
            </div>
            <Input
              label="Опис"
              value={newsInfo.desc}
              name="desc"
              onChange={onInputChange}
              containerClass={s.input__container}
              isTextarea
            />
            <div className={s.submit__container}>
              <Button title="Створити" size="lg" />
            </div>
          </div>
        </FixedWrapper>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNews);
