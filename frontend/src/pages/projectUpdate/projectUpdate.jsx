import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BaseURL } from "../../Utils/utils";
import Header from "../../components/Header";
const ProjectUpdate = () => {
  const [users, setUsers] = useState([]);
  const [projectNames, setProjectNames] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BaseURL}/auth/getUser`);
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [setUsers]);

  const handleStatusSubmit = async (userId) => {
    try {
      await axios.put(`${BaseURL}/project/${userId}`, {
        projectName: projectNames[userId],
        user: userId,
      });

      toast.success("Project added successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
      });

      setProjectNames((prevProjectNames) => ({
        ...prevProjectNames,
        [userId]: "",
      }));
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  return (
    <>
      <Header />
      <table className="table">
        <thead>
          <tr className="status">
            <th>Name</th>
            <th>Assign Project Name</th>
          </tr>
        </thead>
        <tbody className="status">
          {users.length > 0 &&
            users.map((item, index) => (
              <tr key={index}>
                <td>{item.username}</td>
                <td>
                  <input
                    className="projectInput"
                    type="text"
                    value={projectNames[item._id] || ""}
                    onChange={(e) =>
                      setProjectNames((prevProjectNames) => ({
                        ...prevProjectNames,
                        [item._id]: e.target.value,
                      }))
                    }
                  />
                </td>
                <td>
                  <button
                    className="projectupdateBtn"
                    onClick={() => handleStatusSubmit(item._id)}
                  >
                    Save
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <ToastContainer />
    </>
  );
};

export default ProjectUpdate;
