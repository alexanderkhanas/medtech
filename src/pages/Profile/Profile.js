import React, { useState, useRef, useEffect, useMemo } from "react";
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
import _axios from "../../store/api/_axios";
import Modal from "../../misc/Modal/Modal";
import { connect } from "react-redux";
import userPhotoIcon from "../../assets/profile.png";
import {
  getUserByIdAction,
  patchUserAction,
} from "../../store/actions/profileActions";

const Profile = ({ user, getUser, patchUser }) => {
  const { id } = useParams();
  const h = useHistory();
  const breadCrumbsItems = [
    {
      name: "Головна",
      path: "/",
      icon: <FontAwesomeIcon icon={faHome} />,
    },
    { name: "Профіль", path: "/profile" },
  ];

  const token = useMemo(() => {
    return document.cookie
      .split("; ")
      .filter((value) => value.startsWith("token"))[0]
      .split("=")[1];
  }, [document.cookie]);

  //   const { oderData, oderAddress, oderHistory } = userData;
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const uploadedImage = useRef(null);
  const imageUploader = useRef(null);
  const [userData, setUserData] = useState({ ...user });

  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (event) => {
        const img = event.target.result;
        current.src = img;
        console.log("photo ===", img);
        patchUser({ ...userData, gallery: img }, token);
        setUserData((prev) => ({ ...prev, gallery: img }));
      };
      reader.readAsDataURL(file);
      // setUserData((prev) => ({ ...prev, gallery: file }));
    }
  };
  const handleSubmit = () => {
    console.log({ phone: parseInt("0", 10) });

    patchUser({ ...userData, phone: +userData.phone }, token);
  };
  const [show, setShow] = useState(false);
  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);
  const handleRemovePhoto = (e) => {
    setUserData((prev) => ({ ...prev, gallery: [] }));
  };

  const onInputChange = (e) => {
    const { value, name } = e.target;
    console.log(name, ":", value);

    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (document.cookie.includes("token")) {
      getUser(token);
      console.log("token ===", token);
    } else {
      h.push("/login");
    }
  }, []);

  useEffect(() => {
    setUserData(user);
  }, [user]);

  useEffect(() => {
    console.log("user data ===", userData);
  }, [userData]);

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
                    key={item}
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
                            placeholder="+"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            ref={imageUploader}
                          />
                          {!!userData.gallery?.length && (
                            <button
                              className={s.delete__photo}
                              onClick={handleRemovePhoto}
                              title="Видалити фотографію"
                            >
                              x
                            </button>
                          )}

                          <div
                            style={{
                              height: "100px",
                              width: "100px",
                            }}
                            onClick={() => imageUploader.current.click()}
                          >
                            <img
                              ref={uploadedImage}
                              src={
                                userData.gallery?.length
                                  ? userData.gallery
                                  : userPhotoIcon
                              }
                              style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: "50px",
                              }}
                              alt=""
                            />
                          </div>
                        </div>
                        <div className={s.container_title}>
                          <h4>Персональні дані</h4>
                        </div>
                        <FontAwesomeIcon
                          icon={faSignOutAlt}
                          //   onClick={logout}
                          onClick={openModal}
                          className={s.profile__info__icon}
                        />
                        {show && <Modal closeModal={closeModal} show={show} />}
                      </div>
                      <div className={s.profile__info__field}>
                        <ProfileInput
                          label="Ім'я"
                          val="firstName"
                          icon={faUser}
                          name="fName"
                          value={userData.fName}
                          placeholder="John"
                          onChange={onInputChange}
                        />
                      </div>
                      <div className={s.profile__info__field}>
                        <ProfileInput
                          label="Прізвище"
                          val="lName"
                          placeholder="Smith"
                          icon={faAddressCard}
                          name="lName"
                          value={userData.lName}
                          onChange={onInputChange}
                        />
                      </div>
                      <div className={s.profile__info__field}>
                        <ProfileInput
                          label="По-батькові"
                          val="fatherName"
                          placeholder="JohnDoevich"
                          value={userData.fatherName}
                          icon={faAddressCard}
                          name="fatherName"
                          onChange={onInputChange}
                        />
                      </div>
                      <div className={s.profile__info__field}>
                        <ProfileInput
                          label="Номер телефону"
                          val="phone"
                          placeholder="+380991234567"
                          type="tel"
                          value={userData.phone}
                          icon={faPhoneAlt}
                          name="phone"
                          onChange={onInputChange}
                        />
                      </div>
                      <div className={s.profile__info__field}>
                        <ProfileInput
                          val="Електронна адреса"
                          label="E-mail"
                          placeholder="johndoe@gmail.com"
                          name="email"
                          value={userData.email}
                          icon={faEnvelope}
                          onChange={onInputChange}
                        />
                      </div>

                      <button
                        className={s.save__profile__btn}
                        onClick={handleSubmit}
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
                        <div
                          style={{
                            height: "100px",
                            width: "100px",
                          }}
                          onClick={() => imageUploader.current.click()}
                        >
                          <img
                            ref={uploadedImage}
                            src={
                              userData.gallery?.length
                                ? userData.gallery
                                : userPhotoIcon
                            }
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "50px",
                              // backgroundColor: "gray",
                            }}
                            alt=""
                          />
                        </div>
                        <h4 className={s.container_title}>Ваша адреса</h4>
                        <FontAwesomeIcon
                          icon={faSignOutAlt}
                          //   onClick={logout}
                          className={s.profile__info__icon}
                        />
                      </div>

                      <div className={s.profile__info__field}>
                        <ProfileInput
                          label="Місто"
                          val="city"
                          icon={faCity}
                          //   defaultValue={profileInfo.firstName}
                          //   onChange={onChange}
                        />
                      </div>
                      <div className={s.profile__info__field}>
                        <ProfileInput
                          label="Вулиця"
                          val="street"
                          icon={faStreetView}
                          //   defaultValue={profileInfo.lastName}
                          //   onChange={onChange}
                        />
                      </div>
                      <div className={s.profile__info__field}>
                        <ProfileInput
                          label="Будинок"
                          val="house"
                          icon={faHouseUser}
                          //   defaultValue={profileInfo.lastName}
                          //   onChange={onChange}
                        />
                      </div>
                      <div className={s.profile__info__field}>
                        <ProfileInput
                          label="Квартира"
                          val="apartment"
                          icon={faBuilding}
                          //   defaultValue={profileInfo.phone}
                          //   onChange={onChange}
                        />
                      </div>
                      <div className={s.profile__info__field}>
                        <ProfileInput
                          label="Поштовий індекс"
                          val="zip-code"
                          icon={faKeyboard}
                          //   defaultValue={profileInfo.email}
                          //   onChange={onChange}
                        />
                      </div>
                      <div className={s.profile__info__field}>
                        <ProfileInput
                          label="Склад Нової пошти"
                          val="np-number"
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
            <TabPanel></TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (id) => dispatch(getUserByIdAction(id)),
    patchUser: (user, token) => dispatch(patchUserAction(user, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
