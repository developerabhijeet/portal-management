import axios from "axios";
import React, { useEffect, useState } from "react";
import { BaseURL } from "../../../Utils/utils";
import { Table, Button, Form, InputGroup } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../../components/Layout";
import { CiSearch } from "react-icons/ci";

const ViewTests = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
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
        <div className="my-5 container bg p-3">
          <h3 className="text-brand">Assigned Test Tasks</h3>
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
                  <th>Operation</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 &&
                  users
                    ?.filter((item) => {
                      return search.toLowerCase() === ""
                        ? item
                        : item.firstName.toLowerCase().includes(search);
                    })
                    ?.map((item) => (
                      <tr key={item._id}>
                        <td>
                          {item.firstName} {item.lastName}
                        </td>
                        <td>
                          <Button
                            variant="outline-info me-2"
                            onClick={() => {
                              navigate(`${item._id}`, {
                                state: {
                                  id: item._id,
                                  firstName: item.firstName,
                                  lastName: item.lastName,
                                },
                              });
                            }}
                          >
                            Show tests
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

export default ViewTests;

export const ShowTests = () => {
  const [tests, setTests] = useState([]);
  const location = useLocation();
  const { firstName, lastName, id } = location.state;

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get(`${BaseURL}/tests/${id}`);
        setTests(response.data.tests);
      } catch (error) {
        console.error("Error fetching employees test tasks");
      }
    };
    fetchTests();
  }, [id]);
  return (
    <>
      <Layout newIndex="6">
        <div className="container bg my-5">
          <h4 className="text-brand p-4 d-flex justify-content-center m-0">
            {firstName} {lastName}
          </h4>
          <div>
            {tests.length > 0 ? (
              <Table striped hover>
                <thead>
                  <tr>
                    <th>Client's Details</th>
                    <th>Profile</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tests &&
                    tests?.map((item) => (
                      <tr key={item._id}>
                        <td>{item.clientName}</td>
                        <td>{item.developerProfile}</td>
                        <td>{item.status}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            ) : (
              <p
                style={{ fontSize: 20, color: "#ccc" }}
                className="d-flex justify-content-center pb-4"
              >
                No Test task assigned
              </p>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};
