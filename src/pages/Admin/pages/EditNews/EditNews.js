import React, { useRef, useEffect, useState } from "react";
import s from "./EditNews.module.css";
import FixedWrapper from "../../../../wrappers/FixedWrapper/FixedWrapper";
import ProfileInput from "../../../../misc/Inputs/ProfileInput/ProfileInput";
import Button from "../../../../misc/Button/Button";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { getSingleNewsAction } from "../../../../store/actions/newsActions";

const EditNews = ({ getSingleNews, match, singleNews }) => {
  const { title, gallery, desc, createdAt, _id } = singleNews;
  console.log(singleNews);
  useEffect(() => {
    getSingleNews(match.params.id);
  }, []);
  console.log("singleNews ===", singleNews);

  const uploadedImage = useRef(null);
  const imageUploader = useRef(null);
  // const [newsData, setNewsData] = useState({
  //   getSingleNews,
  //   match,
  //   singleNews,
  // });

  // const handleRemovePhoto = (e) => {
  //   setNewsData((prev) => ({ ...prev, gallery: [] }));
  // };

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
  const h = useHistory();
  return (
    <div>
      <div className={s.title__container}>
        <h4 className={s.title}>Редагування новини</h4>
      </div>
      <FixedWrapper>
        <div className={s.input__container}>
          <div className={s.title__input}>
            <span className={s.label}>Заголовок</span>
            <input defaultValue={title} className={s.input} />
          </div>
          <div className={s.image__input}>
            <span className={s.label}>
              Нажміть на картинку щоб вибрати нову
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              ref={imageUploader}
              className={s.input__image}
            />
            {/* <button
              className={s.delete__photo}
              onClick={handleRemovePhoto}
              title="Видалити фотографію"
            >
              x
            </button> */}
            <div
              className={s.upload__image}
              onClick={() => imageUploader.current.click()}
            >
              <img
                alt="loading"
                defaultValue={gallery}
                ref={uploadedImage}
                src={gallery}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
          </div>
          <div className={s.news__content}>
            <span className={s.label}>Текст новини</span>
            <textarea className={s.textarea} defaultValue={desc} />
          </div>
          <Button title="Зберегти зміни" />
          <button
            className={s.goBack__but}
            onClick={() => {
              h.goBack();
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} className={s.goBack} />
            Повернутися
          </button>
        </div>
      </FixedWrapper>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    singleNews: state.news.single,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getSingleNews: (id) => dispatch(getSingleNewsAction(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditNews);
