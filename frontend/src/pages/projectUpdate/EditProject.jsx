import { Table, Button, Form } from "react-bootstrap";
import Header from "../../components/Header";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BaseURL } from "../../Utils/utils";
import { useLocation } from "react-router-dom";
import "./EditProject.css";

const EditProject = () => {
  const location = useLocation();
  const { id, firstName, lastName } = location.state;

  const [projectNames, setProjectNames] = useState({});
  const [projects, setProjects] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BaseURL}/project/${id}`);
      setProjects(response.data.projects);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusSubmit = async (userId) => {
    try {
      await axios.post(`${BaseURL}/project/${userId}`, {
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
      fetchData();
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="containerCls bg-dark">
        <h3 className="heading1">
          {firstName} {lastName}
        </h3>
        <Form className="m-3">
          <Form.Group className="mb-4" controlId="formGroupEmail">
            <Form.Label className="fw">Add Project</Form.Label>
            <Form.Control
              type="text"
              name="project"
              placeholder="Project Name"
              className="bg-dark text-white"
              value={projectNames[id] || ""}
              onChange={(e) =>
                setProjectNames((prevProjectNames) => ({
                  ...prevProjectNames,
                  [id]: e.target.value,
                }))
              }
            />
          </Form.Group>
          <Button
            className="me-3 fw"
            variant="success"
            onClick={() => handleStatusSubmit(id)}
          >
            Add
          </Button>
        </Form>
      </div>
      <div>
        {projects.length > 0 ? (
          <Table className="container mt-4" striped hover variant="dark">
            <thead>
              <tr>
                <th>Assigned Project Name</th>
                <th>Operations</th>
              </tr>
            </thead>
            <tbody>
              {projects.length > 0 &&
                projects.map((item) => (
                  <tr key={item._id}>
                    <td>{item.projectName}</td>
                    <td>
                      <Button className="me-3" size="sm" variant="primary">
                        Edit
                      </Button>
                      <Button variant="danger" size="sm">
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        ) : (
          <p className="noProjects">No Projects Alloted</p>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default EditProject;
