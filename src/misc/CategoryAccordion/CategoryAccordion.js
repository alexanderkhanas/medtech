import React, { useState } from "react";
import s from "./CategoryAccordion.module.css";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusSquare,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";

const CategoryAccordion = ({
  parent,
  selectCategory,
  removeCategory,
  selectedCategories,
}) => {
  const [parentExpandedState, setParentExpandedState] = useState(false);
  const [subchildExpandedState, setSubchildExpandedState] = useState({});
  const { childs } = parent;
  const { subchilds } = parent;

  const onCategoryClick = (name, id, isActive) => {
    if (!isActive) {
      selectCategory(name, id);
    } else {
      removeCategory(name);
    }
  };

  const isSelected = (name) =>
    !!selectedCategories.filter((category) => category.name === name).length;

  const isParentActive = isSelected(parent.title);

  return (
    <div className={s.accordion__container}>
      {/* parent */}
      <div className={`${s.category__item} ${s.parent__category__item}`}>
        <p
          onClick={() =>
            onCategoryClick(parent.title, parent._id, isParentActive)
          }
          className={
            isParentActive
              ? `${s.category__text} ${s.category__text__active}`
              : s.category__text
          }
        >
          {parent.title}
        </p>
        {!!subchilds.length && (
          <FontAwesomeIcon
            onClick={() => setParentExpandedState((prev) => !prev)}
            icon={parentExpandedState ? faMinus : faPlus}
            className={s.category__item__btn}
          />
        )}
      </div>
      <div
        className={
          parentExpandedState
            ? s.subchilds__container
            : `${s.subchilds__container} ${s.invisible}`
        }
      >
        {/*subchilds*/}
        {subchilds.map((subchild) => {
          const isSubchildActive = isSelected(subchild.title);
          return (
            <div
              key={subchild._id}
              className={`${s.category__list} ${s.subchild__category__list}`}
            >
              <div className={s.category__item}>
                <p
                  onClick={() =>
                    onCategoryClick(
                      subchild.title,
                      subchild._id,
                      isSubchildActive
                    )
                  }
                  className={
                    isSubchildActive
                      ? `${s.category__text} ${s.category__text__active}`
                      : s.category__text
                  }
                >
                  {subchild.title}
                </p>
                {!!childs[subchild._id]?.length && (
                  <FontAwesomeIcon
                    onClick={() =>
                      setSubchildExpandedState((prev) => ({
                        ...prev,
                        [subchild._id]: !prev[subchild._id],
                      }))
                    }
                    icon={
                      subchildExpandedState[subchild._id] ? faMinus : faPlus
                    }
                    className={s.category__item__btn}
                  />
                )}
              </div>
              {/*childs*/}
              <div
                className={
                  subchildExpandedState[subchild._id]
                    ? s.childs__container
                    : `${s.childs__container} ${s.invisible}`
                }
              >
                {childs[subchild._id] &&
                  childs[subchild._id].map((child) => {
                    const isChildActive = isSelected(child.title);
                    return (
                      <div
                        key={child._id}
                        className={s.category__item}
                        onClick={() =>
                          onCategoryClick(child.title, child._id, isChildActive)
                        }
                      >
                        <p
                          className={
                            isChildActive
                              ? `${s.category__text} ${s.category__text__active}`
                              : s.category__text
                          }
                        >
                          {child.title}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryAccordion);
