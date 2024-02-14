import axios from "axios";
import React, { useEffect, useState } from "react";
import { BaseURL } from "../../Utils/utils";
import { Table, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import Layout from "../../components/Layout";

const Users = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${BaseURL}/auth/getUser`);
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users data", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [setUsers]);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`${BaseURL}/users/deleteUser/${userId}`);
      toast.success("User Deleted successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
      });
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };
  return (
    <>
      <Layout newIndex="6">
        <div className="mt-5 mx-4">
          <h3
            className="px-3 py-3 m-0"
            style={{ backgroundColor: "#191c24", color: "#60c2cf" }}
          >
            All Employees
          </h3>
          <div>
            <Table striped hover style={{ backgroundColor: "#191c24" }}>
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>Email</th>
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
                      <td>{item.email}</td>
                      <td>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDeleteUser(item._id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </div>
        <ToastContainer />
      </Layout>
    </>
  );
};

export default Users;
