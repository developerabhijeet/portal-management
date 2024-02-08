import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Table } from "react-bootstrap";
import { BaseURL } from "../../Utils/utils";
import axios from "axios";

const Projects = () => {
  const [projectData, setProjectData] = useState([]);
  const id = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BaseURL}/project/${id}`);
        setProjectData(response.data.projects);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      <Layout>
        <div className="container mt-4">
          <h5 className="px-3 py-3 m-0" style={{ backgroundColor: "#454545" }}>
            All Projects
          </h5>
          <Table striped hover variant="dark">
            <thead>
              <tr>
                <th>Project</th>
                <th>Due Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projectData.length > 0 &&
                projectData.map((item) => (
                  <tr key={item._id}>
                    <td>{item.projectName}</td>
                    <td>{new Date(item.date).toLocaleDateString()}</td>
                    <td>{item.action}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </Layout>
    </>
  );
};

export default Projects;
