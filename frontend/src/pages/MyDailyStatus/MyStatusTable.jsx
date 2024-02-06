import React from "react";
import { FaPen } from "react-icons/fa6";
import { BiSolidShow } from "react-icons/bi";
const StatusTable = ({ data, handleNavigate, handleNavigate_Edit }) => {
  return (
    <table className="table">
      <thead>
        <tr className="status">
          <th>Name</th>
          <th>Status Date</th>
          <th>In-Time</th>
          <th>In-Out</th>
          <th>Total Hours</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody className="status">
        {data && data.length > 0
          ? data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    {item.user.firstName} {item.user.lastName}
                  </td>
                  <td>{item.dueDate}</td>
                  <td></td>
                  <td></td>
                  <td>:</td>
                  <td>
                    <div>
                      {item.completed ? (
                        <button
                          className="eyeicon"
                          onClick={() => handleNavigate(item)}
                        >
                          <BiSolidShow />
                          Show
                        </button>
                      ) : (
                        <button
                          className="Edit_icon"
                          onClick={() => handleNavigate_Edit(item, index)}
                        >
                          <FaPen />
                          Edit
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })
          : null}
      </tbody>
    </table>
  );
};

export default StatusTable;
