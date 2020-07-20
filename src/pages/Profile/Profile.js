import React, { useState, useRef } from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import s from "./Profile.module.css";
import {
  faHome,
  faSignOutAlt,
  faAddressCard,
  faEnvelope,
  faPhoneAlt,
  faPencilAlt,
  faUser,
  faUserCircle,
  faCity,
  faStreetView,
  faHouseUser,
  faBuilding,
  faKeyboard,
  faMailBulk,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BreadCrumbs from "../../misc/BreadCrumbs/BreadCrumbs";
import ProfileInput from "../../misc/Inputs/ProfileInput/ProfileInput";
import { useHistory, useParams } from "react-router-dom";

function Profile(props) {
  const { id } = useParams();
  const [profileInfo, setProfileInfo] = useState(null);
  const [profileData, setProfileData] = useState();
  const h = useHistory();
  const breadCrumbsItems = [
    {
      name: "Головна",
      path: "/",
      icon: <FontAwesomeIcon icon={faHome} />,
    },
    { name: "Профіль", path: "/profile" },
  ];

  //   const { oderData, oderAddress, oderHistory } = userData;
  const [activeTabIndex, setActiveTabIndex] = useState(0);
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
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={s.body}>
      <div className={s.container}>
        <div className={s.title__container}>
          <h3 className={s.title}>Мій профіль</h3>
          <BreadCrumbs items={breadCrumbsItems} />
        </div>
        <div>
          <Tabs>
            <TabList className={s.tabs}>
              {["Ваші дані", "Ваша адреса", "Історія Замовлень"].map(
                (item, i) => (
                  <Tab
                    onClick={() => setActiveTabIndex(i)}
                    key={i}
                    className={
                      activeTabIndex === i ? `${s.tab} ${s.tab__active}` : s.tab
                    }
                  >
                    {item}
                  </Tab>
                )
              )}
            </TabList>
            <TabPanel>
              <div className={`${s.profile} container cont__margin`}>
                <div className={s.profile__main}>
                  <div className={s.profile__info}>
                    <div className={s.profile__info__fields}>
                      <div className={s.profile__info__title}>
                        <div className={s.image_upload}>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            ref={imageUploader}
                            style={
                              {
                                //   display: "none",
                              }
                            }
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
                              style={{
                                width: "100%",
                                height: "100%",
                                position: "acsolute",
                                borderRadius: "50px",
                              }}
                            />
                          </div>
                        </div>
                        <span>Персональні дані</span>
                        <FontAwesomeIcon
                          icon={faSignOutAlt}
                          //   onClick={logout}
                          className={s.profile__info__icon}
                        />
                      </div>

                      <div className={s.profile__info__field}>
                        <ProfileInput
                          label="Ім'я"
                          val={"firstName"}
                          icon={faUser}
                          //   defaultValue={profileInfo.firstName}
                          //   onChange={onChange}
                        />
                      </div>
                      <div className={s.profile__info__field}>
                        <ProfileInput
                          label="Прізвище"
                          val={"firstName"}
                          icon={faAddressCard}
                          //   defaultValue={profileInfo.lastName}
                          //   onChange={onChange}
                        />
                      </div>
                      <div className={s.profile__info__field}>
                        <ProfileInput
                          label="По-батькові"
                          val={"lastName"}
                          icon={faAddressCard}
                          //   defaultValue={profileInfo.lastName}
                          //   onChange={onChange}
                        />
                      </div>
                      <div className={s.profile__info__field}>
                        <ProfileInput
                          label="Номер телефону"
                          val={"phone"}
                          type={"tel"}
                          icon={faPhoneAlt}
                          //   defaultValue={profileInfo.phone}
                          //   onChange={onChange}
                        />
                      </div>
                      <div className={s.profile__info__field}>
                        <ProfileInput
                          val={"Електронна адреса"}
                          label="E-mail"
                          icon={faEnvelope}
                          //   defaultValue={profileInfo.email}
                          //   onChange={onChange}
                        />
                      </div>

                      <button
                        className={s.save__profile__btn}
                        // onClick={editProfile}
                      >
                        Змінити
                        <span className={s.profile__btn__overlay}>
                          <FontAwesomeIcon
                            icon={faPencilAlt}
                            className={s.profile__btn__overlay__icon}
                          />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <div className={`${s.profile} container cont__margin`}>
                <div className={s.profile__main}>
                  <div className={s.profile__info}>
                    <div className={s.profile__info__fields}>
                      <div className={s.profile__info__title}>
                        <div className={s.image_upload}>
                          <label for="file-input">
                            <FontAwesomeIcon
                              icon={faUserCircle}
                              className={s.profile__img}
                            />
                          </label>
                          <input
                            id="file-input"
                            type="file"
                            accept="image/*,image/jpeg"
                          />
                        </div>
                        <span>Ваша адреса</span>
                        <FontAwesomeIcon
                          icon={faSignOutAlt}
                          //   onClick={logout}
                          className={s.profile__info__icon}
                        />
                      </div>

                      <div className={s.profile__info__field}>
                        <ProfileInput
                          label="Місто"
                          val={"city"}
                          icon={faCity}
                          //   defaultValue={profileInfo.firstName}
                          //   onChange={onChange}
                        />
                      </div>
                      <div className={s.profile__info__field}>
                        <ProfileInput
                          label="Вулиця"
                          val={"street"}
                          icon={faStreetView}
                          //   defaultValue={profileInfo.lastName}
                          //   onChange={onChange}
                        />
                      </div>
                      <div className={s.profile__info__field}>
                        <ProfileInput
                          label="Будинок"
                          val={"house"}
                          icon={faHouseUser}
                          //   defaultValue={profileInfo.lastName}
                          //   onChange={onChange}
                        />
                      </div>
                      <div className={s.profile__info__field}>
                        <ProfileInput
                          label="Квартира"
                          val={"apartment"}
                          icon={faBuilding}
                          //   defaultValue={profileInfo.phone}
                          //   onChange={onChange}
                        />
                      </div>
                      <div className={s.profile__info__field}>
                        <ProfileInput
                          label="Поштовий індекс"
                          val={"zip-code"}
                          icon={faKeyboard}
                          //   defaultValue={profileInfo.email}
                          //   onChange={onChange}
                        />
                      </div>
                      <div className={s.profile__info__field}>
                        <ProfileInput
                          label="Склад Нової пошти"
                          val={"np-number"}
                          icon={faMailBulk}
                          //   defaultValue={profileInfo.email}
                          //   onChange={onChange}
                        />
                      </div>

                      <button
                        className={s.save__profile__btn}
                        // onClick={editProfile}
                      >
                        Змінити
                        <span className={s.profile__btn__overlay}>
                          <FontAwesomeIcon
                            icon={faPencilAlt}
                            className={s.profile__btn__overlay__icon}
                          />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Profile;
