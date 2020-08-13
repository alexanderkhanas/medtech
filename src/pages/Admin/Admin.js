import React, { useState, useEffect } from "react";
import s from "./Admin.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BreadCrumbs from "../../misc/BreadCrumbs/BreadCrumbs";
import {
  faHome,
  faPlus,
  faSignOutAlt,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
import { TabList, Tabs, Tab, TabPanel } from "react-tabs";
import OrderCard from "../../misc/Admin/OrderCard/OrderCard";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Button from "../../misc/Button/Button";
import OrderProductCard from "../../misc/OrderProductCard/OrderProductCard";
import {
  addToCartAction,
  removeFromCartAction,
} from "../../store/actions/cartActions";
import Input from "../../misc/Inputs/Input/Input";
import { Formik } from "formik";
import Select from "../../misc/Select/Select";
import AdminRow from "../../misc/Admin/AdminRow/AdminRow";
import {
  getProducts,
  getCategoriesAction,
} from "../../store/actions/productsActions";
import {
  createCategoryAction,
  getVendorsAction,
  createVendorAction,
  getAttributesAction,
  deleteAttributeAction,
  deleteCategoryAction,
  getUsersAction,
  createAttributeAction,
  editAttributeAction,
  deleteNewsAction,
} from "../../store/actions/adminActions";
import { getAllNewsAction } from "../../store/actions/newsActions";

const Admin = ({
  isLoading,
  allNews,
  allProducts,
  categories,
  attributes,
  users,
  getCategories,
  getVendors,
  getAttributes,
  getUsers,
  getNews,
  createCategory,
  createVendor,
  createAttribute,
  deleteAttribute,
  deleteCategory,
  deleteNews,
  editAttribute,
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [editingIds, setEditingIds] = useState({
    attribute: { _id: null, name: "" },
    category: { _id: null },
    vendor: { _id: null },
  });

  const breadCrumbsItems = [
    {
      name: "Головна",
      path: "/",
      icon: <FontAwesomeIcon icon={faHome} />,
    },
    { name: "Адмін", path: "/admin" },
  ];

  const h = useHistory();

  useEffect(() => {
    (async () => {
      console.log("isLoading ===", isLoading);

      if (!isLoading && !attributes?.length) {
        console.log("here");

        await getCategories();
        await getVendors();
        await getAttributes();
        await getUsers();
        await getNews();
      }
    })();
  }, []);

  console.log("categories ===", categories);

  return (
    <div className={s.container}>
      <div className={s.title__container}>
        <h4 className={s.title}>Адмін</h4>

        <BreadCrumbs items={breadCrumbsItems} />
      </div>
      <FixedWrapper>
        <Tabs>
          <TabList className={s.tabs}>
            {[
              "Замовлення",
              "Товари",
              "Категорії",
              "Атрибути",
              "Продавці",
              "Користувачі",
              "Новини",
              "Контактна форма",
            ].map((item, i) => (
              <Tab
                onClick={() => setActiveTabIndex(i)}
                key={item}
                className={
                  activeTabIndex === i ? `${s.tab} ${s.tab__active}` : s.tab
                }
              >
                {item}
              </Tab>
            ))}
            <div>
              <Button title="Вийти з акаунту" className={s.logout__button}>
                <FontAwesomeIcon
                  className={s.logout__icon}
                  icon={faSignOutAlt}
                />
              </Button>
            </div>
          </TabList>
          <TabPanel>
            <Link to="/admin/create-order">
              <Button className={s.add__button} title="Створити замовлення">
                <FontAwesomeIcon icon={faPlus} className={s.add__more__icon} />
              </Button>
            </Link>
            <div className={s.order__header}>
              <span>Номер замовлення</span>
              <span>Дата створення</span>
              <span>Статус</span>
              <span>Спосіб оплати</span>
              <span>Спосіб доставки</span>
              <span>Загальна сума</span>
            </div>
            <Link to="/admin/edit-order/:id">
              <OrderCard />
            </Link>
            <OrderCard />
            <OrderCard />
            <OrderCard />
            <OrderCard />
          </TabPanel>
          <TabPanel>
            <Link to="/admin/create-product">
              <Button title="Додати товар">
                <FontAwesomeIcon icon={faPlus} className={s.add__more__icon} />
              </Button>
            </Link>
            <div className={s.products__container}>
              {allProducts.map((product) => (
                <Link
                  key={product._id}
                  to={`/admin/edit-product/${product._id}`}
                >
                  <OrderProductCard
                    isSmall
                    {...{ product }}
                    key={product._id}
                    className={s.container__}
                  />
                </Link>
              ))}
            </div>
          </TabPanel>
          <TabPanel>
            <Formik
              initialValues={{
                name: "",
                parentCategory: null,
                parentCategoryLabel: null,
              }}
              onSubmit={({ name, parentCategory }, { resetForm }) => {
                const categoryToSubmit = {
                  parentID: parentCategory._id,
                  subParentID: null,
                  title: name,
                };
                if (parentCategory.parent?.length) {
                  categoryToSubmit.parent = parentCategory.parent;
                  categoryToSubmit.sub = [
                    { title: parentCategory.title, _id: parentCategory._id },
                  ];
                }
                createCategory(categoryToSubmit);
                resetForm({
                  name: "",
                  parentCategory: null,
                  parentCategoryLabel: null,
                });
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                setValues,
              }) => {
                console.log("example category ===", categories[1]);

                console.log("values ===", values);

                return (
                  <form
                    onSubmit={handleSubmit}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSubmit();
                      }
                    }}
                  >
                    <div className={s.add__category__container}>
                      <Input
                        name="name"
                        label="Назва категорії"
                        placeholder="Інгалятори"
                        value={values.name}
                        containerClass={s.add__category__input__container}
                        inputClass={s.add__category__input}
                        onChange={handleChange}
                        onBlur={handleSubmit}
                      />
                      <Select
                        label="Назва батьківської категорії"
                        containerClass={s.add__category__select__container}
                        // withSearch
                        // noDefaultValue
                        value={values.parentCategoryLabel}
                        onSelect={(selectedOption) => {
                          setValues({
                            ...values,
                            parentCategory: selectedOption.value,
                            parentCategoryLabel: selectedOption.label,
                          });
                          console.log("value ===", selectedOption);
                        }}
                        options={categories
                          .filter(({ sub }) => !sub.length)
                          .map(({ title, parent, _id }) => {
                            const isParentVisible = parent.length;
                            return {
                              label: `${title}${
                                isParentVisible
                                  ? `, батьківська категорія - ${parent[0].title}`
                                  : ""
                              }`,
                              value: {
                                title,
                                _id,
                                parent,
                              },
                            };
                          })}
                      />
                    </div>
                    <Button
                      onClick={handleSubmit}
                      type="submit"
                      className={s.add__button}
                      title="Додати категорію"
                    >
                      <FontAwesomeIcon
                        className={s.add__more__icon}
                        icon={faPlus}
                      />
                    </Button>
                  </form>
                );
              }}
            </Formik>
            <div className={s.order__header}>
              <span>Назва</span>
              <span>Назва батьківської категорії</span>
              <span>Дії</span>
            </div>

            {categories &&
              categories.map(({ sub, parent, _id, title }) => {
                let parentLabel = "";
                if (parent.length && !sub.length) {
                  parentLabel = parent[0].title;
                } else if (sub.length) {
                  parentLabel = sub[0].title;
                }
                return (
                  <AdminRow
                    key={_id}
                    onDelete={() => deleteCategory(_id)}
                    onEdit={() => {}}
                    items={[
                      { title, key: `${_id}title` },
                      { title: parentLabel, key: `${_id}parent` },
                    ]}
                  />
                );
              })}
          </TabPanel>
          <TabPanel>
            <Formik
              initialValues={{ name: "" }}
              onSubmit={({ name }, { resetForm }) => {
                if (name) {
                  const { _id } = editingIds.attribute;
                  if (_id) {
                    editAttribute({ name, _id });
                  } else {
                    createAttribute({ name });
                  }
                  resetForm({ name: "" });
                }
              }}
            >
              {({ handleChange, handleSubmit, values, setValues }) => (
                <>
                  <form className={s.form}>
                    <Input
                      label="Назва атрибута"
                      onChange={handleChange}
                      placeholder="Розмір"
                      containerClass={s.add__category__input__container}
                      inputClass={s.add__category__input}
                      value={values.name}
                      name="name"
                    />
                    <Button
                      onClick={handleSubmit}
                      className={s.add__button}
                      title={
                        editingIds.attribute._id
                          ? "Змінити атрибут"
                          : "Додати атрибут"
                      }
                      type="submit"
                    >
                      <FontAwesomeIcon
                        className={s.add__more__icon}
                        icon={faPlus}
                      />
                    </Button>
                    {!!editingIds.attribute._id && (
                      <Button
                        onClick={() => {
                          setValues({ name: "" });
                          setEditingIds((prev) => ({
                            ...prev,
                            attribute: {},
                          }));
                        }}
                        className={s.remove__button}
                        title="Зупинити редагування"
                        isSecondary
                        type="submit"
                      >
                        <FontAwesomeIcon
                          className={s.add__more__icon}
                          icon={faMinus}
                        />
                      </Button>
                    )}
                  </form>
                  <div className={s.order__header}>
                    <span>Назва атрибута</span>
                    <span>Дії</span>
                  </div>
                  {attributes.map(({ _id, name }) => (
                    <AdminRow
                      key={_id}
                      items={[{ title: name, key: _id }]}
                      onEdit={() => {
                        setValues({ name });
                        setEditingIds((prev) => ({
                          ...prev,
                          attribute: { _id, name },
                        }));
                      }}
                      onDelete={() => deleteAttribute(_id)}
                    />
                  ))}
                </>
              )}
            </Formik>
          </TabPanel>
          <TabPanel>
            <Formik
              initialValues={{
                title: "",
              }}
              onSubmit={({ title }) => {
                createVendor({ title });
              }}
            >
              {({ handleChange, handleSubmit, values }) => {
                return (
                  <div>
                    <div className={s.seller__container}>
                      <Input
                        name="title"
                        label="Назва продавця"
                        placeholder="Germany"
                        value={values.title}
                        containerClass={s.add__category__input__container}
                        inputClass={s.add__category__input}
                        onChange={handleChange}
                      />
                    </div>
                    <Button
                      onClick={handleSubmit}
                      className={s.add__button}
                      title="Додати продавця"
                      type="submit"
                    >
                      <FontAwesomeIcon
                        className={s.add__more__icon}
                        icon={faPlus}
                      />
                    </Button>
                  </div>
                );
              }}
            </Formik>
            <div className={s.order__header}>
              <span>Назва</span>
              <span>Кількість продуктів</span>
            </div>
            {/* <EditSeller />
            <EditSeller />
            <EditSeller />
            <EditSeller />
            <EditSeller />
            <EditSeller /> */}
          </TabPanel>
          <TabPanel>
            <div className={s.create__container}>
              <Link to="/admin/create-user">
                <Button title="Створити користувача" className={s.create__btn}>
                  <FontAwesomeIcon
                    icon={faPlus}
                    className={s.add__more__icon}
                  />
                </Button>
              </Link>
            </div>
            <div className={s.order__header}>
              <span>Ім'я</span>
              <span>Прізвище</span>
              <span>Номер телефону</span>
              <span>Дії</span>
            </div>
            {users.map(({ fName, lName, phone, _id }) => (
              <AdminRow
                items={[
                  { title: fName, key: `${_id}fName` },
                  { title: lName, key: `${_id}lName` },
                  { title: phone, key: `${_id}phone` },
                ]}
                onEdit={() => {}}
                onDelete={() => {}}
              />
            ))}
          </TabPanel>
          <TabPanel>
            <div className={s.create__container}>
              <Link to="/admin/create-news">
                <Button title="Створити новину" className={s.create__btn}>
                  <FontAwesomeIcon
                    icon={faPlus}
                    className={s.add__more__icon}
                  />
                </Button>
              </Link>
            </div>
            <div className={s.order__header}>
              <span>Заголовок</span>
              <span>Текст</span>
              <span>Дата створення</span>
              <span>Дії</span>
            </div>

            <div className={s.section}>
              {/* <h3 className={s.section__title}>Новини</h3> */}

              {allNews.map(({ _id, createdAt, title, desc }) => (
                <AdminRow
                  items={[
                    { title: title.slice(0, 20), key: `${_id}title` },
                    { title: `${desc.slice(0, 20)}...`, key: `${_id}desc` },
                    {
                      title: new Date(createdAt).toISOString().split("T")[0],
                      key: `${_id}date`,
                    },
                  ]}
                  onEdit={() => h.push(`/admin/edit-news/${_id}`)}
                  onDelete={() => deleteNews(_id)}
                  key={_id}
                />
              ))}
            </div>
          </TabPanel>
          <TabPanel>123</TabPanel>
        </Tabs>
      </FixedWrapper>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    allProducts: state.products.all,
    allNews: state.news.all,
    cartProducts: state.cart.all,
    categories: state.products.categories,
    attributes: state.admin.attributes,
    users: state.admin.users,
    isLoading: state.base.isLoading,
    // fullPrice: state.cart.fullPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product) => dispatch(addToCartAction(product)),
    removeFromCart: (product) => dispatch(removeFromCartAction(product)),
    getProducts: () => dispatch(getProducts()),
    getCategories: () => dispatch(getCategoriesAction()),
    getVendors: () => dispatch(getVendorsAction()),
    getAttributes: () => dispatch(getAttributesAction()),
    getUsers: () => dispatch(getUsersAction()),
    getNews: () => dispatch(getAllNewsAction()),
    deleteAttribute: (id) => dispatch(deleteAttributeAction(id)),
    deleteCategory: (id) => dispatch(deleteCategoryAction(id)),
    deleteNews: (id) => dispatch(deleteNewsAction(id)),
    createCategory: (category) => dispatch(createCategoryAction(category)),
    createVendor: (vendor) => dispatch(createVendorAction(vendor)),
    createAttribute: (attribute) => dispatch(createAttributeAction(attribute)),
    editAttribute: (attribute) => dispatch(editAttributeAction(attribute)),
    // setFullPrice: (fullPrice) => dispatch(setFullPriceAction(fullPrice)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
