import React from "react";
import InputMask from "react-input-mask";
import Input from "../Input/Input";

const PhoneNumberInput = (props) => (
  <InputMask
    mask="+380-99-999-9999"
    placeholder="Номер телефону"
    maskChar={null}
    value={props.value}
    onChange={props.onChange}
  >
    {(inputProps) => <Input {...inputProps} type="tel" disableUnderline />}
  </InputMask>
);
export default PhoneNumberInput;
