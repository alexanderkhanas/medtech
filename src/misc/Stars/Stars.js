import React from "react";
import s from "./Stars.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import classnames from "classnames";

const Stars = ({
  containerClass,
  value,
  isStatic = true,
  setValue,
  size = "md",
}) => {
  return (
    <div className={`${s.container} ${containerClass}`}>
      {[1, 2, 3, 4, 5].map((item, i) => {
        const isActive = item <= value;

        return (
          <FontAwesomeIcon
            key={i}
            onClick={!isStatic ? () => setValue(item) : () => {}}
            icon={isActive ? faStar : farStar}
            className={classnames(s.star__icon, {
              [s.md]: size === "md",
              [s.sm]: size === "sm",
              [s.lg]: size === "lg",
            })}
          />
        );
      })}
    </div>
  );
};

export default Stars;
