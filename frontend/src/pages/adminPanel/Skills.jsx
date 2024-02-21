import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { BaseURL } from "../../Utils/utils";
import { Table, Button, InputGroup, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { CiSearch } from "react-icons/ci";

const Skills = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
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
          <h3 className="text-brand">Employee's Skills</h3>
          <div>
            <Form>
              <InputGroup className="my-3">
                <CiSearch
                  size={20}
                  style={{ position: "absolute", zIndex: 1, top: 8, left: 3 }}
                />
                <Form.Control
                  type="text"
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search Employee"
                  style={{ paddingLeft: 25 }}
                />
              </InputGroup>
            </Form>
          </div>
          <div className="my-3">
            <Table striped hover>
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>Skills</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 &&
                  users
                    .filter((item) => {
                      return search.toLowerCase() === ""
                        ? item
                        : item.firstName.toLowerCase().includes(search);
                    })
                    .map((item) => (
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
        </div>
      </Layout>
    </>
  );
};

export default Skills;
