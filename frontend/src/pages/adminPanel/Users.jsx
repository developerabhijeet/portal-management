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
        <div className="mt-5 container bg p-3">
          <h3 className="text-brand m-0">All Employees</h3>
          <div className="my-3">
            <Table striped hover>
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
