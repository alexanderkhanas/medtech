import React, { useState, useEffect, useMemo } from "react";
import s from "./OrderAttributeOptions.module.css";
import { cartesianProduct } from "../../../utils/utils";
import Input from "../../Inputs/Input/Input";
import InputMask from "react-input-mask";
import uuid from "react-uuid";

const OrderAttributeOptions = ({ options, setAttrOptions }) => {
  const [combinations, setCombinations] = useState([]);

  const onCombinationInputChange = (value, i) => {
    const combinationsCopy = [...combinations];
    combinationsCopy[i] = { ...combinations[i], priceAttr: +value };
    setCombinations(combinationsCopy);
  };

  useEffect(() => {
    const cartesian = cartesianProduct(options);
    console.log("cartesian ===", cartesian);
    setCombinations(cartesian.map((item) => ({ ...item, _id: uuid() })));
  }, [options]);

  useEffect(() => {
    setAttrOptions(combinations);
  }, [combinations]);

  return (
    <div>
      <div>
        {combinations.map((combination, i) => {
          console.log("combination ===", combination);

          const combinationsJSX = Object.entries(combination).map(
            ([key, value]) =>
              key !== "priceAttr" && (
                <div {...{ key }} className={s.combination__item}>
                  <span>{key}: </span>
                  <span>{value}</span>
                </div>
              )
          );

          return (
            <div className={s.combination} key={i}>
              <div>{combinationsJSX}</div>
              <InputMask
                maskChar=""
                mask="99999999"
                placeholder="100"
                value={combination.priceAttr}
                onChange={({ target }) =>
                  onCombinationInputChange(target.value, i)
                }
              >
                {(props) => (
                  <Input
                    {...props}
                    containerClass={s.combination__input__container}
                  />
                )}
              </InputMask>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderAttributeOptions;
