import React from "react";
import "../index.css";
import { statusOptions } from "../../Utils/constant";
const StatusDropdown = ({ value, onChange, status, projectUpdate }) => {
  const projectNone = "None";

  return (
    <select
      className="status_select"
      aria-label="Default select example"
      value={value}
      onChange={onChange}
    >
      <option key={projectNone} value={projectNone}>
        {projectNone}
      </option>
      {status === "status"
        ? statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))
        : projectUpdate.map((option) => (
            <option key={option._id} value={option.projectName}>
              {option.projectName}
            </option>
          ))}
    </select>
  );
};

export default StatusDropdown;
