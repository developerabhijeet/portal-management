import axios from "axios";
import React, { useEffect, useState } from "react";
import { BaseURL } from "../../../Utils/utils";
import { Table, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../../components/Layout";
const ViewTests = () => {
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
        <div className="mt-4 container bg p-3">
          <h3 className="text-brand">Assigned Test Tasks</h3>
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
                          variant="outline-info me-2"
                          onClick={() => {
                            navigate("/showtests", {
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

  console.log(id,"id of employee");
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get(`${BaseURL}/tests/${id}`);
        console.log(response.data);
        setTests(response.data);
      } catch (error) {
        console.error("Error fetching employees test tasks")
      }
    };
    fetchTests();
  }, []);
  return (
    <>
      <div className="container bg my-3">
        <h4 className="text-brand p-2 d-flex justify-content-center m-0">
          {firstName} {lastName}
        </h4>
        <div className="">
          <Table striped hover>
            <thead>
              <tr>
                <th>Client's Details</th>
                <th>Profile</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};
