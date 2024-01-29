import React from "react";
import {
  statusOptions,
  Project_statusOptions,
} from "../../../../Utils/constant";
import "../../dashboard.css";
const StatusDropdown = ({ value, onChange, status }) => {
  return (
    <select
      className="status_select"
      aria-label="Default select example"
      value={value}
      onChange={onChange}
    >
      {status === "project"
        ? statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))
        : Project_statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
    </select>
  );
};

export default StatusDropdown;
