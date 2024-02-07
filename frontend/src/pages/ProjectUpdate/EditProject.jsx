import { Table, Button, Form, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BaseURL } from "../../Utils/utils";
import { useLocation } from "react-router-dom";
import "./EditProject.css";
import Layout from "../../components/Layout";

const EditProject = () => {
  const location = useLocation();
  const { id, firstName, lastName } = location.state;
  const [projectNames, setProjectNames] = useState({});
  const [projects, setProjects] = useState([]);
  const [editProject, setEditProject] = useState({
    projectName: "",
    showEditModal: false,
  });
  const [addProjectError, setAddProjectError] = useState("");
  const [editProjectError, setEditProjectError] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${BaseURL}/project/${id}`);
          setProjects(response.data.projects);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchData();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [projectNames, editProject]);

  const handleAddProject = async (userId) => {
    if (!projectNames[id] || !projectNames[id].trim()) {
      setAddProjectError("Please enter a project name");
    } else {
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
      } catch (error) {
        console.error("Error adding project:", error);
      }
    }
  };

  const handleAddInput = (e) => {
    setProjectNames((prevProjectNames) => ({
      ...prevProjectNames,
      [id]: e.target.value,
    }));
    setAddProjectError("");
  };
  const handleEditProject = (projectId) => {
    const project = projects.find((item) => item._id === projectId);
    if (project) {
      const { projectName } = project;
      setEditProject({
        ...editProject,
        showEditModal: true,
        projectName: projectName,
        projectId: projectId,
      });
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditProject({
      ...editProject,
      [name]: value,
    });
    setEditProjectError("");
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editProject.projectName.trim()) {
      setEditProjectError("Please enter a project name");
    } else {
      const { projectName, projectId } = editProject;
      try {
        await axios.put(`${BaseURL}/project/${projectId}`, {
          projectName: projectName,
          user: id,
        });

        toast.success("Project edited successfully!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
        });
      } catch (error) {
        console.error("Error updating project:", error);
      }
      handleCloseModal();
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await axios.delete(`${BaseURL}/project/${projectId}`);

      toast.success("Project Deleted successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
      });
      const fetchData = async () => {
        try {
          const response = await axios.get(`${BaseURL}/project/${id}`);
          setProjects(response.data.projects);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchData();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };
  const handleCloseModal = () =>
    setEditProject({ ...editProject, showEditModal: false });
  return (
    <>
      <Layout>
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
                onChange={(e) => handleAddInput(e)}
              />
            </Form.Group>
            {addProjectError && <p className="errors">{addProjectError}</p>}
            <Button
              className="me-3 fw"
              variant="success"
              onClick={() => handleAddProject(id)}
            >
              Add
            </Button>
          </Form>
        </div>
        <div>
          {projects.length > 0 ? (
            <>
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
                          <Button
                            className="me-3"
                            size="sm"
                            variant="primary"
                            onClick={() => handleEditProject(item._id)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDeleteProject(item._id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
              <Modal
                show={editProject.showEditModal}
                onHide={handleCloseModal}
                style={{ marginTop: 100 }}
              >
                <Modal.Header closeButton>
                  <Modal.Title style={{ color: "black" }}>
                    Edit Project
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={handleEditSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: "black" }}>
                        Project Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="projectName"
                        value={editProject.projectName || ""}
                        onChange={(e) => {
                          handleEditInputChange(e);
                        }}
                      />
                    </Form.Group>
                    {editProjectError && (
                      <p className="errors">{editProjectError}</p>
                    )}
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>

                    <Button
                      variant="danger"
                      className="m-2"
                      onClick={() => handleCloseModal()}
                    >
                      Close
                    </Button>
                  </Form>
                </Modal.Body>
              </Modal>
            </>
          ) : (
            <p className="noProjects">No Projects Alloted</p>
          )}
        </div>
        <ToastContainer />
      </Layout>
    </>
  );
};

export default EditProject;
