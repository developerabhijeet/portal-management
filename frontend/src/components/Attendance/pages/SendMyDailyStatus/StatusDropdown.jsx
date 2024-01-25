import React from "react";
import { statusOptions } from "../../../../Utils/constant";
import "../../dashboard.css";
const StatusDropdown = ({ value, onChange }) => {
  return (
    <select
      className="status_select"
      aria-label="Default select example"
      value={value}
      onChange={onChange}
    >
      <option value="">Select Status</option>
      {statusOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default StatusDropdown;
