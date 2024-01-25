import React from "react"
import Select from "react-select";

const countries = [
  { value: "USA", label: "United States" },
  { value: "Canada", label: "Canada" },
  { value: "UK", label: "United Kingdom" },
  {value:"India",label:"India"},
  {value:"China",label:"China"},
  {value:"Japan",label:"Japan"}
];
const SelectCom = ({ value, onChange, onBlur }) => {

   return(
    <>
    <Select
      placeholder="Country"
      options={countries}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
    </>
   )
}
export default SelectCom