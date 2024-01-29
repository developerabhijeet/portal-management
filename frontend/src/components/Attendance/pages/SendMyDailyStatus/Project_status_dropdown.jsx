import React from "react";
import { Project_statusOptions } from "../../../../Utils/constant";
import "../../dashboard.css";
const Project_StatusDropdown = ({ value, onChange }) => {
  return (
    <select
      className="project_select"
      aria-label="Default select example"
      value={value}
      onChange={onChange}
    >
      <option value="">Select Project</option>
      {Project_statusOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Project_StatusDropdown;
