import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { BaseURL } from "../../Utils/utils";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";

const ProjectUpdate = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

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

  return (
    <>
      <Layout newIndex="6">
        <div className="mt-5 container bg p-3">
          <h3 className="text-brand">Assigned Projects</h3>
          <div className="my-3">
            <Table striped hover>
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>Operation</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 &&
                  users.map((item) => (
                    <tr key={item._id}>
                      <td>
                        {item.firstName} {item.lastName}
                      </td>
                      <td>
                        <Button
                          variant="outline-info"
                          onClick={() => {
                            navigate("/edit_project", {
                              state: {
                                id: item._id,
                                firstName: item.firstName,
                                lastName: item.lastName,
                              },
                            });
                          }}
                        >
                          Show
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ProjectUpdate;
