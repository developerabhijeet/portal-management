import React from "react";
import "../index.css";
const StatusDropdown = ({ value, onChange, options }) => {
  const SelectOptions = ({ value, label }) => (
    <option value={value}>{label}</option>
  );
  return (
    <select
      className="status_select"
      aria-label="Default select example"
      value={value}
      onChange={onChange}
    >
      {options.map((option) => (
        <SelectOptions
          key={option.value}
          value={option.value}
          label={option.label}
        />
      ))}
    </select>
  );
};

export default StatusDropdown;
