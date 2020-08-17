import React, { useRef } from "react";
import s from "./EditUser.module.css";
import FixedWrapper from "../../../../wrappers/FixedWrapper/FixedWrapper";
import Input from "../../../../misc/Inputs/Input/Input";
import PhoneNumberInput from "../../../../misc/Inputs/PhoneNumberInput/PhoneNumberInput";
import { Link, useHistory } from "react-router-dom";
import Button from "../../../../misc/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import BreadCrumbs from "../../../../misc/BreadCrumbs/BreadCrumbs";

const EditUser = (props) => {
  const uploadedImage = useRef(null);
  const imageUploader = useRef(null);

  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (event) => {
        const img = event.target.result;
        current.src = img;
        // console.log("photo ===", img);
        // patchUser({ ...userData, gallery: img }, token);
        // setUserData((prev) => ({ ...prev, gallery: img }));
      };
      reader.readAsDataURL(file);
      // setUserData((prev) => ({ ...prev, gallery: file }));
    }
  };
  const h = useHistory();

  const breadCrumbsItems = [
    {
      name: "Адмін",
      path: "/admin",
    },
    { name: "Редагувати користувача" },
  ];

  return (
    <div>
      <div className={s.title__container}>
        <h4 className={s.title}>Редагування користувача</h4>
        <BreadCrumbs items={breadCrumbsItems} />
      </div>
      <FixedWrapper>
        <div className={s.image_upload}>
          <input
            placeholder="+"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            ref={imageUploader}
          />
          <div
            style={{
              height: "100px",
              width: "100px",
            }}
            onClick={() => imageUploader.current.click()}
          >
            <img
              ref={uploadedImage}
              // src={
              //   userData.gallery?.length ? userData.gallery : userPhotoIcon
              // }
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50px",
              }}
              alt="Профіль не має зображення"
            />
          </div>
        </div>
        <div className={s.body}>
          <div className={s.user__info}>
            <div className={s.fname}>
              <Input label="Ім'я" />
            </div>
            <div className={s.lname}>
              <Input label="Прізвище" />
            </div>
            <div className={s.father__name}>
              <Input label="По-батькові" />
            </div>
            <div className={s.mail}>
              <Input label="Електронна адреса" />
            </div>
            <div className={s.phone__number}>
              <PhoneNumberInput label="Номер телефону" />
            </div>
          </div>
          <div className={s.address__info}>
            <div className={s.city}>
              <Input label="Місто" />
            </div>
            <div className={s.street}>
              <Input label="Вулиця" />
            </div>
            <div className={s.house}>
              <Input label="Будинок" />
            </div>
            <div className={s.flat}>
              <Input label="Квартира" />
            </div>
            <div className={s.z__index}>
              <Input label="Поштовий індекс" />
            </div>
            <div className={s.np}>
              <Input label="Склад Нової пошти" />
            </div>
          </div>
        </div>
        <div className={s.buttons}>
          <Link to="/">
            <Button className={s.edit__btn} size="md" title="Редагувати" />
          </Link>
          <div className={s.delete__container}>
            <Button
              size="md"
              title="Видалити"
              className={s.delete__btn}
              // onClick={openModal}
            />
          </div>
        </div>
        <div className={s.back__container}>
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

export default EditUser;
