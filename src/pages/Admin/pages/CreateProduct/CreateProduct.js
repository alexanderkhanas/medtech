import React, { useState, useRef, useEffect, useMemo } from "react";
import s from "./CreateProduct.module.css";
import { connect } from "react-redux";
import Select from "../../../../misc/Select/Select";
import Input from "../../../../misc/Inputs/Input/Input";
import FixedWrapper from "../../../../wrappers/FixedWrapper/FixedWrapper";
import ProfileInput from "../../../../misc/Inputs/ProfileInput/ProfileInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../../misc/Button/Button";
import { Formik, withFormik } from "formik";
import { getCategoriesAction } from "../../../../store/actions/productsActions";
import {
  getVendorsAction,
  getAttributesAction,
} from "../../../../store/actions/adminActions";

const CreateProduct = ({
  getAttributes,
  getCategories,
  getVendors,
  categories,
  vendors,
  attributes,
  handleChange,
  values,
  setValues,
}) => {
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [filteredAttributes, setFilteredAttributes] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const uploadedImage = useRef(null);
  const imageUploader = useRef(null);

  const handleImages = ({ target: { files } }) => {
    Array.from(files).forEach((file) => {
      const reader = new FileReader();

      reader.onload = ({ target: { result } }) => {
        setValues({
          ...values,
          gallery: [...values.gallery, result],
        });
        console.log("result ===", result);
      };
      reader.readAsDataURL(file);
    });
  };

  const onCategorySelect = (...rest) => {
    console.log(rest);
  };

  const onCategoryInputChange = (value) => {
    const filtered = categories.filter((category) =>
      category.title.trim().toLowerCase().startsWith(value.trim().toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  const onAttributeSelect = ({ value }) => {
    const isValueAlreadyExist = !!values.attributesLabels.filter(
      (attribute) => attribute._id === value._id
    ).length;
    if (!isValueAlreadyExist) {
      setValues({
        ...values,
        attributesLabels: [...values.attributesLabels, value],
        attributes: { ...values.attributes, [value._id]: [] },
      });
    }
  };

  const onAttributeInputChange = (value) => {
    const filtered = attributes.filter((attribute) =>
      attribute.name.trim().toLowerCase().startsWith(value.trim().toLowerCase())
    );
    setFilteredAttributes(filtered);
  };

  const onAttributeValueChange = (value, id, index) => {
    const temp = [...values.attributes[id]];
    temp[index] = value;
    setValues({
      ...values,
      attributes: {
        ...values.attributes,
        [id]: temp,
      },
    });
  };

  const onVendorInputChange = (value) => {
    const filtered = vendors.filter((vendor) =>
      vendor.title.trim().toLowerCase().startsWith(value.trim().toLowerCase())
    );
    setFilteredVendors(filtered);
  };

  const deleteImage = (imageToDelete) => {
    const filteredGallery = values.gallery.filter(
      (image) => image !== imageToDelete
    );
    setValues({ ...values, gallery: filteredGallery });
  };

  const vendorsOptions = useMemo(() => {
    return filteredVendors.map((vendor) => ({
      label: vendor.title,
      value: vendor,
    }));
  }, [filteredVendors]);

  const categoriesOptions = useMemo(() => {
    return filteredCategories.map((category) => ({
      label: category.title,
      value: category,
    }));
  }, [filteredCategories]);

  const attributesOptions = useMemo(() => {
    return filteredAttributes.map((attribute) => ({
      label: attribute.name,
      value: attribute,
    }));
  }, [filteredAttributes]);

  console.log("vendor options ===", vendorsOptions);
  console.log("filtered vendor ===", filteredVendors);
  console.log("attributes ===", attributes);

  useEffect(() => {
    if (!vendors.length) {
      getAttributes();
      getCategories();
      getVendors();
    }
  }, []);

  useEffect(() => {
    setFilteredVendors(vendors);
  }, [vendors]);

  useEffect(() => {
    setFilteredCategories(categories);
  }, [categories]);

  useEffect(() => {
    setFilteredAttributes(attributes);
  }, [attributes]);

  return (
    <div className={s.container}>
      <div className={s.title__container}>
        <h1 className={s.title}>Створення товару</h1>
      </div>
      <FixedWrapper>
        <form className={s.body}>
          <Input
            label="Назва"
            value={values.title}
            name="title"
            placeholder="Стетоскоп"
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
            placeholder="Багатофункціональний високоякісний стетоскоп типу SPRAGUE RAPPAPORT."
            onChange={handleChange}
            containerClass={s.input__container}
            isTextarea
          />
          <Input
            label="Ціна"
            value={values.title}
            placeholder="123"
            onChange={handleChange}
            containerClass={s.input__container}
          />
          <Select
            label="Країна виробника"
            value={values.vendor}
            withSearch
            noDefaultValue
            onSearchValueChange={onVendorInputChange}
            options={vendorsOptions}
            containerClass={s.input__container}
          />
          <Select
            label="Категорія"
            value={values.category}
            withSearch
            noDefaultValue
            onSearchValueChange={onCategoryInputChange}
            options={categoriesOptions}
            containerClass={s.input__container}
          />
          <Select
            label="Атрибути"
            value={values.attribute}
            withSearch
            noDefaultValue
            clearInputOnSelect
            onSelect={onAttributeSelect}
            onSearchValueChange={onAttributeInputChange}
            options={attributesOptions}
            containerClass={s.input__container}
          />
          {values.attributesLabels.map(({ _id, name }) => {
            console.log("length ===", [
              ...Array(values.attributes[_id].length + 1).keys(),
            ]);
            console.log("values.attributes ===", values.attributes);

            return (
              <div key={_id} className={s.attribute}>
                <p>{name}</p>
                <div>
                  {[...Array(values.attributes[_id].length + 1).keys()].map(
                    (number) => (
                      <Input
                        placeholder="Значення атрибута"
                        key={_id + number}
                        onChange={({ target }) =>
                          onAttributeValueChange(target.value, _id, number)
                        }
                      />
                    )
                  )}
                </div>
              </div>
            );
          })}
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
      </FixedWrapper>
    </div>
  );
};

const formikHOC = withFormik({
  mapPropsToValues: () => ({
    title: "",
    desc: "",
    gallery: [],
    price: "",
    vendor: "",
    quantity: 1,
    recommended: false,
    attributesLabels: [],
    attributes: {},
  }),
})(CreateProduct);

const mapStateToProps = (state) => {
  return {
    categories: state.products.categories,
    vendors: state.admin.vendors,
    attributes: state.admin.attributes,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: () => dispatch(getCategoriesAction()),
    getVendors: () => dispatch(getVendorsAction()),
    getAttributes: () => dispatch(getAttributesAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
