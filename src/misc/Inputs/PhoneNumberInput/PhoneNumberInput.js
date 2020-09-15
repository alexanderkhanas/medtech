import React from "react";
import s from "./PhoneNumberInput.module.css";
import InputMask from "react-input-mask";
import Input from "../Input/Input";

const PhoneNumberInput = ({
  value,
  onChange,
  onFocus = () => {},
  onBlur = () => {},
  children,
  label,
  ...rest
}) => (
  <InputMask
    mask="+380-99-999-9999"
    placeholder="+380-99-123-4567"
    maskChar={null}
    {...{ value }}
    {...{ onFocus }}
    {...{ onBlur }}
    {...{ onChange }}
    {...{ label }}
  >
    {(inputProps) => (
      <Input {...rest} {...inputProps} type="tel">
        {children}
      </Input>
    )}
  </InputMask>
);
export default PhoneNumberInput;
