import React, { useState, useRef, useEffect } from "react";
import s from "./ProductsView.module.css";
import { connect } from "react-redux";
import AdminRow from "../AdminRow/AdminRow";
import Pagination from "../../Pagination/Pagination";
import { useHistory } from "react-router-dom";
import { scrollToRef } from "../../../utils/utils";
import { filterProductsAction } from "../../../store/actions/productsActions";
import { deleteProductAction } from "../../../store/actions/adminActions";

const ProductsView = ({
  filteredProducts,
  filteredProductsQuantity,
  filterProducts,
  deleteProduct,
}) => {
  const h = useHistory();
  const [activePage, setActivePage] = useState(1);
  const containerRef = useRef();

  const onPageChange = ({ selected }) => {
    setActivePage(selected + 1);
    // getProductsByPage(selected + 1);
    scrollToRef(containerRef);
  };

  useEffect(() => {
    filterProducts([], "", activePage);
  }, [activePage]);
  return (
    <div className={s.products__container} ref={containerRef}>
      <div className={s.order__header}>
        <span>Назва</span>
        <span>Ціна</span>
        <span>Артикул</span>
        <span>Дії</span>
      </div>
      {filteredProducts.map(({ _id, title, price, article }) => (
        // <Link key={_id} >
        <AdminRow
          items={[
            { title, key: `${_id}title` },
            { title: price, key: `${_id}price` },
            { title: article, key: `${_id}article` },
          ]}
          onDelete={() => deleteProduct(_id)}
          onEdit={() => h.push(`/admin/edit-product/${_id}`)}
        />
        // </Link>
      ))}
      <Pagination
        pageCount={Math.ceil(filteredProductsQuantity / 24)}
        {...{ onPageChange }}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    filteredProducts: state.products.filtered,
    filteredProductsQuantity: state.products.filteredQuantity,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    filterProducts: (categories, searchValue, page) =>
      dispatch(filterProductsAction(categories, searchValue, page)),
    deleteProduct: (id) => dispatch(deleteProductAction(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsView);
