import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { BaseURL } from "../../Utils/utils";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";

const Skills = () => {
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
        <div className="mt-5 container p-4">
          <h3
            className="px-3 py-3 m-0"
            style={{ backgroundColor: "#191c24", color: "#60c2cf" }}
          >
            Employees
          </h3>
          <Table striped hover style={{ backgroundColor: "#191c24" }}>
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
                          navigate("/show_Skills", {
                            state: {
                              id: `${item._id}`,
                            },
                          });
                        }}
                      >
                        Show Skills
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </Layout>
    </>
  );
};

export default Skills;
